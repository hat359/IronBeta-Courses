// tests/app.test.ts

import { expect } from 'chai';
import request from 'supertest';
import app from '../index'; // Assuming your Express app is exported from app.ts

describe('App Tests', () => {
  // Test server startup and root endpoint
  describe('Server Setup and Root Endpoint', () => {
    it('should start the server successfully', async () => {
      const response = await request(app).get('/');
      expect(response.status).to.equal(200);
      expect(response.text).to.include('Server running on port');
    });
  });

  // Test API endpoints
  describe('API Endpoint Tests', () => {
    it('should get list of courses', async () => {
      const response = await request(app).get('/api/v1/courses');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });

    it('should create a new course', async () => {
      const newCourse = { title: 'New Course', description: 'This is a new course' };
      const response = await request(app).post('/api/v1/courses').send(newCourse);
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.equal(newCourse.title);
      expect(response.body.description).to.equal(newCourse.description);
    });
  });

  // Test error handling middleware
  describe('Error Handling Middleware', () => {
    it('should handle 404 Not Found', async () => {
      const response = await request(app).get('/nonexistent-route');
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property('error');
    });
  });

  // Test server shutdown (optional)
  // This assumes you have a shutdown function in your app to gracefully close the server
  after(async () => {
    await (app as any).shutdown(); // Assuming you have a shutdown function in your app
  });
});
