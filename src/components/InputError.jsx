import React, { useState } from 'react'
import styles from './InputError.module.css'
import clsx from 'clsx';

const InputError = ({msg, position}) => {
  const [btnActive, setBtnActive] = useState(false);

  return (
    <div className={clsx(styles.errorWrapper, position==="top" ? styles.top : styles.right)}>
      <button
        type="button"
        className={clsx(styles.errorBtn, btnActive && styles.active)}
        onClick={() => {
          setBtnActive((prev) => !prev);
        }}
        onBlur={() => setBtnActive(false)}
      >
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <span className={clsx(styles.msg, btnActive && styles.visible)}>
          {msg}
        </span>
      </button>
    </div>
  );
}

export default InputError
