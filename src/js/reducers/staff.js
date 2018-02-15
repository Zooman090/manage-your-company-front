const staffList = (state = [], action) => {
  switch (action.type) {
  case 'SAVE_STAFF':
    return [ ...action.payload ];
  default:
    return [];
  }
};

export default staffList;
