import { from, Observable, of, throwError, timer } from 'rxjs';
import { mergeMap, retryWhen } from 'rxjs/operators';

interface GenericRetryStrategyArgs {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  notRetryWhen?: (error: any) => boolean;
}

const genericRetryStrategy = ({
  maxRetryAttempts = 10,
  scalingDuration = 100,
  notRetryWhen = (error) => {
    if (
      error.errorLabels instanceof Array &&
      error.errorLabels[0] === 'TransientTransactionError'
    ) {
      return false;
    }
    return true;
  },
}: GenericRetryStrategyArgs = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      console.log({ error });
      const retryAttempt = i + 1;
      if (retryAttempt > maxRetryAttempts || notRetryWhen(error)) {
        return throwError(error);
      }
      console.log('Exception occurred: ', error.message);
      const scaledDuration =
        retryAttempt * Math.round((scalingDuration / 2) * (1 + Math.random()));
      console.log(`Attempt ${retryAttempt}: retrying in ${scaledDuration}ms`);
      // retry after 1s, 2s, etc...
      return timer(scaledDuration);
    }),
  );
};

export const retryPromise = (args?: GenericRetryStrategyArgs) => <T>(
  promiseJob: () => Promise<T>,
): Promise<T> => {
  return of(true)
    .pipe(mergeMap(() => from(promiseJob())))
    .pipe(retryWhen(genericRetryStrategy(args)))
    .toPromise();
};
