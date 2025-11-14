import { User } from '@prisma/client';
import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import * as path from 'path';
import * as fs from 'node:fs';
function resolveLogoPath(): string {
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

const logoPath = resolveLogoPath();

const logo: Content = {
  image: logoPath,
  width: 100,
};

const styles: StyleDictionary = {
  h1: {
    fontSize: 20,
    bold: true,
    margin: [0, 5],
  },
  h2: {
    fontSize: 16,
    bold: true,
    margin: [0, 5],
  },
  h3: {
    fontSize: 14,
    bold: true,
    margin: [0, 5],
  },
};

export const usersReport = (users: User[]): TDocumentDefinitions => {
  return {
    pageSize: 'A4',

    header: {
      text: 'Reporte de usuarios',
      alignment: 'right',
      margin: [10, 10],
    },
    footer: {
      text: 'Reporte de usuarios, Globalsi',
      alignment: 'right',
      margin: [10, 10],
    },
    content: [
      logo,
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 1,
          },
        ],
      },

      //   { text: '___________', style: 'h1' },
      // direccion de la empresa comumna 1
      {
        margin: [0, 10],
        columns: [
          {
            text: [
              { text: 'Los Angeles, \n', style: 'h2' },
              'numero de calle , \n',
              'local, etc',
            ],
            alignment: 'left',
          },
          {
            text: [
              {
                text: 'Fecha: ' + new Date().toLocaleDateString() + ' \n',
                style: 'h2',
              },
              'Hora: ' + new Date().toLocaleTimeString() + ' \n',
            ],
            alignment: 'right',
          },
        ],
      },
      // QR code
      //   {
      //     qr: 'https://www.google.com',
      //     fit: 100,
      //     alignment: 'right',
      //   },

      {
        margin: [0, 10],
        text: 'Reporte de usuarios',
        alignment: 'center',
        style: 'h1',
      },

      // tabla con los datos

      {
        margin: [0, 10],
        layout: 'lightHorizontalLines',
        table: {
          widths: ['*', 'auto'],
          headerRows: 1,
          body: [
            [
              { text: 'Nombre', style: 'h3' },
              { text: 'Email', style: 'h3' },
            ],
            ...users.map((user) => [user.name, user.email]),
          ],
        },
      },
    ],
    styles: styles,
  };
};
