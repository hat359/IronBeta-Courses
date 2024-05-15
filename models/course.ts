import mongoose, { Schema, Document } from 'mongoose';

// Define the schema for a single comment
const CommentSchema = new Schema({
  text: { type: String, required: true },
  user: { type: String, required: true },
});

// Define the main schema for the course
const CourseSchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  comments: [CommentSchema], // Define comments as an array of CommentSchema
});

// Define ICourse interface
interface ICourse extends Document {
  id: number;
  name: string;
  description: string;
  price: number;
  comments: Array<{ text: string; user: string }>;
}

// Export the model
export default mongoose.model<ICourse>('Course', CourseSchema);
