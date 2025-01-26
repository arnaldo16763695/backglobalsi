import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';


@Module({
  imports: [UsersModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
