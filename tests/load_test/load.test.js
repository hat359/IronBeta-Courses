import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 }, // ramp-up to 10 users over 1 minute
    { duration: '5m', target: 10 }, // stay at 10 users for 5 minutes
    { duration: '1m', target: 0 },  // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],    // Less than 1% of requests should fail
  },
};

export default function () {
  const payload = JSON.stringify({
    courseCode: `CS${Math.floor(Math.random() * 10000)}`, // Unique course code
    name: 'Introduction to Computer Science',
    description: 'A foundational course in computer science.',
    attributes: {
      availableCredits: 3,
      courseLevel: 'Beginner',
      maxGPAWeight: 4,
      courseLength: '1 semester',
      categoryType: 'Core',
      courseCategory: 'Computer Science',
      courseSubCategory: 'Introductory',
      state: 'CA',
      County: 'San Francisco',
      institution: 'University of California',
    },
    reviews: [],
    faqs: [],
    expiryDate: '2025-12-31T00:00:00.000Z'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = __ENV.HOST || 'http://localhost:3000/api/v1/courses/add';
  const res = http.post(url, payload, params);
  check(res, {
    'POST /api/v1/courses/add is status 201': (r) => r.status === 201,
  });

  sleep(0.1);
}
