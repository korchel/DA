export type Role = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MODERATOR';

export interface IDocument {
  id: number,
  title: string,
  number: number,
  author: string,
  type: string,
  content: string,
  creationDate: string,
  updateDate: string,
}

export interface IUser {
  id: number,
  username: string,
  email: string,
  name: string,
  lastName: string,
  roles: Role[],
}

