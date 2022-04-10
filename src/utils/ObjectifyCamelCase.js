export const ObjectifyCamelCase = (snakeCaseObject) => {
  const camelCaseObject = {};
  for (const key in snakeCaseObject) {
    let modifiedKey = key.replace(/_./g, x => x[1].toUpperCase());
    camelCaseObject[modifiedKey] = snakeCaseObject[key];
  }
  return camelCaseObject;
};
