import Link from "next/link";
import styles from "./HomeBtn.module.css";

const HomeBtn = () => {

  return (
    <Link className={styles.homeBtn} href='/'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span className={styles.homeBtnText}>Home</span>
    </Link>
  );
}

export default HomeBtn
