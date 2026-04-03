"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
// import StepCTA from "../components/StepCTA";
import clsx from "clsx";
import AnimatedCTA from "@/components/AnimatedCTA";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import successAnimationData from "@/animations/payment_successful.json";
import failedAnimationData from "@/animations/payment_failed.json";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";

const PaymentClient = ({ orderID }) => {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderID) return;

    const checkPaymentStatus = async () => {
      try {
        const res = await fetch("/api/supabase/paymentStatus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderID }),
        });

        const data = await res.json();
        if (data?.status === "paid") {
          setStatus("success");
          setLoading(false);
        } else {
          setStatus("fail");
          setLoading(false);
        }
      } catch (err) {
        // console.error(err);
        setStatus("fail");
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [orderID]);

  return (
    <div className={styles.layoutFrame}>
      {loading ? (
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
      ) : status === "success" ? (
        <div className={styles.paymentModal}>
          <div className={styles.header}>
            <span className={styles.orgTitleText}>Physiolution.co</span>
            <span className={styles.paymentStatusText}>Payment Successful</span>
          </div>
          <span className={styles.animationCtn}>
            <Lottie
              animationData={successAnimationData}
              className={styles.animation}
              autoplay
              loop={false}
            />
          </span>
          <AnimatedCTA />
        </div>
      ) : (
        <div className={styles.paymentModal}>
          <div className={styles.header}>
            <span className={styles.orgTitleText}>Physiolution.co</span>
            <span className={styles.paymentStatusText}>
              Oops! Something went Wrong
            </span>
          </div>
          <span className={styles.animationCtn}>
            <Lottie
              animationData={failedAnimationData}
              className={styles.animation}
              autoplay
              loop={false}
            />
          </span>
          <button onClick={()=>{router.back()}} className={styles.ctaBtn}>
            <div className={styles.label}>Retry Payment</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentClient;
