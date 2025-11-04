import * as fs from 'fs';
import * as path from 'path';
import { Company } from '@prisma/client';
import type { StyleDictionary, TDocumentDefinitions, Content } from 'pdfmake/interfaces';

function getLogoDataUrl() {
  const logoPath = path.resolve(__dirname, 'assets', 'images', 'LogoGlobal-n.png');
  const buf = fs.readFileSync(logoPath);
  return 'data:image/png;base64,' + buf.toString('base64');
}

const styles: StyleDictionary = {
  h1: { fontSize: 20, bold: true, margin: [0, 5] },
  h2: { fontSize: 16, bold: true, margin: [0, 5] },
  h3: { fontSize: 14, bold: true, margin: [0, 5] },
};

export const companyReport = (companies: Company[]): TDocumentDefinitions => {
  const images = {
    logo: getLogoDataUrl(), // <- string
  };

  const logo: Content = {
    image: 'logo', // <- referencia por clave (string)
    width: 100,
  };

  return {
    pageSize: 'A4',
    images, // <- registra el diccionario
    header: { text: 'Reporte de empresas', alignment: 'right', margin: [10, 10] },
    footer: { text: 'Reporte de empresas', alignment: 'right', margin: [10, 10] },
    content: [
      logo,
      { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 }] },
      {
        margin: [0, 10],
        columns: [
          { text: [{ text: 'Los Angeles, \n', style: 'h2' }, 'numero de calle , \n', 'local, etc'], alignment: 'left' },
          {
            text: [
              { text: 'Fecha: ' + new Date().toLocaleDateString() + ' \n', style: 'h2' },
              'Hora: ' + new Date().toLocaleTimeString() + ' \n',
            ],
            alignment: 'right',
          },
        ],
      },
      { margin: [0, 10], text: 'Reporte de empresas', alignment: 'center', style: 'h1' },
      {
        margin: [0, 10],
        layout: 'lightHorizontalLines',
        table: {
          widths: ['*', 'auto'],
          headerRows: 1,
          body: [
            [{ text: 'Nombre', style: 'h3' }, { text: 'Email', style: 'h3' }],
            ...companies.map((c) => [c.companyName, c.email]),
          ],
        },
      },
    ],
    styles,
  };
};
