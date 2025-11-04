import { Injectable } from "@nestjs/common";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { PrinterService } from "src/printer/printer.service";
import { usersReport } from "./documents/users.report";
import { clientsReport } from "./documents/clients.report";
import { PrismaService } from "src/prisma/prisma.service";
import { Status } from '@prisma/client';
import { companyReport } from "./documents/companies.report";

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
    private readonly printer: PrinterService
  ) {}
  //Users report 
  async generateUsersReport(): Promise<PDFKit.PDFDocument> {
    const users = await this.prisma.user.findMany();
    const docDefinition: TDocumentDefinitions = usersReport(users);
    return this.printer.createPdf(docDefinition);
  }

  async generateUsersReportByStatus(
    filter: Status
  ): Promise<PDFKit.PDFDocument> {
    const users = await this.prisma.user.findMany({
      where: {
        status: filter,
      },
    });
    const docDefinition: TDocumentDefinitions = usersReport(users);
    return this.printer.createPdf(docDefinition);
  }
  
  //Clients report 
  
  async generateClientsReport(): Promise<PDFKit.PDFDocument> {
    const clients = await this.prisma.clients.findMany();
    const docDefinition: TDocumentDefinitions = clientsReport(clients);
    return this.printer.createPdf(docDefinition);
  }

  async generateClientsReportByStatus(
    filter: Status
  ): Promise<PDFKit.PDFDocument> {
    const clients = await this.prisma.clients.findMany({
      where: {
        status: filter,
      },
    });
    const docDefinition: TDocumentDefinitions = clientsReport(clients);
    return this.printer.createPdf(docDefinition);
  }

  //Companies report 

   async generateCompaniesReport(): Promise<PDFKit.PDFDocument> {
    const companies = await this.prisma.company.findMany();
    const docDefinition: TDocumentDefinitions = companyReport(companies);
    return this.printer.createPdf(docDefinition);
  }

  async generateCompaniesReportByStatus(
    filter: Status
  ): Promise<PDFKit.PDFDocument> {
    const companies = await this.prisma.company.findMany({
      where: {
        status: filter,
      },
    });
    const docDefinition: TDocumentDefinitions = companyReport(companies);
    return this.printer.createPdf(docDefinition);
  }
}
