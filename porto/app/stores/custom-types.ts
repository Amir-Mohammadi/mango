import { types } from 'mobx-state-tree';

const MobxRecord = types.custom<string, Record<string, string>>({
  name: 'Record',
  fromSnapshot(value: string): Record<string, string> {
    return JSON.parse(value);
  },
  toSnapshot(value: Record<string, string>): string {
    return JSON.stringify(value);
  },

  isTargetType(_: any) {
    return true;
  },
  getValidationMessage(_: any) {
    return '';
  },
});

export const customTypes = {
  MobxRecord,
};
