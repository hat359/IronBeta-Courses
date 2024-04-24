import { Request, Response } from 'express';
import Course, { ICourse } from '../models/course';

export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses: ICourse[] = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addCourse = async (req: Request, res: Response): Promise<void> => {
 
  

  try {
    const { id,name, description, price } = req.body;

   
    const course: ICourse = new Course({ id,name, description, price });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
 
  try {
    const { id } = req.params;
    
    const deletedCourse: ICourse | null = await Course.findByIdAndDelete(id);
    
   
    if (deletedCourse) {
      res.status(200).json(deletedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const updatedCourse: ICourse | null = await Course.findByIdAndUpdate(
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

    const updatedCourse: ICourse | null = await Course.findByIdAndUpdate(
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
