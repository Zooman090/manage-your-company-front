import { createSelector } from 'reselect';

const companiesList = ({ companiesList }) => companiesList,
  searchParameters = ({ search }) => search;

export const filteredCompanies = createSelector(
  [companiesList, searchParameters],
  (companies, { keyword, filterBy }) => companies.filter(company => company[filterBy].toLocaleLowerCase().includes(keyword))
);
