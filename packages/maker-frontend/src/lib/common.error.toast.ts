import { globalActions } from 'store/reducers';

export const error401Toast = () =>
  globalActions.toast({
    type: 'error',
    title: 'error.401.title',
    text: 'error.401.comment',
  });
export const error400Toast = () =>
  globalActions.toast({
    type: 'error',
    title: 'error.400.title',
    text: 'error.400.comment',
  });
export const error500Toast = () =>
  globalActions.toast({
    type: 'error',
    title: 'error.500.title',
    text: 'error.500.comment',
  });

export const error401Alert = () =>
  globalActions.alert({
    type: 'error',
    title: 'error.401.title',
    text: 'error.401.comment',
    showConfirmButton: true,
    confirmText: 'common.close',
  });
export const error400Alert = () =>
  globalActions.alert({
    type: 'error',
    title: 'error.400.title',
    text: 'error.400.comment',
    showConfirmButton: true,
    confirmText: 'common.close',
  });
export const error500Alert = () =>
  globalActions.alert({
    type: 'error',
    title: 'error.500.title',
    text: 'error.500.comment',
    showConfirmButton: true,
    confirmText: 'common.close',
  });
