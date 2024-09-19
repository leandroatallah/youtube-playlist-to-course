import { Lesson } from "@/models/lesson.model";

export const getProgress = (lessons: Lesson[]) => {
  const count = lessons.length;
  const doneCount = lessons.filter((lesson) => lesson.done).length;

  return (doneCount / count) * 100;
};
