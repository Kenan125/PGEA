export function replacePlaceholders(template: string, recipient: Record<string, any>): string {
  return Object.keys(recipient).reduce((msg, key) => {
    if (key.startsWith("Column_")) {
      const regex = new RegExp(`\\{${key}\\}`, "g");
      return msg.replace(regex, recipient[key] || "");
    }
    return msg;
  }, template);
}