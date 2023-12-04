import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Transfer {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  amount: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const transferSchema = SchemaFactory.createForClass(Transfer);
