"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = 'mongodb+srv://harsh:1234@cluster0.xukqm6n.mongodb.net/';
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        // Asserting err is an instance of Error
        if (err instanceof Error) {
            console.error(`Error connecting to MongoDB: ${err.message}`);
        }
        else {
            console.error(`Error connecting to MongoDB: ${err}`);
        }
        process.exit(1);
    }
};
exports.default = connectDB;
