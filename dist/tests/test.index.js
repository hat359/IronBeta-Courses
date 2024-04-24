"use strict";
// tests/app.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Assuming your Express app is exported from app.ts
describe('App Tests', () => {
    // Test server startup and root endpoint
    describe('Server Setup and Root Endpoint', () => {
        it('should start the server successfully', async () => {
            const response = await (0, supertest_1.default)(index_1.default).get('/');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.text).to.include('Server running on port');
        });
    });
    // Test API endpoints
    describe('API Endpoint Tests', () => {
        it('should get list of courses', async () => {
            const response = await (0, supertest_1.default)(index_1.default).get('/api/v1/courses');
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('array');
        });
        it('should create a new course', async () => {
            const newCourse = { title: 'New Course', description: 'This is a new course' };
            const response = await (0, supertest_1.default)(index_1.default).post('/api/v1/courses').send(newCourse);
            (0, chai_1.expect)(response.status).to.equal(201);
            (0, chai_1.expect)(response.body).to.have.property('id');
            (0, chai_1.expect)(response.body.title).to.equal(newCourse.title);
            (0, chai_1.expect)(response.body.description).to.equal(newCourse.description);
        });
    });
    // Test error handling middleware
    describe('Error Handling Middleware', () => {
        it('should handle 404 Not Found', async () => {
            const response = await (0, supertest_1.default)(index_1.default).get('/nonexistent-route');
            (0, chai_1.expect)(response.status).to.equal(404);
            (0, chai_1.expect)(response.body).to.have.property('error');
        });
    });
    // Test server shutdown (optional)
    // This assumes you have a shutdown function in your app to gracefully close the server
    after(async () => {
        await index_1.default.shutdown(); // Assuming you have a shutdown function in your app
    });
});
