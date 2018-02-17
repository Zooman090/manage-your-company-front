const defaultUser = {
  role: 'guest',
  isSign: false
};

const user = (state = defaultUser, { type, payload }) => {
  switch (type) {
  case 'USER_AUTORIZATION':
    return {
      ...state,
      ...payload
    };
  case 'RESET_AUTORIZATION':
    return {
      ...state,
      ...payload
    };
  default:
    return {
      ...state
    };
  }
};

export default user;
