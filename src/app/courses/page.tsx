import CourseList from "@/components/CourseList";
import globalStyles from "@/styles/global.module.css";
import { Header } from "@/components/Header";

export default function Courses() {
  return (
    <div className={globalStyles.page}>
      <main className={globalStyles.container}>
        <Header />
        <CourseList />
        <div style={{ height: 20 }} />
      </main>
    </div>
  );
}
