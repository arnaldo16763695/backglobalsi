import {
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Status } from '@prisma/client';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ReportsService } from './reports.service';

@UseGuards(JwtGuard, RolesGuard)
@Roles('ADMIN')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('users')
  async generateUsersReport(@Res() res: Response) {
    const pdfDoc = await this.reportsService.generateUsersReport();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="users-report.pdf"',
    );
    pdfDoc.info.Title = 'Users Report';
    pdfDoc.info.Author = 'GlobalSi';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('users/:filter')
  async generateUsersReportByStatus(
    @Res() res: Response,
    @Param('filter', new ParseEnumPipe(Status)) filter: Status,
  ) {
    const pdfDoc =
      await this.reportsService.generateUsersReportByStatus(filter);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="users-report.pdf"',
    );
    pdfDoc.info.Title = 'Users Report';
    pdfDoc.info.Author = 'GlobalSi';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('clients')
  async generateClientsReport(@Res() res: Response) {
    const pdfDoc = await this.reportsService.generateClientsReport();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="clients-report.pdf"',
    );
    pdfDoc.info.Title = 'Clients Report';
    pdfDoc.info.Author = 'GlobalSi';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('clients/:filter')
  async generateClientReportByStatus(
    @Res() res: Response,
    @Param('filter', new ParseEnumPipe(Status)) filter: Status,
  ) {
    const pdfDoc =
      await this.reportsService.generateClientsReportByStatus(filter);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="clients-report.pdf"',
    );
    pdfDoc.info.Title = 'Clients Report';
    pdfDoc.info.Author = 'GlobalSi';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('companies')
  async generateCompanyReport(@Res() res: Response) {
    const pdfDoc = await this.reportsService.generateCompaniesReport();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="companies-report.pdf"',
    );
    pdfDoc.info.Title = 'Companies Report';
    pdfDoc.info.Author = 'GlobalSi';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('companies/:filter')
  async generateCompanyReportByStatus(
    @Res() res: Response,
    @Param('filter', new ParseEnumPipe(Status)) filter: Status,
  ) {
    const pdfDoc =
      await this.reportsService.generateCompaniesReportByStatus(filter);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="companies-report.pdf"',
    );
    pdfDoc.info.Title = 'Companies Report';
    pdfDoc.info.Author = 'GlobalSi';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  //work by id
  @Get('work/:id')
  async generateWorkReportById(@Res() res: Response, @Param('id') id: string) {
    const pdfDoc = await this.reportsService.generateWorkReportById(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="order-report.pdf"',
    );
    pdfDoc.info.Title = 'Order Report';
    pdfDoc.info.Author = 'GlobalSi';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
