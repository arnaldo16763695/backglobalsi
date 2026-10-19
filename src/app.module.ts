import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { WorksModule } from './works/works.module';
import { AuditsModule } from './audits/audits.module';
import { StepstoworksModule } from './stepstoworks/stepstoworks.module';
import { TechniciansModule } from './technicians/technicians.module';
import { ReportsModule } from './reports/reports.module';
import { PrinterModule } from './printer/printer.module';
import { ImagestoworkModule } from './imagestowork/imagestowork.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ClientsModule,
    CompaniesModule,
    WorksModule,
    AuditsModule,
    StepstoworksModule,
    TechniciansModule,
    ReportsModule,
    PrinterModule,
    ImagestoworkModule,
  ],
})
export class AppModule {}
