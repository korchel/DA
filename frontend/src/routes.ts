const apiPath = 'http://localhost:8080/api';

export const routes = {
  loginRoute: () => 'login',
  signupRoute: () => '/signup',
  documentsRoute: () => '/documents',
  loginPath: () => [apiPath, 'auth', 'sign-in'].join('/'),
};
