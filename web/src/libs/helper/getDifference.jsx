export function getDifference(str1, str2) {
  const index = str1.indexOf(str2);
  if (index !== -1) {
    return str1.slice(index + str2.length);
  }
  return str1; // Return the entire string if str2 is not found in str1
}
