import { useIsLoggedIn } from 'graphql/query/IS_LOGGED_IN';
import { Landing } from 'pages/Landing';
import React, { FC, lazy, Suspense } from 'react';
const App = lazy(() => import('pages/App'));

export const Page: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    console.log('what?');
    return (
      <Suspense fallback={<div>loading...</div>}>
        <App />
      </Suspense>
    );
  }

  return <Landing />;
};
