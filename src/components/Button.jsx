import styles from './Button.module.css'
import Link from 'next/link';

const Button = ({label, bgColor, color, internal, external}) => {

  return internal ? (
    <Link className={styles.CTA} href={internal }>
      <span className={styles.label}>{label}</span>
      <div className={styles.iconCtn} style={{ backgroundColor: bgColor }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.ctaIcon}
          style={{ color }}
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </Link>
  ) : (
    <button className={styles.CTA} onClick={()=>{window.location.href = external;}}>
      <span className={styles.label}>{label}</span>
      <div className={styles.iconCtn} style={{ backgroundColor: bgColor }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.ctaIcon}
          style={{ color }}
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

export default Button
