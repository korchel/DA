import { AbilityBuilder, createMongoAbility, MongoQuery, PureAbility } from '@casl/ability';
import { Role, RoleName } from '../interfaces';

type User = {
  roles: RoleName[],
  isAuthenticated: boolean,
  id?: number | null,
  userName?: string | null,
};

type Entity = {
  authorId?: number | string | undefined,
  userName?: string | undefined,
}

type Actions = 'create' | 'edit' | 'view' | 'delete';

type Ability =
  | [Actions, 'document']
  | [Actions, 'file']
  | [Actions, 'user']
  | [Actions, 'author']
  | [Actions, 'role'];

export type AppAbility = PureAbility<Ability, MongoQuery>;

interface IAbilityParams {
  user: User,
  entity?: Entity,
}

export const defineAbilityFor = ({user, entity}: IAbilityParams) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user.roles.includes('ROLE_ADMIN') || user.id === entity?.authorId || user.userName === entity?.userName) {
    can('edit', 'document');
    can('delete', 'document');
    can('edit', 'file');
    can('delete', 'file');
    can('edit', 'user');
    can('delete', 'user');
  }

  if (user.roles.includes('ROLE_ADMIN')) {
    can('edit', 'author');
    can('edit', 'role')
  }

  return build();
};