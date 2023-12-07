import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from './wallet/wallet.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }), //configuring env
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 5 }]), // Throttled and rate-limiting endpoints
    MongooseModule.forRoot(process.env.DB_URL), //Connecting db
    WalletModule,
    AuthModule,
  ],
})
export class AppModule {}
