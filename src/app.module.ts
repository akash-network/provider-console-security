// Import necessary NestJS modules and custom modules
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  // Register and configure modules used in the application
  imports: [
    // Configuration module for managing environment variables and settings
    ConfigModule.forRoot({ load: [configuration] }),

    // Asynchronous Mongoose module initialization for MongoDB integration
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Dependency on ConfigModule
      useFactory: async (configService: ConfigService) => {
        // The database is selected via dbName rather than appended to the URI, so the
        // connection string may carry its own path and query options (authSource, tls, ...)
        const caCert = configService.get('mongodb.tlsCaCert');
        return {
          uri: configService.get('mongodb.connectionString'),
          dbName: configService.get('mongodb.name'),
          // CA certificate content supplied via environment (e.g. Doppler) instead of a tlsCAFile path
          ...(caCert ? { tls: true, ca: caCert } : {}),
        };
      },
      inject: [ConfigService], // Inject ConfigService to use in the factory function
    }),

    // Import custom modules representing different features of the application
    UsersModule, // Manages user-related functionality
    AuthModule, // Handles authentication
    UtilsModule, // Provides utility functions and services
  ],
})
export class AppModule {}
