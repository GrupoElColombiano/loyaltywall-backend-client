import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema()
export class Template {
  @Prop({ required: true })
  idSite: number;

  @Prop()
  html: string;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop()
  description: string;

  @Prop()
  name: string;

  @Prop({ required: true, default: false })
  published: boolean;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
