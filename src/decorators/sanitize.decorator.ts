import { sanitize } from '../utils/sanitize';

// decorators/sanitize.decorator.ts
import { Transform } from 'class-transformer';

export function Sanitize() {
  return Transform(({ value }) =>
    typeof value === 'string' ? sanitize(value) : value,
  );
}

