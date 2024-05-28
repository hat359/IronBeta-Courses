import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import connectDB from '../src/models/db';
import course from '../src/models/course';

beforeAll(async () => {
  await connectDB();
  console.log('Connected to MongoDB');
});

afterAll(async () => {
  await course.deleteMany({});
  await mongoose.disconnect();
  console.log("disconnected from mongo db and deleted all the previous courses.")
});

describe('Course Routes', () => {
    it('should add a new course', async () => { 
      const newCourse = {
        "courseCode": "CS101",
        "name": "Introduction to Computer Science",
        "description": "A foundational course in computer science.",
        "attributes": {
          "availableCredits": 3,
          "courseLevel": "Beginner",
          "maxGPAWeight": 4,
          "courseLength": "1 semester",
          "categoryType": "Core",
          "courseCategory": "Computer Science",
          "courseSubCategory": "Introductory",
          "state": "CA",
          "County": "San Francisco",
          "institution": "University of California"
        },
        "reviews": [],
        "faqs": [],
        "expiryDate": new Date('2025-12-31')
      };
  
      const response = await request(app)
        .post('/api/v1/courses/add')
        .send(newCourse)
        .expect(201);
  
      expect(response.body).toHaveProperty('_id');
      expect(response.body.courseCode).toBe(newCourse.courseCode);
      expect(response.body.name).toBe(newCourse.name);
      expect(response.body.description).toBe(newCourse.description);
      expect(response.body.attributes.availableCredits).toBe(newCourse.attributes.availableCredits);
      expect(response.body.attributes.courseLevel).toBe(newCourse.attributes.courseLevel);
      expect(response.body.attributes.maxGPAWeight).toBe(newCourse.attributes.maxGPAWeight);
      expect(response.body.attributes.courseLength).toBe(newCourse.attributes.courseLength);
      expect(response.body.attributes.categoryType).toBe(newCourse.attributes.categoryType);
      expect(response.body.attributes.courseCategory).toBe(newCourse.attributes.courseCategory);
      expect(response.body.attributes.courseSubCategory).toBe(newCourse.attributes.courseSubCategory);
      expect(response.body.attributes.state).toBe(newCourse.attributes.state);
      expect(response.body.attributes.County).toBe(newCourse.attributes.County);
      expect(response.body.attributes.institution).toBe(newCourse.attributes.institution);
      expect(new Date(response.body.expiryDate)).toEqual(newCourse.expiryDate);
    });
  
    it('should get all courses', async () => {
      const response = await request(app)
        .get('/api/v1/courses')
        .expect(200);
  
      expect(Array.isArray(response.body)).toBe(true);
    });


    it('should add a new course', async () => { 
        const newCourse = {
          "courseCode": "CS101",
          "name": "Introduction to Computer Science",
          "description": "A foundational course in computer science.",
          "attributes": {
            "availableCredits": 3,
            "courseLevel": "Beginner",
            "maxGPAWeight": 4,
            "courseLength": "1 semester",
            "categoryType": "Core",
            "courseCategory": "Computer Science",
            "courseSubCategory": "Introductory",
            "state": "CA",
            "County": "San Francisco",
            "institution": "University of California"
          },
          "reviews": [],
          "faqs": [],
          "expiryDate": new Date('2025-12-31')
        };
    
        const response = await request(app)
          .post('/api/v1/courses/add')
          .send(newCourse)
          .expect(201);
    
        expect(response.body).toHaveProperty('_id');
        expect(response.body.courseCode).toBe(newCourse.courseCode);
        expect(response.body.name).toBe(newCourse.name);
        expect(response.body.description).toBe(newCourse.description);
        expect(response.body.attributes.availableCredits).toBe(newCourse.attributes.availableCredits);
        expect(response.body.attributes.courseLevel).toBe(newCourse.attributes.courseLevel);
        expect(response.body.attributes.maxGPAWeight).toBe(newCourse.attributes.maxGPAWeight);
        expect(response.body.attributes.courseLength).toBe(newCourse.attributes.courseLength);
        expect(response.body.attributes.categoryType).toBe(newCourse.attributes.categoryType);
        expect(response.body.attributes.courseCategory).toBe(newCourse.attributes.courseCategory);
        expect(response.body.attributes.courseSubCategory).toBe(newCourse.attributes.courseSubCategory);
        expect(response.body.attributes.state).toBe(newCourse.attributes.state);
        expect(response.body.attributes.County).toBe(newCourse.attributes.County);
        expect(response.body.attributes.institution).toBe(newCourse.attributes.institution);
        expect(new Date(response.body.expiryDate)).toEqual(newCourse.expiryDate);
      });
});
