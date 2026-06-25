import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './config/env.validation';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.get<string>('DB_HOST'),

        port: configService.get<number>('DB_PORT'),

        username: configService.get<string>('DB_USERNAME'),

        password: configService.get<string>('DB_PASSWORD'),

        database: configService.get<string>('DB_NAME'),

        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
