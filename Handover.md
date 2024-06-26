## API Handover Documentation

### Overview

This document provides a comprehensive overview of the API endpoints developed for managing courses. The API supports operations such as adding comments, retrieving courses by code, retrieving all courses, adding, deleting, updating, and partially updating courses. Each course includes various attributes, reviews, and FAQs.

### Achievements

1. **Endpoints Developed**:
    - **Paths Management**:
        - Added functionality to manage paths for users including adding, retrieving, updating, and deleting paths.
    - **Course Management**:
        - Added endpoints for adding comments to courses.
        - Developed endpoints for retrieving a single course by its code.
        - Created endpoints for retrieving all courses.
        - Implemented endpoints for adding new courses.
        - Developed endpoints for deleting courses.
        - Created endpoints for updating courses both fully and partially.

2. **Detailed API Documentation**:
    - Each endpoint is documented with its request parameters, request body, and example responses.
    - Clear response codes are provided for each endpoint to indicate successful operations or errors.
    - Example requests and responses are provided to illustrate the usage of each endpoint.

### Endpoints

#### Path Management

1. **Get Paths for a User**
    - **Endpoint:** `GET /api/paths/:userId`
    - **Description:** Retrieves all paths for a given user.
    - **Response:** 
      - `200 OK`: Returns an array of paths.
      - `404 Not Found`: Returns an error if the user or paths are not found.
      - `500 Internal Server Error`: Returns an error if there is an internal server error.

2. **Add a New Path**
    - **Endpoint:** `POST /api/paths`
    - **Description:** Adds a new path for a user.
    - **Request Body:**
      - `userId` (string): The ID of the user.
      - `courses` (array): An array of course objects, each containing `courseId`, `grade`, and `courseCategory`.
    - **Response:** 
      - `201 Created`: Returns the created path object.
      - `400 Bad Request`: Returns an error if the request body is invalid.
      - `500 Internal Server Error`: Returns an error if there is an internal server error.

#### Course Management

1. **Add Comment to Course**
    - **Endpoint:** `POST /courses/addc`
    - **Description:** Adds a comment to a specific course.
    - **Request Body:**
      - `userId` (string): The ID of the user making the comment.
      - `reviewText` (string): The content of the comment.
      - `rating` (number): The rating given by the user.
      - `createdOn` (string): The date when the comment was created.
    - **Response:** 
      - `201 Created`: Returns the updated course object if the comment is successfully added.
      - `404 Not Found`: Returns an error if the course is not found.
      - `500 Internal Server Error`: Returns an error if there is an internal server error.

2. **Get Course by Code**
    - **Endpoint:** `GET /courses/code/:code`
    - **Description:** Retrieves a course by its code.
    - **Response:** 
      - `200 OK`: Returns the course object if found.
      - `404 Not Found`: Returns an error if the course is not found.
      - `500 Internal Server Error`: Returns an error if there is an internal server error.

3. **Get All Courses**
    - **Endpoint:** `GET /courses`
    - **Description:** Retrieves all courses.
    - **Response:** 
      - `200 OK`: Returns an array of course objects.
      - `500 Internal Server Error`: Returns an error if there is an internal server error.

4. **Add Course**
    - **Endpoint:** `POST /courses/add`
    - **Description:** Adds a new course.
    - **Request Body:**
      - `courseCode` (string): The code of the course.
      - `name` (string): The name of the course.
      - `description` (string): The description of the course.
      - `attributes` (object): The attributes of the course.
      - `reviews` (array): The reviews of the course.
      - `faqs` (array): The FAQs of the course.
      - `expiryDate` (string): The expiry date of the course.
      - `createdOn` (string): The creation date of the course.
      - `updatedOn` (string): The last updated date of the course.
    - **Response:** 
      - `201 Created`: Returns the created course object.
      - `400 Bad Request`: Returns an error if the request body is invalid.
      - `500 Internal Server Error`: Returns an error if there is an internal server error.

5. **Delete Course**
    - **Endpoint:** `DELETE /courses/remove/:id`
    - **Description:** Deletes a course by its ID.
    - **Response:** 
      - `200 OK`: Returns the deleted course object if the course is successfully deleted.
      - `404 Not Found`: Returns an error if the course is not found.
      - `500 Internal Server Error`: Returns an error if there is an internal server error.

6. **Update Course**
    - **Endpoint:** `PUT /courses/update/:id`
    - **Description:** Updates an existing course by its ID.
    - **Request Body:**
      - `courseCode` (string): The code of the course.
      - `name` (string): The name of the course.
      - `description` (string): The description of the course.
      - `attributes` (object): The attributes of the course.
      - `reviews` (array): The reviews of the course.
      - `faqs` (array): The FAQs of the course.
      - `expiryDate` (string): The expiry date of the course.
      - `createdOn` (string): The creation date of the course.
      - `updatedOn` (string): The last updated date of the course.
    - **Response:** 
      - `200 OK`: Returns the updated course object if the update is successful.
      - `400 Bad Request`: Returns an error if the request body is invalid.
      - `404 Not Found`: Returns an error if the course is not found.
      - `500 Internal Server Error`: Returns an error if there is an internal server error.

7. **Partially Update Course**
    - **Endpoint:** `PATCH /courses/partialUpdate/:id`
    - **Description:** Partially updates an existing course by its ID.
    - **Request Body:** Any subset of the fields from the full course object, allowing partial updates.
    - **Response:** 
      - `200 OK`: Returns the updated course object if the partial update is successful.
      - `400 Bad Request`: Returns an error if the request body is invalid.
      - `404 Not Found`: Returns an error if the course is not found.
      - `500 Internal Server Error`: Returns an error if there is an internal server error.

### Pending Tasks

1. **API Security**:
    - Implement authentication and authorization mechanisms to secure the API endpoints.
    - Ensure that only authorized users can perform certain operations like adding, updating, and deleting courses.

2. **Data Validation and Error Handling**:
    - Enhance data validation to ensure all inputs are correctly formatted and valid.
    - Improve error handling to provide more detailed and user-friendly error messages.

3. **Documentation**:
    - Generate comprehensive API documentation using tools like Swagger or Postman for easy reference and testing.
    - Include detailed descriptions and examples for all endpoints, including potential error responses and edge cases.

4. **Testing**:
    - Develop comprehensive unit and integration tests for all endpoints to ensure reliability and correctness.
    - Set up continuous integration/continuous deployment (CI/CD) pipelines to automate testing and deployment processes.

5. **Performance Optimization**:
    - Monitor the performance of the API and optimize endpoints to handle large volumes of data efficiently.
    - Implement caching mechanisms where appropriate to reduce database load and improve response times.

6. **Monitoring and Logging**:
    - Set up monitoring and logging to track the usage and performance of the API.
    - Implement alerts to notify the team of any issues or anomalies in real-time.

This handover documentation should provide a clear understanding of the current state of the API, what has been achieved, and what remains to be done. It ensures a smooth transition for further development and maintenance.
