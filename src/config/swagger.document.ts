import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('Eco & Rich Assignment')
      .setDescription('Eco & Rich Assignment')
      .setVersion('1.0')
      .build();
  }
}
