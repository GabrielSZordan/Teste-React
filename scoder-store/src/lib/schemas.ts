import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const checkoutSchema = z
  .object({
    paymentMethod: z.enum(["credit", "debit", "pix", "boleto"], {
      required_error: "Please select a payment method",
    }),
    cardNumber: z.string().optional(),
    cardName: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
    pixKey: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "credit" || data.paymentMethod === "debit") {
        return data.cardNumber && data.cardName && data.cardExpiry && data.cardCvv
      }
      if (data.paymentMethod === "pix") {
        return data.pixKey
      }
      return true
    },
    {
      message: "Please fill in all required payment details",
    },
  )

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type CheckoutFormData = z.infer<typeof checkoutSchema>