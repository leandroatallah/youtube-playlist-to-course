"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { Course } from "@/models/course.model";
import { getDataFromLocalStorage } from "@/database/localStorage";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = () => {
    const data = getDataFromLocalStorage();
    setCourses(data.courses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Utemy</h1>
        <button onClick={fetchCourses}>fetch courses</button>

        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
