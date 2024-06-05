import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkflowController } from './workflow/workflow.controller';
import { WorkflowService } from './workflow/workflow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {filling_data} from "./database/filling_data";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'passwort',
      database: 'LowCode',
      entities: [filling_data],
      synchronize: true,
    }),
  ],
  controllers: [AppController, WorkflowController],
  providers: [AppService, WorkflowService],
})
export class AppModule {}
