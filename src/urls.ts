const appUrl = 'https://start.atlassian.com';

export default Object.freeze({
  appUrl,
  logoutUrl: 'https://id.atlassian.com/logout?continue=' + appUrl
})
