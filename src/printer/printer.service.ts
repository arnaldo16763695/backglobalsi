import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

// Define font files
const fonts = {
    Roboto: {
      normal: process.env.FONTS_PATH + 'Roboto-Regular.ttf',
      bold: process.env.FONTS_PATH + 'Roboto-Medium.ttf',
      italics: process.env.FONTS_PATH + 'Roboto-Italic.ttf',
      bolditalics: process.env.FONTS_PATH + 'Roboto-MediumItalic.ttf'
    }
  };


@Injectable()
export class PrinterService {
    private printer = new PdfPrinter(fonts);


    createPdf(docDefinition: TDocumentDefinitions) {
        return this.printer.createPdfKitDocument(docDefinition);
    }
} 
