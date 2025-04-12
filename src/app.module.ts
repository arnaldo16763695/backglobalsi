import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { WorksModule } from './works/works.module';
import { AuditsModule } from './audits/audits.module';


@Module({
  imports: [UsersModule, ClientsModule, CompaniesModule, AuthModule, WorksModule, AuditsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
