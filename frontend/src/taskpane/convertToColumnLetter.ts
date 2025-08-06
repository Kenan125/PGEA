function convertToColumnLetter(index: number): string {
    let letter = '';
    index++; // make it 1-based
    while (index > 0) {
        let mod = (index - 1) % 26;
        letter = String.fromCharCode(65 + mod) + letter;
        index = Math.floor((index - mod) / 26);
    }
    return letter;
}
