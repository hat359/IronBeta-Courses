import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  id:number,
  name: string;
  description: string;
  price: number;
}

const CourseSchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Course = mongoose.model<ICourse>('Course', CourseSchema);

export default Course;
