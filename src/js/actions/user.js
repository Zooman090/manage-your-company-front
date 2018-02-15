export const userAuthorization = ({ isSign, role } = { isSign: false, role: 'guest' }) => ({
  type: 'USER_AUTORIZATION',
  payload: { isSign, role }
});
