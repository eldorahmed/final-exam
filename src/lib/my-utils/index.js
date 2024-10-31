export function getFormData(form) {
  const obj = {};
  const data = new FormData(form);
  for (const [key, value] of data.entries()) {
    obj[key] = value;
  }
  return obj;
}
export const collectItem = (array, item) => {
  const result = [];
  for (const obj of array) {
    result.push(obj[item]);
  }
  return Array.from(new Set(result));
};

export const BASE_URL = "https://json-api.uz/api/project/fn23";
