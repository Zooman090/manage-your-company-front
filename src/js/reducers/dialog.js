const defaultDialog = {
    errorMessage: '',
    hasCancel: false,
    action: () => {},
    headerTitle: '',
    yesBtn: 'Yes',
    message: '',
    noBtn: 'No',
    type: 'empty'
  },
  dialog = (state = defaultDialog, { type, payload }) => {
    switch (type) {
    case 'SHOW_SIMPLE_DIALOG':
      return {
        ...payload
      };
    case 'SHOW_FULL_DIALOG':
      return {
        ...payload
      };
    case 'SHOW_ERROR_DIALOG':
      return {
        ...payload
      };
    case 'MAKE_EMPTY_DIALOG':
      return {
        ...defaultDialog
      };
    default:
      return {
        ...state
      };
    }
  };

export default dialog;
