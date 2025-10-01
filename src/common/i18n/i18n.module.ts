import { Module } from '@nestjs/common';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '../../i18n/'),
        watch: true,
      },
      resolvers: [new QueryResolver(['lang', 'locale']), AcceptLanguageResolver],
    }),
  ],
})
export class I18nCustomModule {}



