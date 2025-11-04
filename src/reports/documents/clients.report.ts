import { Clients } from '@prisma/client';
import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

const logo: Content = {
  image: process.env.LOGO_PATH,
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

export const clientsReport = (clients: Clients[]): TDocumentDefinitions => {
  return {
    pageSize: 'A4',

    header: {
      text: 'Reporte de clientes',
      alignment: 'right',
      margin: [10, 10],
    },
    footer: {
      text: 'Reporte de clientes, Globalsi',
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
        text: 'Reporte de clientes',
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
            ...clients.map((client) => [client.name, client.email]),
          ],
        },
      },
    ],
    styles: styles,
  };
};
