import { Request, Response } from 'express';
import Course from '../models/Course'; // Corrected import statement



export const addCommentToCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseId = req.params.id; // Assuming 'id' is the parameter for course _id
    const { text, user } = req.body; // Assuming request body contains 'text' and 'user' for the comment

    // Find the course by its _id
    const course = await Course.findById("6643d927b187c970c82ef9a2");

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    // Add the new comment to the course's comments array
    course.comments.push({ text, user });
    await course.save();

    res.status(201).json(course); // Return the updated course object
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, description, price, comments } = req.body;

    // Create a new course instance with comments
    const course = new Course({ id, name, description, price, comments });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCourse  = await Course.findByIdAndDelete(id);

    if (deletedCourse) {
      res.status(200).json(deletedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );

    if (updatedCourse) {
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
