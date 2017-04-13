import { schema } from 'normalizr';

export const labelSchema = new schema.Entity('labels');
export const templateSchema = new schema.Entity('templates', {
  labels: [labelSchema],
});
