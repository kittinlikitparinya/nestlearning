import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/reports.entity';
import {User} from './users/user.entity'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, ReportsModule , TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User , Report],
    synchronize: true,
  })]
})
export class AppModule {}
