
import { getChileParts } from './helpers';

export function generateOrderCode(sequence: number): string {
  const { year, month, day } = getChileParts();
  const yy = year.slice(-2); // "25" de "2025"
  const seq = String(sequence).padStart(3, '0');

  return `${yy}${month}${day}${seq}`; // 251115001
}
