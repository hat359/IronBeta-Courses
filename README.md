### API Documentation

### Overview

This API provides endpoints for managing courses, including adding comments, retrieving courses by code, retrieving all courses, adding, deleting, updating, and partially updating courses. Each course contains various attributes, reviews, and FAQs.

### Endpoints

#### 1. Add Comment to Course

**Endpoint:** `POST /courses/addc`

Adds a comment to a specific course.

**Request Body:**

- `userId` (string): The ID of the user making the comment.
- `reviewText` (string): The content of the comment.
- `rating` (number): The rating given by the user.
- `createdOn` (string): The date when the comment was created.

**Response:**

- `201 Created`: Returns the updated course object if the comment is successfully added.
- `404 Not Found`: Returns an error if the course is not found.
- `500 Internal Server Error`: Returns an error if there is an internal server error.

**Example Request:**

```json
{
  "userId": "12345",
  "reviewText": "Great course!",
  "rating": 5,
  "createdOn": "2024-06-13"
}
```

**Example Response:**

```json
{
  "_id": "6645407865bf0138831d720a",
  "courseCode": "CS101",
  "name": "Introduction to Computer Science",
  "reviews": [
    {
      "userId": "12345",
      "reviewText": "Great course!",
      "rating": 5,
      "createdOn": "2024-06-13"
    }
  ]
}
```

#### 2. Get Course by Code

**Endpoint:** `GET /courses/code/:code`

Retrieves a course by its code.

**Request Parameters:**

- `code` (URL parameter): The code of the course.

**Response:**

- `200 OK`: Returns the course object if found.
- `404 Not Found`: Returns an error if the course is not found.
- `500 Internal Server Error`: Returns an error if there is an internal server error.

**Example Response:**

```json
{
  "_id": "6645407865bf0138831d720a",
  "courseCode": "CS101",
  "name": "Introduction to Computer Science",
  "description": "Basic course on computer science",
  "attributes": {
    "availableCredits": 3,
    "courseLevel": "Beginner",
    "maxGPAWeight": 4,
    "courseLength": "10 weeks",
    "categoryType": "Science",
    "courseCategory": "Computer Science",
    "courseSubCategory": "Introduction",
    "createdOn": "2024-01-01",
    "updatedOn": "2024-01-10",
    "state": "CA",
    "County": "Santa Clara",
    "institution": "Stanford University"
  },
  "reviews": [],
  "faqs": [],
  "expiryDate": "2025-01-01",
  "createdOn": "Unknown",
  "updatedOn": "Unknown"
}
```

#### 3. Get All Courses

**Endpoint:** `GET /courses`

Retrieves all courses.

**Response:**

- `200 OK`: Returns an array of course objects.
- `500 Internal Server Error`: Returns an error if there is an internal server error.

**Example Response:**

```json
[
  {
    "_id": "6645407865bf0138831d720a",
    "courseCode": "CS101",
    "name": "Introduction to Computer Science",
    "description": "Basic course on computer science",
    "attributes": {
      "availableCredits": 3,
      "courseLevel": "Beginner",
      "maxGPAWeight": 4,
      "courseLength": "10 weeks",
      "categoryType": "Science",
      "courseCategory": "Computer Science",
      "courseSubCategory": "Introduction",
      "createdOn": "2024-01-01",
      "updatedOn": "2024-01-10",
      "state": "CA",
      "County": "Santa Clara",
      "institution": "Stanford University"
    },
    "reviews": [],
    "faqs": [],
    "expiryDate": "2025-01-01",
    "createdOn": "Unknown",
    "updatedOn": "Unknown"
  },
  {
    "_id": "6645407865bf0138831d720b",
    "courseCode": "CS102",
    "name": "Data Structures",
    "description": "Advanced course on data structures",
    "attributes": {
      "availableCredits": 4,
      "courseLevel": "Intermediate",
      "maxGPAWeight": 4.5,
      "courseLength": "12 weeks",
      "categoryType": "Science",
      "courseCategory": "Computer Science",
      "courseSubCategory": "Data Structures",
      "createdOn": "2024-02-01",
      "updatedOn": "2024-02-10",
      "state": "CA",
      "County": "Santa Clara",
      "institution": "Stanford University"
    },
    "reviews": [],
    "faqs": [],
    "expiryDate": "2025-02-01",
    "createdOn": "Unknown",
    "updatedOn": "Unknown"
  }
]
```

