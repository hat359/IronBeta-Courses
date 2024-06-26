import { Request, Response } from 'express';
import Course from '../models/course';

export const addCommentToCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseId = req.params.id; // Assuming 'id' is the parameter for course _id
    const { userId, reviewText, rating, createdOn } = req.body; // Assuming request body contains these fields

    // Find the course by its _id
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    // Add the new comment to the course's comments array
    course.reviews.push({ userId, reviewText, rating, createdOn: createdOn || new Date() });
    await course.save();

    res.status(201).json(course); // Return the updated course object
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addQuestionAnswerToCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseId = req.params.id; // Assuming 'id' is the parameter for course _id
    const { userId, questionText, answerText } = req.body; // Assuming request body contains these fields

    // Find the course by its _id
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    // Add the new question and answer to the course's questionsAndAnswers array
    const questionAndAnswer = {
      userId,
      questionText,
      answerText,
      createdOn: new Date(),
      answeredOn: answerText ? new Date() : undefined, // Set answeredOn only if answerText is provided
    };
    course.questionsAndAnswers.push(questionAndAnswer);
    await course.save();

    res.status(201).json(course); // Return the updated course object
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCourseByCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.params;
    const course = await Course.findOne({ courseCode: code });

    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
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
    const courseData = req.body;

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
    const updates = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });

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

    const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });

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
