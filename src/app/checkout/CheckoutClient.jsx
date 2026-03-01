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

const CheckoutClient = ({ product }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [infoActive, setInfoActive] = useState(false);
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
    mode: "onBlur",
  });

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

  useEffect(() => {
    const checkStock = async () => {
      const stockCheckRes = await fetch("/api/supabase/stockCheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
        }),
      });

      const stockCheck = await stockCheckRes.json();

      if (!stockCheck.success) {
        console.log("INSUFFICIENT STOCK");
        await showToast("Item just went Out of Stock", "error");
        router.push("/products/tbmm-ces");
      }
    };

    checkStock();
  }, []);

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
    }
  };

  const handlePaymentClick = handleSubmit(handlePayment);

  return (
    <div className={styles.layoutFrame}>
      <div className={styles.shippingCtn}>
        <div className={styles.headerCtn}>
          <BackBtn />
          <div className={styles.stepLabelCtn}>
            <div className={styles.iconCtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.stepIcon}
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <span className={styles.stepTitle}>Shipping</span>
          </div>
        </div>
        <form className={styles.contentForm}>
          {/* Full Name */}
          <div className={clsx(styles.gridRowSingle, styles.row1)}>
            <label htmlFor="fullName" className={styles.label}>
              Full name *
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="Enter your full name"
              className={styles.input}
            />
            {errors.fullName && (
              <InputError message={errors.fullName.message} />
            )}
          </div>

          {/* Email & Phone */}
          <div className={clsx(styles.gridRowDual, styles.row2)}>
            <div className={clsx(styles.subColumn, styles.email)}>
              <label htmlFor="email" className={styles.label}>
                Email address *
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email address"
                className={clsx(
                  styles.input,
                  errors.email && styles.inputError,
                )}
              />
              {errors.email && <InputError message={errors.email.message} />}
            </div>

            <div className={clsx(styles.subColumn, styles.phoneNumber)}>
              <label htmlFor="phone" className={styles.label}>
                Phone number *
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Enter your phone number"
                className={clsx(
                  styles.input,
                  errors.phone && styles.inputError,
                )}
              />

              {errors.phone && <InputError message={errors.phone.message} />}
            </div>
          </div>

          {/* Address */}
          <div className={clsx(styles.gridRowSingle, styles.row3)}>
            <label htmlFor="address" className={styles.label}>
              Address (House no, Street, Area) *
            </label>
            <input
              {...register("address")}
              type="text"
              placeholder="Enter your address"
              className={styles.input}
            />
            {errors.address && <InputError message={errors.address.message} />}
          </div>

          {/* City & State */}
          <div className={clsx(styles.gridRowTriple, styles.row4)}>
            <div className={clsx(styles.subColumn, styles.city)}>
              <label htmlFor="city" className={styles.label}>
                City *
              </label>
              <input
                {...register("city")}
                type="text"
                placeholder="Enter your city"
                className={styles.input}
              />
              {errors.city && <InputError message={errors.city.message} />}
            </div>

            <div className={clsx(styles.subColumn, styles.stateDropdown)}>
              <label htmlFor="state" className={styles.label}>
                State *
              </label>

              <div className={styles.selectWrapper}>
                <select
                  {...register("state")}
                  defaultValue=""
                  required
                  className={styles.input}
                >
                  <option value="" disabled hidden>
                    Select State
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
            </div>

            <div className={clsx(styles.subColumn, styles.pincode)}>
              <label htmlFor="pincode" className={styles.label}>
                Pincode *
              </label>
              <input
                {...register("pincode")}
                type="number"
                placeholder="Enter your pincode"
                className={styles.input}
              />
              {errors.pincode && (
                <InputError message={errors.pincode.message} />
              )}
            </div>
          </div>
        </form>
      </div>
      <div className={styles.cartCtn}>
        <span className={styles.cartTitle}>Your Cart</span>
        <div className={styles.contentCTACtn}>
          <div className={styles.contentCtn}>
            <div className={styles.cartItemCtn}>
              <div className={styles.itemDetailsCtn}>
                <div className={styles.imageCtn}>
                  <Image
                    className={styles.productImage}
                    src="/courseCover.png"
                    alt="Product"
                    width={155}
                    height={103}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>

                <div className={styles.textCtn}>
                  <span className={styles.productTitle}>
                    The BioMechanics Method Corrective Exercise Specialist
                    Course
                  </span>
                  <span className={styles.productVariantText}>
                    | TBMM-CES-Course
                  </span>
                </div>
              </div>

              <div className={styles.priceQuantityCtn}>
                <div className={styles.priceCtn}>
                  <span className={styles.discountedPrice}>
                    ₹{product.price}
                  </span>
                  {product.current_stock > 0 ? (
                    <span className={styles.originalPrice}>₹{product.mrp}</span>
                  ) : (
                    ""
                  )}
                </div>

                {product.current_stock > 0 ? (
                  ""
                ) : (
                  <div className={styles.outOfStockCtn}>
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
                    <span className={styles.text}>Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.billingCtn}>
              <div className={styles.pricingBreakdownCtn}>
                <div className={clsx(styles.pricingRow, styles.netPricingCtn)}>
                  <span className={styles.chargeLabel}>{currentQty} Items</span>
                  <span className={styles.priceValue}>
                    ₹{totals.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className={clsx(styles.pricingRow, styles.taxCtn)}>
                  <span className={styles.chargeLabel}>Tax</span>
                  <span className={styles.priceValue}>Inclusive</span>
                </div>

                {/* <div className={clsx(styles.pricingRow, styles.discountCtn)}>
                  <span className={styles.chargeLabel}>
                    Discount{" "}
                    {appliedPromoCode && `(${appliedPromoCode.discount}%)`}
                  </span>
                  <span
                    className={clsx(styles.priceValue, styles.discountValue)}
                  >
                    - ₹{totals.discount?.toFixed(2)}
                  </span>
                </div> */}
              </div>
              <div className={styles.totalCtn}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalAmount}>
                  ₹{totals.totalRupees.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <StepCTA
            currentStep={1}
            btnStatus="active"
            onClick={handlePaymentClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutClient;
