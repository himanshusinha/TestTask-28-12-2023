export const SERVICE_ROUTES = {
  LOGIN: '/user/login',
  SIGN_UP: '/user/signup',
};
export const METHODS = {
  GET: 'GET',
  POST: 'POST',
};
export const replaceUrl = (url, data) => {
  var regex = new RegExp(':(' + Object.keys(data).join('|') + ')', 'g');
  return url?.replace(regex, (m, $1) => data[$1] || m);
};
