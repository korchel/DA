const apiPath = 'http://localhost:8080/api';

export const routes = {
  loginRoute: () => 'login',
  signupRoute: () => '/signup',
  loginPath: () => [apiPath, 'auth', 'sign-in'].join('/'),
};