#### 4. Add Course

**Endpoint:** `POST /courses/add`

Adds a new course.

**Request Body:**

- `courseCode` (string): The code of the course.
- `name` (string): The name of the course.
- `description` (string): The description of the course.
- `attributes` (object): The attributes of the course.
- `reviews` (array): The reviews of the course.
- `faqs` (array): The FAQs of the course.
- `expiryDate` (string): The expiry date of the course.
- `createdOn` (string): The creation date of the course.
- `updatedOn` (string): The last updated date of the course.

**Response:**

- `201 Created`: Returns the created course object.
- `400 Bad Request`: Returns an error if the request body is invalid.
- `500 Internal Server Error`: Returns an error if there is an internal server error.

**Example Request:**

```json
{
  "courseCode": "CS103",
  "name": "Algorithms",
  "description": "Course on algorithms",
  "attributes": {
    "availableCredits": 4,
    "courseLevel": "Advanced",
    "maxGPAWeight": 5,
    "courseLength": "14 weeks",
    "categoryType": "Science",
    "courseCategory": "Computer Science",
    "courseSubCategory": "Algorithms",
    "createdOn": "2024-03-01",
    "updatedOn": "2024-03-10",
    "state": "CA",
    "County": "Santa Clara",
    "institution": "Stanford University"
  },
  "reviews": [],
  "faqs": [],
  "expiryDate": "2025-03-01",
  "createdOn": "Unknown",
  "updatedOn": "Unknown"
}
```

**Example Response:**

```json
{
  "_id": "6645407865bf0138831d720c",
  "courseCode": "CS103",
  "name": "Algorithms",
  "description": "Course on algorithms",
  "attributes": {
    "availableCredits": 4,
    "courseLevel": "Advanced",
    "maxGPAWeight": 5,
    "courseLength": "14 weeks",
    "categoryType": "Science",
    "courseCategory": "Computer Science",
    "courseSubCategory": "Algorithms",
    "createdOn": "2024-03-01",
    "updatedOn": "2024-03-10",
    "state": "CA",
    "County": "Santa Clara",
    "institution": "Stanford University"
  },
  "reviews": [],
  "faqs": [],
  "expiryDate": "2025-03-01",
  "createdOn": "Unknown",
  "updatedOn": "Unknown"
}
```

#### 5. Delete Course

**Endpoint:** `DELETE /courses/remove/:id`

Deletes a course by its ID.

**Request Parameters:**

- `id` (URL parameter): The ID of the course to be deleted.

**Response:**

- `200 OK`: Returns the deleted course object if the course is successfully deleted.
- `404 Not Found`: Returns an error if the course is not found.
- `500 Internal Server Error`: Returns an error if there is an internal server error.

**Example Response:**

```json
{
  "_id": "6645407865bf0138831d720c",
  "courseCode": "CS103",
  "name": "Algorithms",
  "description": "Course on algorithms",
  "attributes": {
    "availableCredits": 4,
    "courseLevel": "Advanced",
    "maxGPAWeight": 5,
    "courseLength": "14 weeks",
    "categoryType": "Science",
    "courseCategory": "Computer Science",
    "courseSubCategory": "Algorithms",
    "createdOn": "2024-03-01",
    "updatedOn": "2024-03-10",
    "state": "CA",
    "County": "Santa Clara",
    "institution": "Stanford University"
  },
  "reviews": [],
  "faqs": [],
  "expiryDate": "

2025-03-01",
  "createdOn": "Unknown",
  "updatedOn": "Unknown"
}
```

#### 6. Update Course

**Endpoint:** `PUT /courses/update/:id`

Updates an existing course by its ID.

**Request Parameters:**

- `id` (URL parameter): The ID of the course to be updated.

**Request Body:**

