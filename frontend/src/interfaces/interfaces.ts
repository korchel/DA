export type Role = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MODERATOR';

interface author {

}

export interface IDocument {
  id: number,
  title: string,
  number: number,
  author: object,
  type: object,
  content: string,
  creationDate: string,
  updateDate: string,
  public_document: boolean,
  available_for: number[],
}

export interface IUser {
  id: number,
  username: string,
  email: string,
  name: string,
  lastName: string,
  roles: Role[],
}

