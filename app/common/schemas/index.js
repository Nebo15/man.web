import { schema } from 'normalizr';

export const label = new schema.Entity('labels');
export const template = new schema.Entity('templates', {
  labels: [label],
});
