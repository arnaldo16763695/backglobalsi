import { Company } from '@prisma/client';
import type {
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { infoCompay, logo, myFooter, mystyles, reportDate } from './formats';


const styles = mystyles;

export const companyReport = (companies: Company[]): TDocumentDefinitions => {
  return {
    pageSize: 'A4',

    header: {
      text: 'Reporte de empresas',
      alignment: 'right',
      margin: [10, 10],
    },
    footer: {
      text: myFooter.text,
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
            text: infoCompay.text ,
            alignment: 'left',
          },
          {
            text: reportDate.text,
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
        text: 'Reporte de empresas',
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
            ...companies.map((company) => [company.companyName, company.email]),
          ],
        },
      },
    ],
    styles: styles,
  };
};
