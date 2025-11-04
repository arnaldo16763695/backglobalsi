import { Controller, Get, Res, Param } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { Response } from "express";
import { Status } from "@prisma/client";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get("users")
  async generateUsersReport(@Res() res: Response) {
    const pdfDoc = await this.reportsService.generateUsersReport();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users-report.pdf"'
    );
    pdfDoc.info.Title = "Users Report";
    pdfDoc.info.Author = "GlobalSi";
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get("users/:filter")
  async generateUsersReportByStatus(
    @Res() res: Response,
    @Param("filter") filter: Status
  ) {
    const pdfDoc = await this.reportsService.generateUsersReportByStatus(
      filter
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users-report.pdf"'
    );
    pdfDoc.info.Title = "Users Report";
    pdfDoc.info.Author = "GlobalSi";
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

    @Get("clients")
  async generateClientsReport(@Res() res: Response) {
    const pdfDoc = await this.reportsService.generateClientsReport();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users-report.pdf"'
    );
    pdfDoc.info.Title = "Users Report";
    pdfDoc.info.Author = "GlobalSi";
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get("clients/:filter")
  async generateClientReportByStatus(
    @Res() res: Response,
    @Param("filter") filter: Status
  ) {
    const pdfDoc = await this.reportsService.generateClientsReportByStatus(
      filter
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users-report.pdf"'
    );
    pdfDoc.info.Title = "Users Report";
    pdfDoc.info.Author = "GlobalSi";
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  
  @Get("companies")
  async generateCompanyReport(@Res() res: Response) {
    const pdfDoc = await this.reportsService.generateCompaniesReport();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users-report.pdf"'
    );
    pdfDoc.info.Title = "Users Report";
    pdfDoc.info.Author = "GlobalSi";
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get("companies/:filter")
  async generateCompanyReportByStatus(
    @Res() res: Response,
    @Param("filter") filter: Status
  ) {
    const pdfDoc = await this.reportsService.generateCompaniesReportByStatus(
      filter
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users-report.pdf"'
    );
    pdfDoc.info.Title = "Users Report";
    pdfDoc.info.Author = "GlobalSi";
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
