export const showSimpleDialog = (message = '') => ({
  type: 'SHOW_SIMPLE_DIALOG',
  payload: { message, type: 'simple' }
});

export const showFullDialog = ({ message, headerTitle, action, hasCancel, yesBtn, noBtn } = {
  message: '',
  headerTitle: '',
  hasCancel: false,
  yesBtn: 'Yes',
  noBtn: 'No',
  action: () => {}
}) => ({
  type: 'SHOW_FULL_DIALOG',
  payload: { message, headerTitle, action, hasCancel, yesBtn, noBtn, type: 'full' }
});

export const showErrorDialog = ({ errorMessage, headerTitle, action, hasCancel } = {
  errorMessage: '',
  headerTitle: '',
  hasCancel: false,
  action: () => {}
}) => ({
  type: 'SHOW_ERROR_DIALOG',
  payload: { errorMessage, headerTitle, action, hasCancel, type: 'error' }
});

export const makeEmptyDialog = () => ({
  type: 'MAKE_EMPTY_DIALOG'
});
