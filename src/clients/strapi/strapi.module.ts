import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StrapiService } from './strapi.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [StrapiService],
  exports: [StrapiService],
})
export class StrapiModule {}



