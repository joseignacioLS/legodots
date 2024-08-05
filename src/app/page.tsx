import Board from "@/components/Board/Board";
import styles from "./page.module.scss";
import SVGPaths from "@/components/SVGPaths/SVGPaths";

export default function Home() {
  return (
    <main className={styles.main}>
      <Board />
    </main>
  );
}
