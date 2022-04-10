import { ISimpleType, types as t } from 'mobx-state-tree';
/**
 * A custom MST enumeration type that enumerates numbers instead of strings.
 */
export function enumerate<T>(
  name: string | number[],
  options?: any,
): ISimpleType<T> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const realOptions: number[] = typeof name === 'string' ? options! : name;
  const type = t.union(...realOptions.map(option => t.literal(option)));
  if (typeof name === 'string') type.name = name;
  return type;
}
