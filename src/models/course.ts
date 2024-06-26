import mongoose, { Schema, Document } from 'mongoose';

// Define the attributes sub-schema
const AttributesSchema = new Schema({
  availableCredits: { type: Number, required: true },
  courseLevel: { type: String, required: true },
  maxGPAWeight: { type: Number, required: true },
  courseLength: { type: String, required: true },
  categoryType: { type: String, required: true },
  courseCategory: { type: String, required: true },
  courseSubCategory: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  state: { type: String, required: true },
  County: { type: String, required: true },
  institution: { type: String, required: true },
  // Add more attributes here as needed in the future
});

// Define the review sub-schema
const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true },
  createdOn: { type: Date, default: Date.now },
});

// Define the FAQ sub-schema
const FaqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

// Define the question and answer sub-schema
const QuestionAnswerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  questionText: { type: String, required: true },
  answerText: { type: String },
  createdOn: { type: Date, default: Date.now },
  answeredOn: { type: Date },
});

// Define the main course schema
const CourseSchema: Schema = new Schema({
  courseCode: { type: String, required: true }, // Added courseCode field
  name: { type: String, required: true },
  description: { type: String },
  detailedDescription: { type: String }, // Added detailedDescription field
  attributes: AttributesSchema,
  reviews: [ReviewSchema],
  faqs: [FaqSchema],
  questionsAndAnswers: [QuestionAnswerSchema], // Added questions and answers field
  expiryDate: { type: Date },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

// Define ICourse interface
interface ICourse extends Document {
  courseCode: string; // Added courseCode field
  name: string;
  description: string;
  detailedDescription: string; // Added detailedDescription field
  attributes: {
    availableCredits: number;
    courseLevel: string;
    maxGPAWeight: number;
    courseLength: string;
    categoryType: string;
    courseCategory: string;
    courseSubCategory: string;
    createdOn: Date;
    updatedOn: Date;
    state: string;
    County: string;
    institution: string;
  };
  reviews: {
    userId: mongoose.Types.ObjectId;
    reviewText: string;
    rating: number;
    createdOn: Date;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  questionsAndAnswers: {
    userId: mongoose.Types.ObjectId;
    questionText: string;
    answerText?: string; // Optional answerText
    createdOn: Date;
    answeredOn?: Date; // Optional answeredOn
  }[];
  expiryDate: Date;
  createdOn: Date;
  updatedOn: Date;
}

// Export the model
export default mongoose.model<ICourse>('Course', CourseSchema);
