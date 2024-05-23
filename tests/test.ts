import { Request, Response } from 'express';
import { addCommentToCourse, getAllCourses, addCourse, deleteCourse, updateCourse, partialUpdateCourse } from '../controllers/courseController';
import Course from '../models/Course';

jest.mock('../models/Course');

describe('Course Controllers', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addCommentToCourse', () => {
    it('should add a comment to the course', async () => {
      const courseId = '6645407865bf0138831d720a';
      const mockCourse = {
        _id: courseId,
        reviews: [],
        save: jest.fn().mockResolvedValue(true),
      };
      Course.findById = jest.fn().mockResolvedValue(mockCourse);

      req.params = { id: courseId };
      req.body = { userId: 'user1', reviewText: 'Great course!', rating: 5, createdOn: new Date() };

      await addCommentToCourse(req as Request, res as Response);

      expect(Course.findById).toHaveBeenCalledWith(courseId);
      expect(mockCourse.reviews).toHaveLength(1);
      expect(mockCourse.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCourse);
    });

    it('should return 404 if course not found', async () => {
      Course.findById = jest.fn().mockResolvedValue(null);

      req.params = { id: 'nonexistent-id' };

      await addCommentToCourse(req as Request, res as Response);

      expect(Course.findById).toHaveBeenCalledWith('nonexistent-id');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Course not found' });
    });

    it('should handle errors and return 500', async () => {
      Course.findById = jest.fn().mockRejectedValue(new Error('Test error'));

      req.params = { id: 'some-id' };

      await addCommentToCourse(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('getAllCourses', () => {
    it('should return all courses', async () => {
      const mockCourses = [{ _id: '1' }, { _id: '2' }];
      Course.find = jest.fn().mockResolvedValue(mockCourses);

      await getAllCourses(req as Request, res as Response);

      expect(Course.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCourses);
    });

    it('should handle errors and return 500', async () => {
      Course.find = jest.fn().mockRejectedValue(new Error('Test error'));

      await getAllCourses(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('addCourse', () => {
    it('should add a new course', async () => {
      const newCourse = { _id: 'new-id', title: 'New Course' };
      Course.prototype.save = jest.fn().mockResolvedValue(newCourse);

      req.body = { title: 'New Course' };

      await addCourse(req as Request, res as Response);

      expect(Course.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newCourse);
    });

    it('should handle errors and return 400', async () => {
      Course.prototype.save = jest.fn().mockRejectedValue(new Error('Test error'));

      req.body = { title: 'Invalid Course' };

      await addCourse(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Bad Request' });
    });
  });

  describe('deleteCourse', () => {
    it('should delete the course', async () => {
      const deletedCourse = { _id: 'delete-id' };
      Course.findByIdAndDelete = jest.fn().mockResolvedValue(deletedCourse);

      req.params = { id: 'delete-id' };

      await deleteCourse(req as Request, res as Response);

      expect(Course.findByIdAndDelete).toHaveBeenCalledWith('delete-id');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(deletedCourse);
    });

    it('should return 404 if course not found', async () => {
      Course.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      req.params = { id: 'nonexistent-id' };

      await deleteCourse(req as Request, res as Response);

      expect(Course.findByIdAndDelete).toHaveBeenCalledWith('nonexistent-id');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Course not found' });
    });

    it('should handle errors and return 500', async () => {
      Course.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Test error'));

      req.params = { id: 'some-id' };

      await deleteCourse(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('updateCourse', () => {
    it('should update the course', async () => {
      const updatedCourse = { _id: 'update-id', title: 'Updated Title' };
      Course.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedCourse);

      req.params = { id: 'update-id' };
      req.body = { title: 'Updated Title' };

      await updateCourse(req as Request, res as Response);

      expect(Course.findByIdAndUpdate).toHaveBeenCalledWith('update-id', { title: 'Updated Title' }, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedCourse);
    });

    it('should return 404 if course not found', async () => {
      Course.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      req.params = { id: 'nonexistent-id' };
      req.body = { title: 'Updated Title' };

      await updateCourse(req as Request, res as Response);

      expect(Course.findByIdAndUpdate).toHaveBeenCalledWith('nonexistent-id', { title: 'Updated Title' }, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Course not found' });
    });

    it('should handle errors and return 500', async () => {
      Course.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Test error'));

      req.params = { id: 'some-id' };
      req.body = { title: 'Updated Title' };

      await updateCourse(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('partialUpdateCourse', () => {
    it('should partially update the course', async () => {
      const updatedCourse = { _id: 'partial-update-id', title: 'Partially Updated Title' };
      Course.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedCourse);

      req.params = { id: 'partial-update-id' };
      req.body = { title: 'Partially Updated Title' };

      await partialUpdateCourse(req as Request, res as Response);

      expect(Course.findByIdAndUpdate).toHaveBeenCalledWith('partial-update-id', { title: 'Partially Updated Title' }, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedCourse);
    });

    it('should return 404 if course not found', async () => {
      Course.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      req.params = { id: 'nonexistent-id' };
      req.body = { title: 'Partially Updated Title' };

      await partialUpdateCourse(req as Request, res as Response);

      expect(Course.findByIdAndUpdate).toHaveBeenCalledWith('nonexistent-id', { title: 'Partially Updated Title' }, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Course not found' });
    });

    it('should handle errors and return 500', async () => {
      Course.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Test error'));

      req.params = { id: 'some-id' };
      req.body = { title: 'Partially Updated Title' };

      await partialUpdateCourse(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
