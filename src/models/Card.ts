import mongoose, { Schema, Document } from 'mongoose';

interface Metadata {
  tags: string[];
  notes: string;
  date: string;
}

export interface ICard extends Document {
  type: 'text' | 'image' | 'link';
  content: any;
  position: {
    x: number;
    y: number;
  };
  metadata: Metadata;
}

const CardSchema: Schema = new Schema({
  type: { type: String, enum: ['text', 'image', 'link'], required: true },
  content: { type: Schema.Types.Mixed, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  metadata: {
    tags: { type: [String], default: [] },
    notes: { type: String, default: '' },
    date: { type: String, required: true },
  },
});

export default mongoose.model<ICard>('Card', CardSchema); 