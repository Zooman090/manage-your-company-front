const list = [{
  name: 'Company',
  type: 'IT',
  address: 'Lviv, St. Head',
  id: 0
}];

const company = (state = list, action) => {
  switch (action.type) {
  case 'REFRESH_COMPANY':
    return [ ...action.payload ];
  default:
    return [ ...state ];
  }
};

export default company;
