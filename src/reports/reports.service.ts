import { Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfMake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { usersReport } from './documents/users.report';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportsService {
constructor(private prisma: PrismaService, private readonly printer: PrinterService) {}

  async generateUsersReport(): Promise<PDFKit.PDFDocument> {
    const users = await this.prisma.user.findMany();
    const docDefinition:TDocumentDefinitions = usersReport(users);
    return this.printer.createPdf(docDefinition);
  }
}
