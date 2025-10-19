// utils/sanitize.ts
import sanitizeHtml from 'sanitize-html'; // ✔️ compatible con CommonJS

export function sanitize(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}
  