import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { WorksModule } from './works/works.module';
import { AuditsModule } from './audits/audits.module';
import { StepstoworksModule } from './stepstoworks/stepstoworks.module';
import { TechniciansModule } from './technicians/technicians.module';
import { ReportsController } from './reports/reports.controller';
import { ReportsModule } from './reports/reports.module';
import { PrinterModule } from './printer/printer.module';


@Module({
  imports: [UsersModule, ClientsModule, CompaniesModule, AuthModule, WorksModule, AuditsModule, StepstoworksModule, TechniciansModule, ReportsModule, PrinterModule],
  controllers: [ReportsController],
  providers: [],
})
export class AppModule {}
