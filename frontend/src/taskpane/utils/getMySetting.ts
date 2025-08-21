export function getMySetting(key: string):string {
    const result = Office.context.document.settings.get(key);
    console.log("Setting get:", result);
    return result
}