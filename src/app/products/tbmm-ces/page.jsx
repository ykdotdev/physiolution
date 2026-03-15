"use client"
import Link from 'next/link';
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import BackBtn from '@/components/BackBtn';

const page = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleVideo = () => {
      if (!videoRef.current) return;

      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    

    const [loaded, setLoaded] = useState(false); 

      useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoaded = () => setLoaded(true);

        video.addEventListener("loadedmetadata", handleLoaded);

        // If metadata already loaded
        if (video.readyState >= 1) {
          setLoaded(true);
        }

        return () => {
          video.removeEventListener("loadedmetadata", handleLoaded);
        };
      }, []);

    const [isLoading, setIsLoading] = useState(false);//Checkout Buttonq

    
  return (
    <>
      <BackBtn />

      <div className={styles.mainCtn}>
        <section className={styles.header}>
          <div className={styles.videoPlayer}>
            <video
              ref={videoRef}
              className={styles.video}
              preload="auto"
              poster="/promoThumbnail.jpg"
              playsInline
              onLoadedMetadata={() => setLoaded(true)}
            >
              <source
                src="https://res.cloudinary.com/dr0c1ufev/video/upload/f_mp4,q_auto,w_720/TBMM-CES_Course_Sample_Clip_nlp13i.mp4"
                type="video/mp4"
              />
            </video>
            <button
              onClick={toggleVideo}
              disabled={!loaded}
              className={styles.controlBtn}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {loaded ? (
                isPlaying ? (
                  // Pause Icon
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
                    <rect x="14" y="3" width="5" height="18" rx="1" />
                    <rect x="5" y="3" width="5" height="18" rx="1" />
                  </svg>
                ) : (
                  // Play Icon
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
                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                  </svg>
                )
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.loadIcon}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
            </button>
          </div>
          <div className={styles.summaryCtaCtn}>
            <div className={styles.header}>
              <div className={styles.name}>
                The BioMechanics Method Corrective Exercise Specialist
                (TBMM-CES) course
              </div>
            </div>
            <div className={styles.pricingCtn}>
              <div className={styles.priceCtn}>
                <span className={styles.price}>₹48999</span>
                <span className={styles.mrp}>₹68999</span>
              </div>
              <div className={styles.discountCtn}>
                <div className={styles.indicator}></div>
                <div className={styles.discount}>29% off</div>
              </div>
            </div>
            <div className={styles.courseSummary}>
              <span className={styles.heading}>Course Includes:</span>
              <div className={styles.keypointFlex}>
                <div className={styles.point}>
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
                    <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                    <path d="M2 6h4" />
                    <path d="M2 10h4" />
                    <path d="M2 14h4" />
                    <path d="M2 18h4" />
                    <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                  </svg>
                  <span className={styles.description}>
                    Postural & Movement Assessment
                  </span>
                </div>
                <div className={styles.point}>
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
                    <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
                    <path d="m2.5 21.5 1.4-1.4" />
                    <path d="m20.1 3.9 1.4-1.4" />
                    <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
                    <path d="m9.6 14.4 4.8-4.8" />
                  </svg>
                  <span className={styles.description}>
                    Corrective Exercise Programming
                  </span>
                </div>
                <div className={styles.point}>
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
                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                  </svg>
                  <span className={styles.description}>
                    200+ Exercise Library
                  </span>
                </div>
                <div className={styles.point}>
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
                    <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                    <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                    <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span className={styles.description}>
                    Globally Recognized Credential
                  </span>
                </div>
              </div>
            </div>
            <Link
              className={clsx(styles.buyNowCta, isLoading && styles.disabled)}
              href="/checkout?p_id=c2ffbad8-bc93-45d0-974f-b0009d439426"
              onClick={(e) => {
                if (isLoading) {
                  e.preventDefault();
                  return;
                }
                setIsLoading(true);
              }}
            >
              <span className={styles.label}>Buy Course Now</span>
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
              )}
            </Link>
          </div>
        </section>
        <section className={styles.details}>
          <h2>Description</h2>
          <p>
            The BioMechanics Method Corrective Exercise Specialist (TBMM-CES)
            course is the industry’s top-rated CES credential with specialists
            in over 80 countries. It consists of five distinct but interrelated
            educational modules that teach fitness professionals how to assess
            clients for musculoskeletal imbalances that can cause muscle
            dysfunction, joint discomfort and movement limitations and explains
            how to use corrective exercise to remedy those problems simply and
            effectively. Upon successful completion of this course, you will
            receive your TBMM-CES credential and be recognized worldwide as a
            Specialist in The BioMechanics Method ® . To earn your TBMM-CES
            credential, you will complete a comprehensive online course that
            consists of the following five educational components:
          </p>
          <ul className={styles.list}>
            <li>The Fundamentals of Structural Assessment</li>
            <li>Understanding Muscles and Movement</li>
            <li>The Fundamentals of Corrective Exercise</li>
            <li>The Complete Corrective Exercise Library</li>
            <li>Corrective Exercise Program Design</li>
          </ul>
          <div className={styles.accordionsCtn}>
            <div
              className={clsx(
                styles.accordion,
                openIndex === 0 ? styles.active : "",
              )}
            >
              <button
                className={styles.headerCtn}
                onClick={() => {
                  toggleAccordion(0);
                }}
              >
                <span className={styles.titleText}>
                  The Fundamentals of Structural Assessment (Module 1)
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={clsx(styles.icon, styles.iconExpand)}
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={clsx(styles.icon, styles.iconContract)}
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <div className={styles.contentCtn}>
                <div className={styles.contentWrapper}>
                  <span className={styles.mImgWrapper}>
                    <Image
                      src={"/modules/m1.jpg"}
                      className={styles.moduleThumbnail}
                      width={500}
                      height={300}
                      alt="module-thumbnail"
                    />
                  </span>
                  <p className={styles.contentText}>
                    This learning module teaches you a step-by-step process for
                    conducting musculoskeletal assessments to help you identify
                    common musculoskeletal imbalances that can cause muscle
                    dysfunction, joint discomfort and movement limitations. You
                    will learn verbal, visual, and hands-on techniques for
                    assessing the feet and ankles, knees, lumbo-pelvic hip
                    girdle, thoracic spine and shoulder girdle, and the neck and
                    head. You will also learn how musculoskeletal imbalances in
                    one area of the body can cause problems in other areas.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                styles.accordion,
                openIndex === 1 ? styles.active : "",
              )}
            >
              <button
                className={styles.headerCtn}
                onClick={() => {
                  toggleAccordion(1);
                }}
              >
                <span className={styles.titleText}>
                  Understanding Muscles and Movement (Module 2)
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={clsx(styles.icon, styles.iconExpand)}
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={clsx(styles.icon, styles.iconContract)}
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <div className={styles.contentCtn}>
                <div className={styles.contentWrapper}>
                  <span className={styles.mImgWrapper}>
                    <Image
                      src={"/modules/m2.jpg"}
                      className={styles.moduleThumbnail}
                      width={500}
                      height={300}
                      alt="module-thumbnail"
                    />
                  </span>
                  <p className={styles.contentText}>
                    This learning module explains in easy-to-understand terms
                    how the whole body moves together as an integrated series of
                    muscles, tendons, bones, ligaments, and fascia; information
                    that is essential for understanding the root causes of
                    musculoskeletal imbalances. It will teach you about major
                    muscle groups in detail, as well as specific muscle origins,
                    insertions, and functions. You will also discover the unique
                    approach of The BioMechanics Method ® in regard to
                    understanding how gravity and ground reaction forces change
                    the way the body moves — knowledge that is imperative for
                    designing effective corrective exercise programs.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                styles.accordion,
                openIndex === 2 ? styles.active : "",
              )}
            >
              <button
                className={styles.headerCtn}
                onClick={() => {
                  toggleAccordion(2);
                }}
              >
                <span className={styles.titleText}>
                  The Fundamentals of Corrective Exercise (Module 3)
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={clsx(styles.icon, styles.iconExpand)}
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={clsx(styles.icon, styles.iconContract)}
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <div className={styles.contentCtn}>
                <div className={styles.contentWrapper}>
                  <span className={styles.mImgWrapper}>
                    <Image
                      src={"/modules/m3.jpg"}
                      className={styles.moduleThumbnail}
                      width={500}
                      height={300}
                      alt="module-thumbnail"
                    />
                  </span>
                  <p className={styles.contentText}>
                    This learning module builds upon the knowledge and skills
                    learned in Modules 1 and 2, and introduces you to the most
                    effective types of exercises for eliminating lower back,
                    hip, shoulder, knee, neck, foot, and ankle dysfunction
                    caused by common musculoskeletal imbalances. You will learn
                    about self-myofascial release techniques that will enable
                    you to alleviate restrictions in muscles and fascia,
                    stretching exercises to help increase a client&#39;s
                    mobility and range of movement, and strengthening exercises
                    to help people begin to move correctly and without
                    limitations. You will also learn valuable strategies for
                    regressing exercises when necessary, and then progressing
                    exercises as your client&#39;s abilities improve. Specific
                    contraindications for each exercise type are also included
                    to ensure safety and effectiveness.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                styles.accordion,
                openIndex === 3 ? styles.active : "",
              )}
            >
              <button
                className={styles.headerCtn}
                onClick={() => {
                  toggleAccordion(3);
                }}
              >
                <span className={styles.titleText}>
                  The Complete Corrective Exercise Library (Module 4)
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={clsx(styles.icon, styles.iconExpand)}
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={clsx(styles.icon, styles.iconContract)}
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <div className={styles.contentCtn}>
                <div className={styles.contentWrapper}>
                  <span className={styles.mImgWrapper}>
                    <Image
                      src={"/modules/m4.jpg"}
                      className={styles.moduleThumbnail}
                      width={500}
                      height={300}
                      alt="module-thumbnail"
                    />
                  </span>
                  <p className={styles.contentText}>
                    This learning module contains explanations and
                    demonstrations of almost 200 of the most effective
                    corrective exercises for addressing musculoskeletal
                    imbalances (including progressions and regressions). The
                    fundamental principles of each corrective exercise category
                    are highlighted as well as the key teaching tips for every
                    exercise. This comprehensive collection of techniques serves
                    as an exercise guide to help you to create programs that are
                    most appropriate for your clients’ needs.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                styles.accordion,
                openIndex === 4 ? styles.active : "",
              )}
            >
              <button
                className={styles.headerCtn}
                onClick={() => {
                  toggleAccordion(4);
                }}
              >
                <span className={styles.titleText}>
                  Corrective Exercise Program Design (Module 5)
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={clsx(styles.icon, styles.iconExpand)}
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={clsx(styles.icon, styles.iconContract)}
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <div className={styles.contentCtn}>
                <div className={styles.contentWrapper}>
                  <span className={styles.mImgWrapper}>
                    <Image
                      src={"/modules/m5.jpg"}
                      className={styles.moduleThumbnail}
                      width={500}
                      height={300}
                      alt="module-thumbnail"
                    />
                  </span>
                  <p className={styles.contentText}>
                    This learning module guides you through the corrective
                    exercise program design process from start to finish,
                    teaching you how to develop and use effective communication
                    strategies when working with clients that have corrective
                    exercise needs. Real-life case studies are also included to
                    fully demonstrate the step-by-step nature of The
                    BioMechanics Method process with an actual client. This
                    learning module is the fifth and final module of TBMM-CES
                    course. In addition to tying together the skills obtained in
                    Modules 1-4, it focuses on developing client communication
                    skills, and allied networking and referral strategies, so
                    you can apply your skills within your scope of practice in
                    the real world.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h2>CEC Information</h2>
          <p>
            The BioMechanics Method Corrective Exercise Specialist (TBMM-CES)
            course is CEC- approved by the following:
          </p>
          <ul className={clsx(styles.list, styles.cec)}>
            <li>Reps India – 7 CPDs</li>
            <li>American Council on Exercise (ACE) – 8.0 CECs</li>
            <li>National Academy of Sports Medicine (NSAM) – 1.9 CEUs</li>
            <li>American College of Sports Medicine (ACSM) – 80.0 CECs</li>
            <li>
              Athletics and Fitness Association of America (AFAA) – 1.9 CEUs
            </li>
            <li>Board of Certification (BOC) – 32 Cat A CEUs</li>
            <li>National Exercise Trainers Association (NETA) – 80.0 CECs</li>
            <li>International Sports Sciences Association (ISSA) – 20 CEUs</li>
            <li>CIMSPA – 10 CPDs</li>
            <li>
              National Strength and Conditioning Association (NSCA) – 2.0 CEUs
              (Cat. C)
            </li>
            <li>Virginia Board of Physical Therapy – 32 Type 1</li>
            <li>REPs UAE – 16 CPDs</li>
            <li>REPs New Zealand – 20 CPDs</li>
            <li>
              AUSactive (formerly Fitness Australia) – 37 CECs (total for all 5
              TBMM-CES course modules)
            </li>
            <li>Canadian Society for Exercise Physiology (CSEP) – 15 CPDs</li>
            <li>National Pilates Certification Program (NPCP) – 80 CECs</li>
          </ul>
          <p>
            *The course is also eligible for continuing education credits from
            NESTA, NFPT, WITS, YMCA, and many other certifying organizations
            upon petition.
          </p>
          <h2>
            Benefits of completing The BioMechanics Method Corrective Exercise
            Specialist (TBMM-CES) course
          </h2>
          <ul className={clsx(styles.list, styles.benefits)}>
            <li>
              The BioMechanics Method Corrective Exercise Specialist (TBMM-CES)
              course is the highest-rated corrective exercise specialist
              credential in the fitness industry with Specialists in more than
              80 countries
            </li>
            <li>A certificate recognizing your TBMM-CES Status</li>
            <li>
              Inclusion on The BioMechanics Method Online Specialist Referral
              Register
            </li>
            <li>
              Automatically eligible for TBMM Advanced Corrective Exercise
              Specialist program (Ad-CES)
            </li>
            <li>
              Earn valuable continuing education credit with major health and
              fitness certifying organizations
            </li>
            <li>
              Eligible to apply for Corrective Exercise Specialist of the Year ®
               Award
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}

export default page
