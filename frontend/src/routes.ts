const apiPath = 'http://localhost:8080/api';

export const routes = {
  loginRoute: () => 'login',
  signupRoute: () => '/signup',
  documentsRoute: () => '/documents',
  documentDetailsRoute: (id: number) => `/documents/${id}`,
  usersRoute: () => '/users',
  userDetailsRoute: (id: number) => `/users/${id}`,
  loginPath: () => [apiPath, 'auth', 'sign-in'].join('/'),
  signupPath: () => [apiPath, 'auth', 'sign-un'].join('/'),
};
