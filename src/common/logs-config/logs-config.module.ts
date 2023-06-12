import { Module } from '@nestjs/common';
import { WinstonModule, utilities } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { Console } from 'winston/lib/winston/transports';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { LogsConfigService } from './logs-config.service';
import { ConfigEnum } from '../enum/config.enum';
import { join } from 'path';

function createDailyRotateTransport(level: string, filename: string) {
  console.log(
    '%c [   join(__dirname, "..", "logs") ]-13',
    'font-size:13px; background:pink; color:#bf2c9f;',
    join(__dirname, '..', 'logs'),
  );
  return new DailyRotateFile({
    level,
    dirname: join(__dirname, '..', 'logs'),
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}

@Module({
  imports: [
    ConfigModule, // Import the ConfigModule here
    WinstonModule.forRootAsync({
      imports: [ConfigModule], // Add ConfigModule to the imports array
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get(ConfigEnum.LOG_CONFIG);
        const timestamp = config.TIMESTAMP;
        const combine = [];
        if (timestamp) {
          combine.push(winston.format.timestamp());
        }
        combine.push(utilities.format.nestLike());
        const consoleTransport = new Console({
          level: config.LOG_LEVEL || 'info',
          format: winston.format.combine(...combine),
        });

        return {
          transports: [
            consoleTransport,
            ...(config.LOG_ON
              ? [
                  createDailyRotateTransport('info', 'application'),
                  createDailyRotateTransport('warn', 'error'),
                ]
              : []),
          ],
        };
      },
    }),
  ],
  providers: [LogsConfigService],
})
export class LogsConfigModule {}
