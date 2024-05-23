import { Request, Response } from 'express';
import Course from '../models/Course'; // Corrected import statement

export const addCommentToCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseId = req.params.id; // Assuming 'id' is the parameter for course _id
    const { userId, reviewText,rating,createdOn } = req.body; // Assuming request body contains 'text' and 'user' for the comment

    // Find the course by its _id
    const course = await Course.findById("6645407865bf0138831d720a");

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    // Add the new comment to the course's comments array
    course.reviews.push({ userId, reviewText,rating,createdOn });
    await course.save();

    res.status(201).json(course); // Return the updated course object
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseData= req.body;
    const course = new Course(courseData);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad Request' });
  }
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (deletedCourse) {
      res.status(200).json(deletedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates=req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (updatedCourse) {
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const partialUpdateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (updatedCourse) {
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
