import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas"
import { useApp } from "@/contexts/app-context"
import { useState } from "react"
import { ArrowLeft, CreditCard, Smartphone, FileText } from 'lucide-react'

interface CheckoutFormProps {
  onBack: () => void
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { state, dispatch } = useApp()
  const [isLoading, setIsLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "credit" // Set a default payment method
    }
  })

  const paymentMethod = watch("paymentMethod")

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true)

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and show success
      dispatch({ type: "CLEAR_CART" })
      setOrderComplete(true)
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (orderComplete) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            width: '4rem', 
            height: '4rem', 
            backgroundColor: '#d1fae5', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1rem auto' 
          }}>
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669', marginBottom: '0.5rem' }}>
            Order Complete!
          </h2>
          <p style={{ color: '#6b7280' }}>
            Thank you for your purchase. Your order has been processed successfully.
          </p>
        </div>
        <button className="btn btn-primary" onClick={onBack} style={{ width: '100%' }}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button 
          className="btn btn-outline" 
          style={{ padding: '0.5rem' }}
          onClick={onBack}
        >
          <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
        </button>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginLeft: '0.5rem' }}>Checkout</h2>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Order Summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {state.cart.items.map((item) => (
            <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span>
                {item.product.title} x{item.quantity}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ 
            borderTop: '1px solid #e5e7eb', 
            paddingTop: '0.5rem', 
            display: 'flex', 
            justifyContent: 'space-between',
            fontWeight: '600'
          }}>
            <span>Total:</span>
            <span style={{ color: '#059669' }}>${state.cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ fontSize: '1rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
            Payment Method
          </label>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                value="credit" 
                {...register("paymentMethod")} 
                style={{ width: '1rem', height: '1rem' }}
              />
              <CreditCard style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
              Credit Card
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                value="debit" 
                {...register("paymentMethod")} 
                style={{ width: '1rem', height: '1rem' }}
              />
              <CreditCard style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
              Debit Card
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                value="pix" 
                {...register("paymentMethod")} 
                style={{ width: '1rem', height: '1rem' }}
              />
              <Smartphone style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
              PIX
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                value="boleto" 
                {...register("paymentMethod")} 
                style={{ width: '1rem', height: '1rem' }}
              />
              <FileText style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
              Boleto
            </label>
          </div>
          
          {errors.paymentMethod && (
            <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        {(paymentMethod === "credit" || paymentMethod === "debit") && (
          <div className="card" style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Card Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  {...register("cardNumber")}
                  className={errors.cardNumber ? "border-red-500" : ""}
                />
                {errors.cardNumber && (
                  <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  {...register("cardName")}
                  className={errors.cardName ? "border-red-500" : ""}
                />
                {errors.cardName && (
                  <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                    {errors.cardName.message}
                  </p>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <Label htmlFor="cardExpiry">Expiry Date</Label>
                  <Input
                    id="cardExpiry"
                    placeholder="MM/YY"
                    {...register("cardExpiry")}
                    className={errors.cardExpiry ? "border-red-500" : ""}
                  />
                  {errors.cardExpiry && (
                    <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                      {errors.cardExpiry.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cardCvv">CVV</Label>
                  <Input
                    id="cardCvv"
                    placeholder="123"
                    {...register("cardCvv")}
                    className={errors.cardCvv ? "border-red-500" : ""}
                  />
                  {errors.cardCvv && (
                    <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                      {errors.cardCvv.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "pix" && (
          <div className="card" style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>PIX Payment</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
              Enter your PIX key to complete the payment
            </p>
            
            <div>
              <Label htmlFor="pixKey">PIX Key</Label>
              <Input
                id="pixKey"
                placeholder="your-pix-key@email.com"
                {...register("pixKey")}
                className={errors.pixKey ? "border-red-500" : ""}
              />
              {errors.pixKey && (
                <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                  {errors.pixKey.message}
                </p>
              )}
            </div>
          </div>
        )}

        {paymentMethod === "boleto" && (
          <div className="card" style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Boleto Payment</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              A boleto will be generated for you to pay at any bank or lottery house
            </p>
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%' }}
          disabled={isLoading}
        >
          {isLoading ? "Processing Payment..." : `Pay $${state.cart.total.toFixed(2)}`}
        </button>
      </form>
    </div>
  )
}