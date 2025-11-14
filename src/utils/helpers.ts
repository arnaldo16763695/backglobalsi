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