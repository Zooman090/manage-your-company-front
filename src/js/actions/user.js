export const userAuthorization = ({
  isSign = false,
  role = 'guest'
} = {}) => ({
  type: 'USER_AUTORIZATION',
  payload: { isSign, role }
});
