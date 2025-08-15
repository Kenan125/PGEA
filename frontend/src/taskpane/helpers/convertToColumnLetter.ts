export async function convertToColumnLetter(index: number): Promise<string> {
    let letter = "";
  index++;
  while (index > 0) {
    let mod = (index - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    index = Math.floor((index - mod) / 26);
  }
  return letter;
}
