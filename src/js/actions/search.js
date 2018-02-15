export const saveCompanySearchParametrs = (keyword = '', filterBy = 'name') => ({
  type: 'FILTER_COMPANY',
  payload: { keyword, filterBy }
});