- `courseCode` (string): The code of the course.
- `name` (string): The name of the course.
- `description` (string): The description of the course.
- `attributes` (object): The attributes of the course.
- `reviews` (array): The reviews of the course.
- `faqs` (array): The FAQs of the course.
- `expiryDate` (string): The expiry date of the course.
- `createdOn` (string): The creation date of the course.
- `updatedOn` (string): The last updated date of the course.

**Response:**

- `200 OK`: Returns the updated course object if the update is successful.
- `400 Bad Request`: Returns an error if the request body is invalid.
- `404 Not Found`: Returns an error if the course is not found.
- `500 Internal Server Error`: Returns an error if there is an internal server error.

**Example Request:**

```json
{
  "courseCode": "CS103",
  "name": "Advanced Algorithms",
  "description": "Advanced course on algorithms",
  "attributes": {
    "availableCredits": 4,
    "courseLevel": "Advanced",
    "maxGPAWeight": 5,
    "courseLength": "14 weeks",
    "categoryType": "Science",
    "courseCategory": "Computer Science",
    "courseSubCategory": "Algorithms",
    "createdOn": "2024-03-01",
    "updatedOn": "2024-03-10",
    "state": "CA",
    "County": "Santa Clara",
    "institution": "Stanford University"
  },
  "reviews": [],
  "faqs": [],
  "expiryDate": "2025-03-01",
  "createdOn": "Unknown",
  "updatedOn": "Unknown"
}
```

**Example Response:**

```json
{
  "_id": "6645407865bf0138831d720c",
  "courseCode": "CS103",
  "name": "Advanced Algorithms",
  "description": "Advanced course on algorithms",
  "attributes": {
    "availableCredits": 4,
    "courseLevel": "Advanced",
    "maxGPAWeight": 5,
    "courseLength": "14 weeks",
    "categoryType": "Science",
    "courseCategory": "Computer Science",
    "courseSubCategory": "Algorithms",
    "createdOn": "2024-03-01",
    "updatedOn": "2024-03-10",
    "state": "CA",
    "County": "Santa Clara",
    "institution": "Stanford University"
  },
  "reviews": [],
  "faqs": [],
  "expiryDate": "2025-03-01",
  "createdOn": "Unknown",
  "updatedOn": "Unknown"
}
```

#### 7. Partially Update Course

**Endpoint:** `PATCH /courses/partialUpdate/:id`

Partially updates an existing course by its ID.

**Request Parameters:**

- `id` (URL parameter): The ID of the course to be updated.

**Request Body:**

- Any subset of the fields from the full course object, allowing partial updates.

**Response:**

- `200 OK`: Returns the updated course object if the partial update is successful.
- `400 Bad Request`: Returns an error if the request body is invalid.
- `404 Not Found`: Returns an error if the course is not found.
- `500 Internal Server Error`: Returns an error if there is an internal server error.

**Example Request:**

```json
{
  "name": "Algorithms",
  "description": "Updated description for algorithms course"
}
```

**Example Response:**

```json
{
  "_id": "6645407865bf0138831d720c",
  "courseCode": "CS103",
  "name": "Algorithms",
  "description": "Updated description for algorithms course",
  "attributes": {
    "availableCredits": 4,
    "courseLevel": "Advanced",
    "maxGPAWeight": 5,
    "courseLength": "14 weeks",
    "categoryType": "Science",
    "courseCategory": "Computer Science",
    "courseSubCategory": "Algorithms",
    "createdOn": "2024-03-01",
    "updatedOn": "2024-03-10",
    "state": "CA",
    "County": "Santa Clara",
    "institution": "Stanford University"
  },
  "reviews": [],
  "faqs": [],
  "expiryDate": "2025-03-01",
  "createdOn": "Unknown",
  "updatedOn": "Unknown"
}
```

### Summary

This API provides a comprehensive set of endpoints for managing course data, including the ability to create, read, update, and delete courses, as well as to add comments and retrieve courses by specific criteria. Each endpoint is designed to handle various aspects of course management, ensuring that all necessary operations can be performed efficiently and effectively.
![image](https://github.com/hat359/IronBeta-Courses/assets/48184672/b23b8a72-0f3c-46d4-a053-559cef19b30a)
