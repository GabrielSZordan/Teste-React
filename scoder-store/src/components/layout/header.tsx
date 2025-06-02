import React, { useState } from "react"
import { Search, User, LogOut } from 'lucide-react' // Removed ShoppingCart import
import { useApp } from "@/contexts/app-context"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Modal } from "@/components/ui/modal"
import { CartSidebar } from "@/components/cart/cart-sidebar"

export function Header() {
  const { state, dispatch } = useApp()
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null })
    dispatch({ type: "CLEAR_CART" })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })
  }

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login")
  }

  const handleAuthSuccess = () => {
    setShowAuth(false)
  }

  return (
    <>
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50
      }}>
        <div className="container" style={{ padding: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: '1rem' 
          }}>
            {/* Logo */}
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#3b82f6',
              margin: 0 
            }}>
              Scoder Store
            </h1>

            {/* Search */}
            <div style={{ flex: 1, maxWidth: '28rem', position: 'relative' }}>
              <Search 
                style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#9ca3af',
                  width: '1rem',
                  height: '1rem'
                }} 
              />
              <input
                type="text"
                placeholder="Search products..."
                className="input"
                style={{ paddingLeft: '2.5rem' }}
                value={state.searchQuery}
                onChange={handleSearch}
              />
            </div>

            {/* User Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {state.user ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <User style={{ width: '1rem', height: '1rem' }} />
                    <span>Welcome, {state.user.name}!</span>
                  </div>
                  <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '0.5rem' }}>
                    <LogOut style={{ width: '1rem', height: '1rem' }} />
                  </button>
                </>
              ) : (
                <button className="btn btn-outline" onClick={() => setShowAuth(true)}>
                  Login / Register
                </button>
              )}
              <CartSidebar />
            </div>
          </div>
        </div>
      </header>

      <Modal isOpen={showAuth} onClose={() => setShowAuth(false)}>
        {authMode === "login" ? (
          <LoginForm onToggleMode={toggleAuthMode} onSuccess={handleAuthSuccess} />
        ) : (
          <RegisterForm onToggleMode={toggleAuthMode} onSuccess={handleAuthSuccess} />
        )}
      </Modal>
    </>
  )
}