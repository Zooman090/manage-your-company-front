const isProduction = process.env.NODE_ENV === 'production';

export const serverUrl = isProduction ? 'https://manage-your-companies.herokuapp.com' : 'http://localhost:8008';

export const siteUrl = isProduction ? 'https://zooman090.github.io' : 'http://localhost:8080';
