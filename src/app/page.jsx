"use client"
import clsx from "clsx";
import styles from "./page.module.css";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { sizeMobile, sizeTablet } from "@/config/constants";

const page = () => {
  const isMobile = useMediaQuery({ query: `(max-width: ${sizeMobile})` });
  const isTablet = useMediaQuery({ query: `(max-width: ${sizeTablet})` });

  const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

    const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.landingPage}>
      <div className={styles.navHeroWrapper}>
        <Navbar />
        {/* HERO SECTION */}
        <div className={styles.heroSection}>
          <div className={styles.heroBanner}>
            <div className={styles.textCtaCtn}>
              <div className={styles.textCtn}>
                <div className={styles.heroTitle}>
                  Become a Certified Corrective Exercise Specialist
                </div>

                <div className={styles.heroDescription}>
                  {mounted && isMobile
                    ? `Earn the top-rated TBMM-CES credential recognized in 80+ countries. Master musculoskeletal assessment and corrective exercise programming.`
                    : `Earn the top-rated TBMM-CES credential recognized in over 80
                  countries. Master musculoskeletal assessment and corrective
                  exercise programming with the premier CES certification.`}
                </div>
              </div>

              <div className={styles.ctaCtn}>
                <Button
                  label="Unlock Access Now"
                  bgColor="#d7fb01"
                  color="#101211"
                  internal="/checkout?p_id=c2ffbad8-bc93-45d0-974f-b0009d439426"
                />

                <Link
                  className={clsx(
                    styles.ctaSecondary,
                    isLoading && styles.disabled,
                  )}
                  href={"/products/tbmm-ces"}
                  onClick={(e) => {
                    if (isLoading) {
                      e.preventDefault();
                      return;
                    }
                    setIsLoading(true);
                  }}
                >
                  <span className={styles.label}>Learn More</span>
                  {isLoading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.spinner}
                    >
                      <path d="M12 2v4" />
                      <path d="m16.2 7.8 2.9-2.9" />
                      <path d="M18 12h4" />
                      <path d="m16.2 16.2 2.9 2.9" />
                      <path d="M12 18v4" />
                      <path d="m4.9 19.1 2.9-2.9" />
                      <path d="M2 12h4" />
                      <path d="m4.9 4.9 2.9 2.9" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.icon}
                    >
                      <path d="m5 9 7-7 7 7" />
                      <path d="M12 16V2" />
                      <circle cx="12" cy="21" r="1" />
                    </svg>
                  )}
                </Link>
              </div>
            </div>

            <div className={styles.rightCtn}>
              <div className={styles.imageBadgeWrapper}>
                <img
                  className={styles.heroImage}
                  src="/hero_banner.svg"
                  alt="Hero"
                />
                <div className={clsx(styles.infoBadge, styles.infoBadge1)}>
                  <span className={styles.indicator}></span>
                  <span className={styles.badgeText}>
                    E-delivery of access code
                  </span>
                </div>

                <div className={clsx(styles.infoBadge, styles.infoBadge2)}>
                  <span className={styles.indicator}></span>
                  <div className={styles.badgeText}>7 CPDs from REPS India</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.purchaseNote}>
            * Purchase your access code from Physiolution and unlock The
            BioMechanics Method® Corrective Exercise Specialist course on
            thebiomechanicsmethod.com
          </div>
        </div>
      </div>

      {/* FEATURE SECTION */}
      <div className={styles.featureSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.heading}>
            Why Choose The Biomechanics Method?
          </span>
          <span className={styles.subheading}>
            Elevate your expertise with a comprehensive understanding of human
            movement and corrective exercise strategies
          </span>
        </div>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <div className={styles.textCtn}>
              <span className={styles.heading}>Worldwide Recognition</span>
              <span className={styles.description}>
                Join specialists in over 80 countries with the highest-rated
                corrective exercise credential in the fitness industry
              </span>
            </div>
          </div>
          <div className={styles.featureCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
              <circle cx="12" cy="8" r="6" />
            </svg>
            <div className={styles.textCtn}>
              <span className={styles.heading}>Extensive CEC Approval</span>
              <span className={styles.description}>
                Approved by ACE, ACSM, NSCA, NASM, and 15+ major certifying
                organizations including REPS India (7 CPDs)
              </span>
            </div>
          </div>
          <div className={styles.featureCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
              <path d="M7 21h10" />
              <rect width="20" height="14" x="2" y="3" rx="2" />
            </svg>
            <div className={styles.textCtn}>
              <span className={styles.heading}>
                Comprehensive Online Learning
              </span>
              <span className={styles.description}>
                5 complete modules with video demonstrations, digital materials,
                assessment forms, and unlimited test retakes
              </span>
            </div>
          </div>
          <div className={styles.featureCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
              <path d="m2.5 21.5 1.4-1.4" />
              <path d="m20.1 3.9 1.4-1.4" />
              <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
              <path d="m9.6 14.4 4.8-4.8" />
            </svg>
            <div className={styles.textCtn}>
              <span className={styles.heading}>200+ Corrective Exercises</span>
              <span className={styles.description}>
                Complete exercise library with progressions and regressions for
                addressing musculoskeletal imbalances
              </span>
            </div>
          </div>
          <div className={styles.featureCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.icon}
            >
              <path d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49" />
              <path d="M15 15h6" />
              <path d="M18 12v6" />
            </svg>
            <div className={styles.textCtn}>
              <span className={styles.heading}>Real Client Case Studies</span>
              <span className={styles.description}>
                Learn from comprehensive real-life examples demonstrating the
                complete BioMechanics Method process
              </span>
            </div>
          </div>
          <div
            className={clsx(styles.featureCard, styles.clickable)}
            onClick={() => {
              window.location.href =
                "https://www.thebiomechanicsmethod.com/find-a-specialist-near-you/";
            }}
          >
            <div className={styles.iconsCtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <path d="M8 2v4" />
                <path d="M12 2v4" />
                <path d="M16 2v4" />
                <rect width="16" height="18" x="4" y="4" rx="2" />
                <path d="M8 10h6" />
                <path d="M8 14h8" />
                <path d="M8 18h5" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.ctaIcon}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <div className={styles.textCtn}>
              <span className={styles.heading}>
                Specialist Referral Register
              </span>
              <span className={styles.description}>
                Get listed on the official TBMM Online Specialist Referral
                Register to attract new clients worldwide
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PARTNERSHIPS SECTION */}
      <div className={styles.partnershipsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.heading}>Approved for CECs Worldwide</span>
          <span className={styles.subheading}>
            {mounted && isMobile
              ? `TBMM-CES course is approved for continuing education credits by 15+ organizations globally.`
              : `The TBMM-CES course is approved for continuing education credits by
            15+ major certifying organizations globally`}
          </span>
        </div>

        <div className={styles.partnershipsWrapper}>
          <div className={styles.partnershipsGrid}>
            <div className={styles.partnershipsCard}>
              <div className={styles.header}>
                <span className={styles.heading}>ACE</span>
                <span className={styles.count}>8.0</span>
              </div>
              <span className={styles.subheading}>
                American Council on Exercise
              </span>
            </div>
            <div className={styles.partnershipsCard}>
              <div className={styles.header}>
                <span className={styles.heading}>ACSM</span>
                <span className={styles.count}>8.0</span>
              </div>
              <span className={styles.subheading}>
                American College of Sports Medicine
              </span>
            </div>
            <div className={styles.partnershipsCard}>
              <div className={styles.header}>
                <span className={styles.heading}>NSCA</span>
                <span className={styles.count}>2.0</span>
              </div>
              <span className={styles.subheading}>
                National Strength and Conditioning
              </span>
            </div>
            <div className={styles.partnershipsCard}>
              <div className={styles.header}>
                <span className={styles.heading}>NASM</span>
                <span className={styles.count}>1.9</span>
              </div>
              <span className={styles.subheading}>
                National Academy of Sports Medicin
              </span>
            </div>
            <div className={clsx(styles.partnershipsCard, styles.active)}>
              <div className={styles.badge}>
                <span className={styles.label}>INDIA</span>
              </div>
              <div className={styles.header}>
                <span className={styles.heading}>REPS India</span>
                <span className={styles.count}>7</span>
              </div>
              <span className={styles.subheading}>
                Register of Exercise Professionals
              </span>
            </div>
            <div className={styles.partnershipsCard}>
              <div className={styles.header}>
                <span className={styles.heading}>CIMSPA</span>
                <span className={styles.count}>10</span>
              </div>
              <span className={styles.subheading}>Chartered Institute UK</span>
            </div>
            <div className={styles.partnershipsCard}>
              <div className={styles.header}>
                <span className={styles.heading}>ISSA</span>
                <span className={styles.count}>20</span>
              </div>
              <span className={styles.subheading}>
                International Sports Sciences
              </span>
            </div>
            <div className={styles.partnershipsCard}>
              <div className={styles.header}>
                <span className={styles.heading}>BOC</span>
                <span className={styles.count}>32</span>
              </div>
              <span className={styles.subheading}>Board of Certification</span>
            </div>
          </div>

          <div className={styles.aabCtn}>
            <span className={styles.heading}>Also Approved By:</span>

            <div className={styles.aabGrid}>
              <div className={styles.aabItem}>
                <span className={styles.label}>NETA • 80 CECs</span>
              </div>
              <div className={styles.aabItem}>
                <span className={styles.label}>AUSactive • 37 CPDs</span>
              </div>
              <div className={styles.aabItem}>
                <span className={styles.label}>CSEP • 15 CPDs</span>
              </div>
              <div className={styles.aabItem}>
                <span className={styles.label}>NPCP • 80 CECs</span>
              </div>
              <div className={styles.aabItem}>
                <span className={styles.label}>REPs UAE • 16 CPDs</span>
              </div>
              <div className={styles.aabItem}>
                <span className={styles.label}>REPs NZ • 20 CPDs</span>
              </div>
              <div className={styles.aabItem}>
                <span className={styles.label}>AFAA • 1.5 CEUs</span>
              </div>
              <div className={styles.aabItem}>
                <span className={styles.label}>VBOPT • 32 Type 1</span>
              </div>
            </div>

            <div className={styles.note}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <span className={styles.text}>
                Eligible for credits from NESTA, NFPT, WITS, YMCA, and many
                other certifying organizations upon petition
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CURRICULUM SECTION */}
      <div className={styles.curriculumSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.heading}>TBMM-CES Full Curriculum</span>
        </div>

        <div className={styles.curriculumGrid}>
          <div className={styles.moduleCard}>
            <span className={styles.number}>1.</span>
            <div className={styles.moduleContentCtn}>
              <span className={styles.heading}>
                Fundamentals of Structural Assessment
              </span>
              <span className={styles.description}>
                Learn step-by-step musculoskeletal assessment techniques for
                identifying imbalances
              </span>
            </div>
          </div>
          <div className={styles.moduleCard}>
            <span className={styles.number}>2.</span>
            <div className={styles.moduleContentCtn}>
              <span className={styles.heading}>
                Understanding Muscles and Movement
              </span>
              <span className={styles.description}>
                Discover how gravity and ground reaction forces affect body
                movement and muscle function
              </span>
            </div>
          </div>
          <div className={styles.moduleCard}>
            <span className={styles.number}>3.</span>
            <div className={styles.moduleContentCtn}>
              <span className={styles.heading}>
                Fundamentals of Corrective Exercise
              </span>
              <span className={styles.description}>
                Master myofascial release, stretching, and strengthening
                techniques with progressions
              </span>
            </div>
          </div>
          <div className={styles.moduleCard}>
            <span className={styles.number}>4.</span>
            <div className={styles.moduleContentCtn}>
              <span className={styles.heading}>
                Complete Corrective Exercise Library
              </span>
              <span className={styles.description}>
                Access nearly 200 exercises with demonstrations and teaching
                tips for every technique
              </span>
            </div>
          </div>

          <div className={styles.moduleCardLarge}>
            <div className={styles.moduleContentCtn}>
              <div className={styles.header}>
                <span className={styles.number}>5.</span>
                <span className={styles.heading}>
                  Corrective Exercise Program Design
                </span>
              </div>
              <span className={styles.subheading}>
                Learn client communication, program development, and real-world
                application strategies
              </span>
            </div>

            <Link className={styles.cta} href="/products/tbmm-ces">
              <span className={styles.label}>Full Curriculum</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m12 16 4-4-4-4" />
                <path d="M8 12h8" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* STEPS SECTION */}
      <div className={styles.stepSection}>
        {mounted && !isTablet && (
          <div className={styles.imageCtn}>
            <img className={styles.courseImage} src="/courseMockup.png" />
          </div>
        )}

        <div className={styles.stepContentCtn}>
          <div className={styles.sectionHeader}>
            <span className={styles.heading}>
              Begin Your Biomechanics Journey In Three Easy Steps.
            </span>
            <span className={styles.subheading}>
              We make accessing your course simple and hassle-free.
            </span>
          </div>
          {mounted && isTablet && (
            <div className={styles.imageCtn}>
              <img className={styles.courseImage} src="/courseMockup.png" />
            </div>
          )}
          <div className={styles.stepCtn}>
            <div className={styles.line}></div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span className={styles.label}>1</span>
              </div>
              <div className={styles.stepDetails}>
                <span className={styles.title}>Purchase Your Access Code</span>
                <span className={styles.description}>
                  Complete your purchase through{" "}
                  <Link className={styles.aTag} href="/products/tbmm-ces">
                    Physiolution
                  </Link>{" "}
                  to receive your unique access code.
                </span>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span className={styles.label}>2</span>
              </div>
              <div className={styles.stepDetails}>
                <span className={styles.title}>Redeem on Official Portal</span>
                <span className={styles.description}>
                  Visit{" "}
                  <a
                    className={styles.aTag}
                    href="https://thebiomechanicsmethod.inspire360.com/thebiomechanicsmethod/2e_TBMM-CES"
                  >
                    thebiomechanicsmethod.com
                  </a>{" "}
                  and enter your code to activate your course access
                </span>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>
                <span className={styles.label}>3</span>
              </div>
              <div className={styles.stepDetails}>
                <span className={styles.title}>Start Learning Immediately</span>
                <span className={styles.description}>
                  Access your comprehensive course materials and begin your
                  biomechanics education journey
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className={styles.ctaSection}>
        <div className={styles.textCtn}>
          <span className={styles.heading}>Get Your Access Code Today</span>
          <span className={styles.subheading}>
            {mounted && !isTablet
              ? `Join professionals who have elevated their expertise through The
            Biomechanics Method. Purchase your access code from the Only
            India-based distributor & reseller of The BioMechanics Method
            Corrective Exercise Specialist course.`
              : `Get The Biomechanics Method access code from India’s official distributor.`}
          </span>
        </div>

        <Button
          label="Unlock Access Now"
          bgColor="#ef6707"
          color="#fafafa"
          internal="/checkout?p_id=c2ffbad8-bc93-45d0-974f-b0009d439426"
        />
      </div>

      {/* FOOTER SECTION */}
      <Footer />
    </div>
  );
};

export default page;
