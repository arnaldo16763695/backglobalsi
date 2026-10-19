import { resolveLogoPath } from '../../utils/helpers';
import type { Content, StyleDictionary } from 'pdfmake/interfaces';

export const logoPath = resolveLogoPath();

export const logo: Content = {
  image: logoPath,
  width: 100,
};

export const mystyles: StyleDictionary = {
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

export const myFooter = {
  text: 'Globalsi Comunicaciones SPA, Tlf: 432452023,  Whats: +56 9 82303053, Email: contacto@globalsi.cl',
};

export const infoCompay = {
  text: [
    { text: 'Los Angeles, \n', style: 'h2' },
    'Tromü 1441 , \n',
    'Padre Las Casas',
  ],
};

export const reportDate = {
  text: [
    {
      text:
        'Fecha: ' +
        new Date().toLocaleDateString('es-CL', {
          timeZone: 'America/Santiago',
        }) +
        ' \n',
      style: 'h3',
    },
    'Hora: ' +
      new Date().toLocaleTimeString('es-CL', {
        timeZone: 'America/Santiago',
      }) +
      ' \n',
  ],
};
