"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StepCTA from "@/components/StepCTA";
import clsx from "clsx";
import BackBtn from "@/components/BackBtn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema } from "@/schemas/shipping.schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";
import InputError from "@/components/InputError";
import Image from "next/image";

const CheckoutClient = ({ product}) => {
  
  const router = useRouter();
  const { showToast } = useToast();
  const [infoActive, setInfoActive] = useState(false);
  const [isDisabled ,setIsDisabled] = useState(false);

  useEffect(() => {
    if (!(product?.current_stock > product?.reserved_stock)) {
      showToast("Item Out of Stock", "error");
      router.push("/products/tbmm-ces");
    }
  }, []);
  // console.log("info", infoActive)
  // console.log("product", product)
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(shippingSchema),
    criteriaMode: "firstError",
    mode: "onBlur",
  });

  const firstErrorField = Object.keys(errors)?.[0];
  console.log(firstErrorField)

  const consentChecked = watch("consent");
  
  const currentQty = 1;

  const [totals, setTotals] = useState({
    subtotal: 0, //price*qty
    discount: 0,
    shipping: 0,
    totalPaise: 0,
    totalRupees: 0,
  });
  // console.log("PAISE", totals.totalPaise)
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);

  useEffect(() => {
    const calculateTotals = () => {
      const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

      const subtotal = round2(product.price * currentQty);

      const discount = appliedPromoCode
        ? round2(subtotal * (appliedPromoCode.discount / 100))
        : 0;

      const finalPrice = round2(subtotal - discount);

      // const tax = round2(taxable * 0.18); // 18% GST
      const shipping = 0;

      const totalRupees = round2(finalPrice + shipping);
      const totalPaise = Math.round(totalRupees * 100);

      setTotals({
        subtotal,
        discount,
        shipping,
        totalPaise,
        totalRupees,
      });
    };

    calculateTotals();
  }, [currentQty]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setIsDisabled(true);
      // 1️⃣ Get validated shipping details from form
      const formData = getValues();
      // console.log("Shipping data:", formData);

      // 2️⃣ Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded || typeof window.Razorpay === "undefined") {
        alert("Razorpay SDK failed to load.");
        return;
      }
      // console.log("appliedPromoCode: ", appliedPromoCode?.code)
      // 3️⃣ Create order via API (Supabase RPC + Razorpay order)
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              product_id: String(product.id), // UUID as string
              quantity: currentQty,
            },
          ],
          shipping_info: {
            user_name: formData.fullName,
            user_email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
        }),
      });

      const { order, razorpayOrder, error } = await res.json();
      if (error) {
        // console.log("Order creation failed:", error);
        showToast("Stock Error", "error");
        // router.back();
        return;
      }

      // console.log("Supabase order:", order);
      // console.log("Razorpay order:", razorpayOrder);

      // 4️⃣ Open Razorpay modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount, // paise
        currency: razorpayOrder.currency,
        name: "Physiolution",
        order_id: razorpayOrder.id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (paymentResponse) => {
          // console.log(paymentResponse)
          try {
            await fetch("/api/confirmPayment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: order[0].order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                // razorpay_signature: paymentResponse.razorpay_signature,
                status: "paid",
              }),
            });

            router.push(`/payment/?oID=${razorpayOrder.id}`);
          } catch (verifyError) {
            // console.error("Payment verification failed:", verifyError);
            showToast("Payment verification failed", "error");
          }
        },
        theme: { color: "#000000" },
        modal: {
          ondismiss: async function () {
            // console.log("Razorpay modal closed without payment");
            try {
              await fetch("/api/confirmPayment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  order_id: order[0].order_id,
                  status: "cancelled",
                }),
              });
              setIsDisabled(false);
            } catch (err) {
              // console.error("Error cancelling order:", err);
            }
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      // console.error("Payment error:", err);
      alert(err.message || "Something went wrong");
      setIsDisabled(false);
    }
  };

  const handlePaymentClick = handleSubmit(handlePayment);

  return (
    <div className={styles.layoutFrame}>
      <div className={styles.leftCtn}>
        
        <div className={styles.cartModal}>
          <div className={styles.cartHeader}>
            <span className={styles.cartTitle}>Physiolution.co</span>
            <div className={styles.itemDetails}>
              <span className={styles.title}>{product.web_content.title}</span>
              <span className={styles.subTitle}>
                {product.web_content.subTitle}
              </span>
            </div>
          </div>
          <div className={styles.itemCardErrorWrapper}>
            <div
              className={clsx(
                styles.itemCard,
                firstErrorField === "consent" && styles.consentError,
              )}
            >
              <div className={styles.topCtn}>
                <div className={styles.header}>
                  <div className={styles.itemDetails}>
                    <div className={styles.nameBadge}>
                      <span className={styles.title}>
                        {product.web_content.title}
                      </span>
                      <div className={styles.badge}>
                        <span className={styles.label}>Most Popular</span>
                      </div>
                    </div>
                    <span className={styles.subTitle}>
                      | {product.web_content.barText}
                    </span>
                  </div>
                  <div className={styles.itemPricingCtn}>
                    <span className={styles.discount}>
                      -
                      {(
                        ((product.mrp - product.price) / product.mrp) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                    <span className={styles.price}>₹{product.price}</span>
                  </div>
                </div>
                <span className={styles.description}>
                  {product.web_content.description}
                </span>
              </div>
              <div className={styles.bottomCtn}>
                <input
                  type="checkbox"
                  {...register("consent", {
                    required: "You must accept the consent before continuing",
                  })}
                  className={styles.checkbox}
                />
                <span className={styles.text}>
                  {product.web_content.consent}
                </span>
              </div>
            </div>
            {firstErrorField === "consent" && (
              <span className={styles.errorCtn}>
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
                <span className={styles.message}>
                  {errors.consent?.message}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.rightCtn}>
        <div className={styles.paymentModal}>
          <form className={styles.shippingForm}>
            {/* Personal Details */}
            <div className={styles.formRow}>
              <span className={styles.label}>Personal Details</span>
              <div className={styles.combinedInputs}>
                <div className={styles.inputErrorWrapper}>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="Full Name"
                    className={clsx(styles.input, styles.input1)}
                  />
                  {firstErrorField === "fullName" && (
                    <InputError msg={errors.fullName?.message} />
                  )}
                </div>
                <div className={styles.inputErrorWrapper}>
                  <input
                    type="text"
                    {...register("address")}
                    placeholder="Housing Address"
                    className={clsx(styles.input, styles.input2)}
                  />
                  {firstErrorField === "address" && (
                    <InputError msg={errors.address?.message} />
                  )}
                </div>
              </div>
            </div>
            {/* Contact Details */}
            <div className={styles.formRow}>
              <span className={styles.label}>Contact Details</span>
              <div className={styles.combinedInputs}>
                <div className={styles.inputErrorWrapper}>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Phone number"
                    className={clsx(styles.input, styles.input1)}
                  />
                  {firstErrorField === "phone" && (
                    <InputError msg={errors.phone?.message} />
                  )}
                </div>
                <div className={styles.inputErrorWrapper}>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email address"
                    className={clsx(styles.input, styles.input2)}
                  />
                  {firstErrorField === "email" && (
                    <InputError msg={errors.email?.message} />
                  )}
                </div>
              </div>
            </div>
            {/* Billing Details */}
            <div className={styles.formRow}>
              <span className={styles.label}>Billing Details</span>
              <div className={styles.billingInputs}>
                <div className={styles.inputErrorWrapper}>
                  <input
                    {...register("city")}
                    type="text"
                    placeholder="City"
                    className={clsx(styles.input, styles.inputState)}
                  />
                  {firstErrorField === "city" && (
                    <InputError msg={errors.city?.message} />
                  )}
                </div>
                <div className={styles.selectWrapper}>
                  <select
                    {...register("state")}
                    defaultValue=""
                    required
                    className={clsx(
                      styles.input,
                      firstErrorField === "state" && styles.error,
                    )}
                  >
                    <option value="" disabled hidden>
                      State
                    </option>

                    {/* States */}
                    <option value="AP">Andhra Pradesh</option>
                    <option value="AR">Arunachal Pradesh</option>
                    <option value="AS">Assam</option>
                    <option value="BR">Bihar</option>
                    <option value="CT">Chhattisgarh</option>
                    <option value="GA">Goa</option>
                    <option value="GJ">Gujarat</option>
                    <option value="HR">Haryana</option>
                    <option value="HP">Himachal Pradesh</option>
                    <option value="JH">Jharkhand</option>
                    <option value="KA">Karnataka</option>
                    <option value="KL">Kerala</option>
                    <option value="MP">Madhya Pradesh</option>
                    <option value="MH">Maharashtra</option>
                    <option value="MN">Manipur</option>
                    <option value="ML">Meghalaya</option>
                    <option value="MZ">Mizoram</option>
                    <option value="NL">Nagaland</option>
                    <option value="OR">Odisha</option>
                    <option value="PB">Punjab</option>
                    <option value="RJ">Rajasthan</option>
                    <option value="SK">Sikkim</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="TG">Telangana</option>
                    <option value="TR">Tripura</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="UK">Uttarakhand</option>
                    <option value="WB">West Bengal</option>

                    {/* Union Territories */}
                    <option value="AN">Andaman and Nicobar Islands</option>
                    <option value="CH">Chandigarh</option>
                    <option value="DN">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="DL">Delhi</option>
                    <option value="JK">Jammu and Kashmir</option>
                    <option value="LA">Ladakh</option>
                    <option value="LD">Lakshadweep</option>
                    <option value="PY">Puducherry</option>
                  </select>
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
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <div className={styles.inputErrorWrapper}>
                  <input
                    {...register("pincode")}
                    type="number"
                    placeholder="Pincode"
                    className={styles.input}
                  />
                  {firstErrorField === "pincode" && (
                    <InputError msg={errors.pincode?.message} />
                  )}
                </div>
              </div>
            </div>
          </form>
          <div className={styles.billingCtn}>
            <div className={styles.pricingBreakdownCtn}>
              <div className={clsx(styles.pricingRow, styles.netPricingCtn)}>
                <span className={styles.chargeLabel}>{currentQty} Items</span>
                <span className={clsx(styles.priceValue, styles.subtotalValue)}>
                  ₹{totals.subtotal.toFixed(2)}
                </span>
              </div>

              <div className={clsx(styles.pricingRow, styles.taxCtn)}>
                <span className={styles.chargeLabel}>Tax</span>
                <span className={styles.priceValue}>Inclusive</span>
              </div>
              <div className={clsx(styles.pricingRow, styles.discountCtn)}>
                <span className={styles.chargeLabel}>Discount</span>
                <span className={styles.discountValue}>
                  - ₹{product.mrp - product.price}
                </span>
              </div>
            </div>
            <div className={styles.totalCtn}>
              <span className={styles.totalLabel}>Total due:</span>
              <span className={styles.totalAmount}>
                ₹{totals.totalRupees.toFixed(2)}
              </span>
            </div>
          </div>

          {/* PAY CTA */}
          <button
            className={clsx(styles.paymentCTA, isDisabled && styles.disabled)}
            disabled={isDisabled}
            onClick={handlePaymentClick}
          >
            <Image
              src="/razorpay_logo.png"
              width={20}
              height={24}
              className={styles.icon}
              alt="razorpay logo"
            ></Image>
            <span className={styles.ctaLabel}>Pay with Razorpay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutClient;
