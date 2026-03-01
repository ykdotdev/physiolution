import { useRouter } from 'next/navigation';
import styles from './Button.module.css'

const Button = ({label, bgColor, color, internal, external}) => {
    const router = useRouter();
    const handleClick = ()=>{
        if (internal){
            router.push(internal);
        } else if (external){
            window.location.href = external;
        } else{
            return undefined;
        }
    }
  return (
    <button
    className={styles.CTA}
    onClick={handleClick}
    >
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
