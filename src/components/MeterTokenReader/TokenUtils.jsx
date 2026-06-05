export const parseDigits = (str) => {
  return str.replace(/\D/g, "").split("").map(Number);
};

export const chunkIntoGroups = (digits, groupSize) => {
  const groups = [];
  for (let i = 0; i < digits.length; i += groupSize) {
    groups.push(digits.slice(i, i + groupSize));
  }
  return groups;
};

export const chunkIntoLines = (digits, lineSize) => {
  const lines = [];
  for (let i = 0; i < digits.length; i += lineSize) {
    lines.push(digits.slice(i, i + lineSize));
  }
  return lines;
};

export const digitsToWords = (digits) => {
  const words = digits.map((d) => {
    const names = ["zero","one","two","three","four","five","six","seven","eight","nine"];
    return names[d] ?? d.toString();
  });
  return words.join(", ");
};