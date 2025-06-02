import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormData } from "@/lib/schemas"
import { useApp } from "@/contexts/app-context"
import { useState } from "react"

interface RegisterFormProps {
  onToggleMode: () => void
  onSuccess?: () => void
}

export function RegisterForm({ onToggleMode, onSuccess }: RegisterFormProps) {
  const { dispatch } = useApp()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
      }

      dispatch({ type: "SET_USER", payload: user })
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: '#111827',
          marginBottom: '0.5rem'
        }}>
          Create Account
        </h2>
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#6b7280' 
        }}>
          Join us and start shopping today
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label 
            htmlFor="name" 
            style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#374151',
              marginBottom: '0.5rem'
            }}
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              backgroundColor: '#ffffff',
              transition: 'border-color 0.2s'
            }}
            placeholder="Enter your full name"
            onFocus={(e) => {
              if (!errors.name) {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }
            }}
            onBlur={(e) => {
              if (!errors.name) {
                e.target.style.borderColor = '#d1d5db'
                e.target.style.boxShadow = 'none'
              }
            }}
          />
          {errors.name && (
            <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label 
            htmlFor="email" 
            style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#374151',
              marginBottom: '0.5rem'
            }}
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              backgroundColor: '#ffffff',
              transition: 'border-color 0.2s'
            }}
            placeholder="Enter your email"
            onFocus={(e) => {
              if (!errors.email) {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }
            }}
            onBlur={(e) => {
              if (!errors.email) {
                e.target.style.borderColor = '#d1d5db'
                e.target.style.boxShadow = 'none'
              }
            }}
          />
          {errors.email && (
            <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label 
            htmlFor="password" 
            style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#374151',
              marginBottom: '0.5rem'
            }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.password ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              backgroundColor: '#ffffff',
              transition: 'border-color 0.2s'
            }}
            placeholder="Create a password"
            onFocus={(e) => {
              if (!errors.password) {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }
            }}
            onBlur={(e) => {
              if (!errors.password) {
                e.target.style.borderColor = '#d1d5db'
                e.target.style.boxShadow = 'none'
              }
            }}
          />
          {errors.password && (
            <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label 
            htmlFor="confirmPassword" 
            style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#374151',
              marginBottom: '0.5rem'
            }}
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.confirmPassword ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              backgroundColor: '#ffffff',
              transition: 'border-color 0.2s'
            }}
            placeholder="Confirm your password"
            onFocus={(e) => {
              if (!errors.confirmPassword) {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }
            }}
            onBlur={(e) => {
              if (!errors.confirmPassword) {
                e.target.style.borderColor = '#d1d5db'
                e.target.style.boxShadow = 'none'
              }
            }}
          />
          {errors.confirmPassword && (
            <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#2563eb'
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#3b82f6'
            }
          }}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={onToggleMode}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#3b82f6',
              fontSize: '0.875rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#2563eb'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#3b82f6'
            }}
          >
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </div>
  )
}