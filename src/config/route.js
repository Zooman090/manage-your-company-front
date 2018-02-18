const isProduction = process.env.NODE_ENV === 'production';

export const serverUrl = isProduction ? 'https://fathomless-basin-64420.herokuapp.com' : 'http://localhost:8008';

export const siteUrl = isProduction ? '' : 'http://localhost:8080';
