import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleOptions = {
  uri: 'mongodb://localhost/nestjs-example',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};