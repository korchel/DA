import { AbilityBuilder, createMongoAbility } from '@casl/ability';

export function defineAbility() {
  const { can, build } = new AbilityBuilder(createMongoAbility)

  can('read', 'all')
  can('update', 'article')

  return build()
};