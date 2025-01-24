import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [RolesModule, AuthModule, ConfigModule],
})
export class SeedModule {}
