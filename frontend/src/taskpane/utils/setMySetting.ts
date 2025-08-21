export function setMySetting(key: string, value: string) {
    Office.context.document.settings.set(key, value);
    console.log("Setting saved:", key, value);
}