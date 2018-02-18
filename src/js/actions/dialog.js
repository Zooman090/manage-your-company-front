const SHOW_TIME = 5000;

export const showSimpleDialog = (message = '') => ({
  type: 'SHOW_SIMPLE_DIALOG',
  payload: { message, type: 'simple' }
});

export const showFullDialog = ({
  message = '',
  headerTitle = '',
  action = () => {},
  hasCancel = false,
  yesBtn = 'Yes',
  noBtn = 'No'
} = {}) => ({
  type: 'SHOW_FULL_DIALOG',
  payload: { message, headerTitle, action, hasCancel, yesBtn, noBtn, type: 'full' }
});

export const showErrorDialog = ({
  errorMessage = '',
  headerTitle = '',
  action = () => {},
  hasCancel = false,
  closeAfterSeconds = SHOW_TIME
} = {}) => ({
  type: 'SHOW_ERROR_DIALOG',
  payload: { errorMessage, headerTitle, action, hasCancel, closeAfterSeconds, type: 'error' }
});

export const makeEmptyDialog = () => ({
  type: 'MAKE_EMPTY_DIALOG'
});
