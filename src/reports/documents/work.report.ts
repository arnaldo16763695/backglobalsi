import { resolveLogoPath } from "../../utils/helpers";

import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import { WorkWithRelations } from "./types/work-report.types";

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

export const workReport = (work: WorkWithRelations): TDocumentDefinitions => {
  return {
    pageSize: "A4",
    header: {
      text: "Orden de Trabajo",
      alignment: "right",
      margin: [10, 10],
    },
    footer: {
      text: "Globalsi Comunicaciones SPA, Tlf: 432452023,  Whats: +56 9 82303053, Email: contacto@globalsi.cl",
      alignment: "center",
      margin: [10, 10],
    },
    content: [
      logo,
      {
        canvas: [
          {
            type: "line",
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
              { text: "Los Angeles, \n", style: "h2" },
              "Tromü 1441 , \n",
              "Padre Las Casas",
            ],
            alignment: "left",
          },
          {
            text: [
              {
                text: "Fecha: " + new Date().toLocaleDateString() + " \n",
                style: "h3",
              },
              "Hora: " + new Date().toLocaleTimeString() + " \n",
            ],
            alignment: "right",
          },
        ],
      },
      {
        margin: [0, 10],
        text: "Orden de Trabajo",
        alignment: "center",
        style: "h1",
      },
      {
        margin: [0, 10],
        text: "Nº: " + work.workCode,
        alignment: "left",
        style: "h3",
      },

      {
        margin: [0, 10],
        columns: [
          {
            text: [
              { text: "Cliente:  ", style: "h3" },
              { text: work.company.companyName, style: "h3" },
            ],
            alignment: "left",
          },
          {
            text: [
              { text: "RUT:  ", style: "h3" },
              { text: work.company.rut, style: "h3" },
            ],
            alignment: "right",
          },
        ],
      },

      // technicians table

      {
        margin: [0, 10],
        layout: "lightHorizontalLines",
        table: {
          widths: ["*", "auto"],
          headerRows: 1,
          body: [
            [
              { text: "Técnicos encargados:", style: "h3" },
              { text: "", style: "h3" },
            ],
            ...work.technicians.map((step) => [step.technician.name, ""]),
          ],
        },
      },

      // stepToWorks table

      {
        margin: [0, 10],
        layout: "lightHorizontalLines",
        table: {
          widths: ["*", "auto"],
          headerRows: 1,
          body: [
            [
              { text: "Se realizó:", style: "h3" },
              { text: "", style: "h3" },
            ],
            ...work.stepsToWork.map((step, i) => [
              i + 1 + " - " + step.description,
              "",
            ]),
          ],
        },
      },

      // Final observations

      {
        margin: [0, 10],
        text: "Observaciones: ",
        alignment: "left",
        style: "h3",
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 1,
          },
        ],
      },
      {
        margin: [0, 10],
        text: work.finalObservations,
        alignment: "left",
        style: "h3",
      },
    ],
    styles: styles,
  };
};
