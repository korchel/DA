import { documents } from "./documents";
import { files } from "./files";
import { signupPage } from "./signupPage";
import { users } from "./users";
import { loginPage } from "./loginPage";

export const en = {
  header: {
    english: 'English',
    russian: 'Russian',
    login: 'Log in',
    logout: 'Log out',
    signup: 'Sign up',
    nav: {
      search: 'Search',
      profile: 'Profile',
      files: 'Files',
      documents: 'Documents',
      users: 'Users',
    },
  },
  notFoundPage: {
    title: 'Page not found',
    button: 'Home',
  },
  errorMessages: {
    reuired: 'Required field',
    passwordLength: '8 to 14 characters',
    confirmPassword: 'Passwords do not match',
    wrongPasswordOrUsername: 'Wrong username or password',
    userExists: 'User already exists',
    inValidEmail: 'Incorrect email',
  },
  loginPage,
  signupPage,
  documents,
  files,
  users,
  cancel: 'Cancel',
  delete: 'Delete',
  download: 'Download',
  see: 'See details',
  edit: 'Edit',
};