import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { CompaniesModule } from './companies/companies.module';


@Module({
  imports: [UsersModule, ClientsModule, CompaniesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
