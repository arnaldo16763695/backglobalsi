import { resolveFontsPath } from "../utils/helpers";
import { Injectable } from "@nestjs/common";
import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

// Define font files
const path = resolveFontsPath();
const fonts = {
  Roboto: {
    normal: path + "Roboto-Regular.ttf",
    bold: path + "Roboto-Medium.ttf",
    italics: path + "Roboto-Italic.ttf",
    bolditalics: path + "Roboto-MediumItalic.ttf",
  },
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(docDefinition: TDocumentDefinitions) {
    return this.printer.createPdfKitDocument(docDefinition);
  }
}
