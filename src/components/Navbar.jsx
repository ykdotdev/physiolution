import { sizeMobile, sizeTablet } from '@/config/constants';
import clsx from 'clsx';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import styles from './Navbar.module.css'
import Image from 'next/image';
import Button from './Button';

const Navbar = () => {
    const isTablet = useMediaQuery({ query: `(max-width: ${sizeTablet})` });
    const isNavOverflow = useMediaQuery({ query: `(max-width: 1400px)` });
    
    const [menuOpen, setMenuOpen] = useState(false);
        const [mounted, setMounted] = useState(false);
        useEffect(() => {
        setMounted(true);
        }, []);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
      setLoading(true); // start loading (never ends)
    };

  return (
    <div className={styles.navbar}>
      <div className={styles.logoWrapper}>
        <Image
          className={styles.logo}
          src={"/logoPL.svg"}
          width={700}
          height={500}
          alt="logo"
        />
      </div>

      {mounted && !isTablet && (
        <>
          <div className={styles.navMenu}>
            <Link className={clsx(styles.navItem)} href="/about">
              About Us
            </Link>
            <a
              className={clsx(styles.navItem)}
              href="https://www.youtube.com/@Physiolution.biomechanics"
            >
              Videos
            </a>
            <Link className={clsx(styles.navItem)} href="/blog">
              Blogs
            </Link>
            <Link className={clsx(styles.navItem)} href="/contact">
              Contact
            </Link>
            {mounted && isNavOverflow && (
              <a
                className={clsx(styles.navItem)}
                href="https://thebiomechanicsmethod.inspire360.com/login?destination=%2F"
              >
                Login
              </a>
            )}
          </div>
          <div className={styles.rightNavMenu}>
            {mounted && !isNavOverflow && (
              <Button
                label="Course Login"
                external="https://thebiomechanicsmethod.inspire360.com/login?destination=%2F"
              />
            )}
            <Image
              className={styles.logo}
              src={"/logoTBMM.png"}
              width={700}
              height={500}
              alt="logo"
            />
          </div>
        </>
      )}

      {mounted && isTablet && (
        <div className={clsx(styles.mobileNavMenu, menuOpen && styles.open)}>
          <div className={styles.navItems}>
            <Link className={clsx(styles.navItem)} href="/about">
              About
            </Link>
            <a
              className={clsx(styles.navItem)}
              href="https://www.youtube.com/@Physiolution.biomechanics"
            >
              Videos
            </a>
            <Link className={clsx(styles.navItem)} href="/blog">
              Blogs
            </Link>
            <a
              className={clsx(styles.navItem)}
              href="https://thebiomechanicsmethod.inspire360.com/login?destination=%2F"
            >
              Login
            </a>
          </div>

          <button
            className={clsx(styles.navArrow, menuOpen && styles.open)}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
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
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar
