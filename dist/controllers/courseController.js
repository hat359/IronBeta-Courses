"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialUpdateCourse = exports.updateCourse = exports.deleteCourse = exports.addCourse = exports.getAllCourses = void 0;
const course_1 = __importDefault(require("../models/course"));
const getAllCourses = async (req, res) => {
    try {
        const courses = await course_1.default.find();
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllCourses = getAllCourses;
const addCourse = async (req, res) => {
    try {
        const { id, name, description, price } = req.body;
        const course = new course_1.default({ id, name, description, price });
        await course.save();
        res.status(201).json(course);
    }
    catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
};
exports.addCourse = addCourse;
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await course_1.default.findByIdAndDelete(id);
        if (deletedCourse) {
            res.status(200).json(deletedCourse);
        }
        else {
            res.status(404).json({ error: 'Course not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteCourse = deleteCourse;
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const updatedCourse = await course_1.default.findByIdAndUpdate(id, { name, description, price }, { new: true });
        if (updatedCourse) {
            res.status(200).json(updatedCourse);
        }
        else {
            res.status(404).json({ error: 'Course not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateCourse = updateCourse;
const partialUpdateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedCourse = await course_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (updatedCourse) {
            res.status(200).json(updatedCourse);
        }
        else {
            res.status(404).json({ error: 'Course not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.partialUpdateCourse = partialUpdateCourse;
