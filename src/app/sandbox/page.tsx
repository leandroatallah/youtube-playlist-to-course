"use client";

import styles from "../page.module.css";
import { useToast } from "@/context/ToastContext";

export default function Home() {
  const { toast } = useToast();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Utemy</h1>
        <button onClick={() => toast("OLHA só!")}>append toast</button>
      </main>
    </div>
  );
}
