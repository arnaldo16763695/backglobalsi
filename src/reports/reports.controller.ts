import { Controller, Get, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('users')
  async generateUsersReport( @Res() res: Response) {
    const pdfDoc = await this.reportsService.generateUsersReport();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="users-report.pdf"');
    pdfDoc.info.Title = 'Users Report';
    pdfDoc.info.Author = 'GlobalSi';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
