import CourseList from "@/components/CourseList";
import globalStyles from "@/styles/global.module.css";
import { Header } from "@/components/Header";

export default function Courses() {
  return (
    <div className={globalStyles.page}>
      <main className={globalStyles.container}>
        <Header />
        <div
          style={{
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          <CourseList />
        </div>
      </main>
    </div>
  );
}
