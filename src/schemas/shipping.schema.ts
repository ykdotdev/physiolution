import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Must be at least 2 characters"),
  email: z
    .email("Enter a valid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  address: z
    .string()
    .min(5, "Must be at least 5 characters"),
  city: z
    .string()
    .min(2, "Enter a valid City"),
  state: z
    .string()
    .min(2, "State is required"),
  pincode: z
    .string()
    .length(6, "Enter a valid Pincode"), 
  consent: z.literal(true, {
    message: "You must accept the checkbox before continuing",
  }),
});
