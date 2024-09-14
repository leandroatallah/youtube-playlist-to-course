import styles from "../page.module.css";
import CourseList from "@/components/CourseList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Utemy</h1>
        <CourseList />
      </main>
    </div>
  );
}
