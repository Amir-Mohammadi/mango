export const ConvertToMap = (
  map: Map<string, string>,
  obj: { [key: string]: string },
): Map<string, string> => {
  Object.entries(obj).forEach(item => {
    const key = item[0];
    const value = Array.from(item[1] as string)[0][1];
    map.set(key, value);
  });

  return map;
};
