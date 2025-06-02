import { useState } from "react"
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react'
import { useApp } from "@/contexts/app-context"
import { Sidebar } from "@/components/ui/sidebar"
import { CheckoutForm } from "./checkout-form"

export function CartSidebar() {
  const { state, dispatch } = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_CART_QUANTITY", payload: { productId, quantity } })
  }

  const removeItem = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }

  const cartItemCount = state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <button 
        className="btn btn-outline"
        style={{ position: 'relative', padding: '0.5rem' }}
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart style={{ width: '1rem', height: '1rem' }} />
        {cartItemCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-0.5rem',
            right: '-0.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '50%',
            width: '1.25rem',
            height: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem'
          }}>
            {cartItemCount}
          </span>
        )}
      </button>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {showCheckout ? (
          <CheckoutForm onBack={() => setShowCheckout(false)} />
        ) : (
          <div style={{ paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Shopping Cart
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              {state.cart.items.length === 0 ? "Your cart is empty" : `${state.cart.items.length} item(s) in your cart`}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {state.cart.items.map((item) => (
                <div key={item.product.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.title}
                    style={{ 
                      width: '4rem', 
                      height: '4rem', 
                      objectFit: 'contain', 
                      borderRadius: '0.25rem' 
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                      {item.product.title}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#059669', fontWeight: '600' }}>
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.25rem', width: '2rem', height: '2rem' }}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus style={{ width: '0.75rem', height: '0.75rem' }} />
                    </button>

                    <span style={{ width: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
                      {item.quantity}
                    </span>

                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.25rem', width: '2rem', height: '2rem' }}
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus style={{ width: '0.75rem', height: '0.75rem' }} />
                    </button>

                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.25rem', width: '2rem', height: '2rem', color: '#ef4444' }}
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 style={{ width: '0.75rem', height: '0.75rem' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {state.cart.items.length > 0 && (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '1.125rem', 
                  fontWeight: '600' 
                }}>
                  <span>Total:</span>
                  <span style={{ color: '#059669' }}>${state.cart.total.toFixed(2)}</span>
                </div>

                <button 
                  className={`btn ${state.user ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%' }}
                  onClick={() => setShowCheckout(true)} 
                  disabled={!state.user}
                >
                  {!state.user ? "Login to Checkout" : "Proceed to Checkout"}
                </button>
              </div>
            )}
          </div>
        )}
      </Sidebar>
    </>
  )
}