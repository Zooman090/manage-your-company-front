export const securityFetch = (url, options) => {//TODO: Do I need that
  return new Promise((resolve, reject) => {
    const defaultHeader = {
      // 'Authorization': `Basic ${}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    // let headers = { ...defaultHeader, ...options.headers };

    fetch(url, {
      ...options,
      credentials: 'include'
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const jsonFetch = (url, body) => {
  const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials = 'include',
    method = 'POST',
    options = {
      headers,
      method,
      credentials,
      body: JSON.stringify(body)
    };

  return fetch(url, options);
};

export const checkingStatus = response => (response.ok ? response.json() : Promise.reject(response.json()));
