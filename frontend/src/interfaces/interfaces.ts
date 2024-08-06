export type RoleName = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MODERATOR';
export type Role = {
  idRole: number,
  name: RoleName,
}
export interface IUser {
  id: number,
  username: string,
  email: string,
  name: string,
  lastName: string,
  roles: Role[],
}

export interface IDocument {
  id: number,
  title: string,
  number: number,
  author: IUser,
  type: {},
  content: string,
  creationDate: string,
  updateDate: string,
  public_document: boolean,
  availableFor: number[],
}

export interface IFile {
  // data: ?
  id: number,
  filename: string,
  filetype: string,
  author: string,
  availableFor: number[],
  publicEntity: boolean,
  creationDate: string,
  updateDate: string,
}

