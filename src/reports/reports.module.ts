import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import {Report} from './reports.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [TypeOrmModule.forFeature([Report])]
})
export class ReportsModule {}
