import { Course, CoursePayload } from "@/models/course.model";
import * as courseRepository from "@/repositories/course.repository";

export const getCourseById = (courseId: string): Course => {
  const course = courseRepository.getById(courseId);

  if (!course) {
    // ...
  }

  return course!;
};

export const getAllCourses = (): Course[] => {
  const courses = courseRepository.getAll();

  if (!courses) {
    return [];
  }

  return courses;
};

export const createCourse = (data: CoursePayload) => {
  const result = courseRepository.create(data);

  return result;
};

export const deleteCourse = () => {
  // ...
};

export const updateCourse = () => {
  // ...
};
