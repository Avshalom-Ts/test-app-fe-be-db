import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { Pool } from 'pg';
import connectPgSimple from 'connect-pg-simple';
import { PassportModule } from '@nestjs/passport';
import session from 'express-session';
import passport from 'passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbUrl = `postgresql://${configService.get('POSTGRES_USER')}:${configService.get('POSTGRES_PASSWORD')}@${configService.get('POSTGRES_HOST')}:${configService.get('POSTGRES_PORT')}/${configService.get('POSTGRES_DB')}`;
        Logger.log(`Connecting to PostgreSQL at: ${dbUrl}`, 'TypeORM');

        return {
          type: 'postgres',
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          host: configService.get('POSTGRES_HOST'),
          port: +configService.get<number>('POSTGRES_PORT'),
          entities: [],
          synchronize: true,
        }
      },
      inject: [ConfigService],
    }),
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(configService: ConfigService) {
    const dbUrl = `postgresql://${configService.get('POSTGRES_USER')}:${configService.get('POSTGRES_PASSWORD')}@${configService.get('POSTGRES_HOST')}:${configService.get('POSTGRES_PORT')}/${configService.get('POSTGRES_DB')}`;
    Logger.log(`PostgreSQL URL: ${dbUrl}`, 'AppModule');
  }
}
// configure(consumer: MiddlewareConsumer) {
// Create a new PostgreSQL connection pool
// const pgPool = new Pool({
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DB,
//   host: process.env.POSTGRES_HOST,
//   port: +process.env.POSTGRES_PORT,
// });
// connect-pg-simple for session management with PostgreSQL
// const PgSession = connectPgSimple(session);
// consumer
//   .apply(
//     session({
//       store: new PgSession({
//         pool: pgPool, // TypeORM's PostgreSQL connection pool
//         // tableName: 'session', // Optional: customize table name
//       }),
//       secret:
//         process.env.SESSION_SECRET ||
//         'erhbrynjtmdtfherathbyjmnhdtfxzfhgzfgbgdftaherhtgn', // Secret key for signing the session
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         httpOnly: true, // if false, Allow client-side JavaScript to access the cookie
//         /** If the app is served over HTTP within Docker,
//         /* ensure that cookie: { secure: false } is used in session middleware to avoid blocking non- HTTPS cookies.
//         /* secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)-Not needed for Docker over HTTP
//         /* Set the sameSite attribute to 'none' to allow cookies to be sent across different origins (in this case, different ports).
//         /* Additionally, the cookie must be marked as secure when sameSite is set to 'none'.
//         */
//         // secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'postprod',
//         // Set to false when using dev mode with localhost(from angular proxy.conf.json)
//         // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
//         secure: false,
//         /**
//          * Since frontend (anydashy.com) and backend (api.anydashy.com) are on different subdomains,
//          * you need sameSite: 'None' to allow cross-site cookies.
//          * lax | strict | none
//          */
//         // sameSite: process.env.NODE_ENV === 'production' ? 'none' : (process.env.NODE_ENV === 'postprod' ? 'strict' : 'strict'), // set to strict when using dev mode with localhost(from angular proxy.conf.json)
//         sameSite: 'strict',
//         // maxAge: 3600000 * 24, // 24 hours
//         maxAge: 3600000 * 168, // 1 week
//       },
//     }),
//     passport.initialize(), // Initialize passport
//     passport.session(), // Enable passport sessions

//     // Logging middleware
//     (req, res, next) => {
//       // console.log(`Request URL: ${req.url}`);
//       // console.log(`Full URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
//       // console.log("🚀 ~ Incoming request cookie:", req.cookie);
//       // console.log("🚀 ~ Session data:", req.session);
//       next();
//     }
//   )
// .forRoutes('*'); // Apply the session middleware globally
// consumer.apply(ApiKeyMiddleware).forRoutes('/api/auth');
// }
// }
