import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
        secure: false,
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
