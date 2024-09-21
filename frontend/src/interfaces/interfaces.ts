import { ActionMeta } from "react-select";

export type Entity = 'files' | 'documents' | 'users';

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
  lastname?: string,
  roles: Role[],
}

export interface IAuthor {
  idUser: number,
  username: string,
  email: string,
  name: string,
  lastname?: string,
  roles: Role[],
}

export type DocumentType = 'NOTE' | 'REPORT';

export interface IDocumentType {
  id: number,
  type: DocumentType,
}

export interface IDocument {
  id: number,
  title: string,
  number: number,
  author: IAuthor,
  type: IDocumentType,
  content: string,
  creationDate?: string,
  updateDate?: string,
  public_document: boolean,
  available_for: number[],
}

export interface IFile {
  id: number,
  filename: string,
  filetype: string,
  author: string,
  available_for: number[],
  publicEntity: boolean,
  creationDate: string,
  updateDate: string,
}

export type onSelect = (newValue: unknown, actionmeta: ActionMeta<unknown>) => void;

export interface ISelectOption {
  label: string,
  value: number,
}

