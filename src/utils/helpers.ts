import * as path from 'path';
import * as fs from 'node:fs';


export function resolveLogoPath(): string {
  const root = process.cwd(); // raíz del proyecto

  const distPath = path.join(
    root,
    'dist',
    'assets',
    'images',
    'LogoGlobal-n.png',
  );

  const srcPath = path.join(
    root,
    'src',
    'assets',
    'images',
    'LogoGlobal-n.png',
  );

  if (fs.existsSync(distPath)) {
    return distPath;
  }

  if (fs.existsSync(srcPath)) {
    return srcPath;
  }

  // Si no existe en ninguno, lanza un error claro
  throw new Error(
    `LogoGlobal-n.png no encontrado en:\n- ${distPath}\n- ${srcPath}`,
  );
}


export function resolveFontsPath(): string {
  const root = process.cwd(); // raíz del proyecto

  const distPath = path.join(
    root,
    'dist',
    'assets',
    'fonts/',
  );

  const srcPath = path.join(
    root,
    'src',
    'assets',
    'fonts/',
  );

  if (fs.existsSync(distPath)) {
    return distPath;
  }

  if (fs.existsSync(srcPath)) {
    return srcPath;
  }

  // Si no existe en ninguno, lanza un error claro
  throw new Error(
    `Fonts no encontrado en:\n- ${distPath}\n- ${srcPath}`,
  );
}



const CHILE_TZ = 'America/Santiago' as const;

export function getChileParts(now = new Date()) {
  const formatter = new Intl.DateTimeFormat('es-CL', {
    timeZone: CHILE_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(now);
  const year = parts.find((p) => p.type === 'year')!.value;   // p.ej. "2025"
  const month = parts.find((p) => p.type === 'month')!.value; // "11"
  const day = parts.find((p) => p.type === 'day')!.value;     // "15"

  return { year, month, day };
}

export function getChileStartOfTodayUTC(now = new Date()): Date {
  const { year, month, day } = getChileParts(now);

  const y = Number(year);
  const m = Number(month); // 1-12
  const d = Number(day);

  // Creamos un Date en UTC con la medianoche de Chile
  // (funciona bien porque la DB guarda en UTC)
  return new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
}
