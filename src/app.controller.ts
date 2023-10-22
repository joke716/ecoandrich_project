import { Controller } from '@nestjs/common';
import { AppService } from '@Root/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
