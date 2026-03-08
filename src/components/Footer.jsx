import clsx from 'clsx';
import styles from './Footer.module.css'
import { useEffect, useState } from 'react';
import { sizeMobile, sizeTablet } from '@/config/constants';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const isMobile = useMediaQuery({ query: `(max-width: ${sizeMobile})` });
    const isTablet = useMediaQuery({ query: `(max-width: ${sizeTablet})` });

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.topCtn}>
        <div className={styles.footerLogoCtn}>
          <Image
            className={styles.logo}
            src={"/logoPL.svg"}
            width={700}
            height={500}
            alt="logo"
          />
          {mounted && !isTablet && (
            <span className={styles.label}>
              Only India-based distributor & reseller of The BioMechanics Method
              Corrective Exercise Specialist course.
            </span>
          )}
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.heading}>Quick Links</span>
          <div className={styles.footerItems}>
            <Link className={styles.item} href="/about">
              About Us
            </Link>
            <Link className={styles.item} href="/faq">
              FAQs
            </Link>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <span className={styles.heading}>Resources</span>
          <div className={styles.footerItems}>
            <Link className={styles.item} href="/contact">
              Contact Us
            </Link>
            <Link className={styles.item} href="/blog">
              Blogs
            </Link>
            {mounted && isMobile && (
              <Link className={styles.item} href="/terms-conditions">
                Terms
              </Link>
            )}
          </div>
        </div>

        <div className={clsx(styles.footerColumn, styles.getInTouchColumn)}>
          <span className={styles.heading}>Get in Touch</span>
          <div className={styles.footerItems}>
            <a href="mailto:info@physiolution.co" className={styles.item}>
              info@physiolution.co
            </a>
            <a className={styles.item}>India</a>
          </div>
        </div>
      </div>

      <div className={styles.legalTerms}>
        <span className={styles.copyrightText}>
          2026 Physiolution. All rights reserved
        </span>
        {mounted && !isMobile && (
          <div className={styles.boringCtn}>
            <Link className={styles.label} href="/terms-conditions">
              Terms & Conditions
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer
