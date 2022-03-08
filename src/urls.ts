import store from './main/config';

const appUrl: string = store.get('app.defaultProjectUrl');

export default Object.freeze({
  appUrl,
  logoutUrl: 'https://id.atlassian.com/logout?continue=https%3A%2F%2Fstart.atlassian.com'
})
