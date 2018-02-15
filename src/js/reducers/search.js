const defaultSerch = {
  filterBy: 'name',
  keyword: ''
};

const search = (state = defaultSerch, action) => {
  const { type, payload } = action;

  switch (type) {
  case 'FILTER_COMPANY':
    return {
      ...state,
      ...payload
    };
  default:
    return state;
  }
};

export default search;
