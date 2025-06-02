import React, { createContext, useContext, useReducer, useEffect } from "react"
import type { User, Cart, CartItem, Product } from "@/types"

interface AppState {
  user: User | null
  cart: Cart
  products: Product[]
  loading: boolean
  searchQuery: string
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_CART_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "CLEAR_CART" }

const initialState: AppState = {
  user: null,
  cart: { items: [], total: 0 },
  products: [],
  loading: false,
  searchQuery: "",
}

function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload }
    case "ADD_TO_CART":
      const existingItem = state.cart.items.find((item) => item.product.id === action.payload.id)
      let newItems: CartItem[]

      if (existingItem) {
        newItems = state.cart.items.map((item) =>
          item.product.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        newItems = [...state.cart.items, { product: action.payload, quantity: 1 }]
      }

      return {
        ...state,
        cart: {
          items: newItems,
          total: calculateCartTotal(newItems),
        },
      }
    case "REMOVE_FROM_CART":
      const filteredItems = state.cart.items.filter((item) => item.product.id !== action.payload)
      return {
        ...state,
        cart: {
          items: filteredItems,
          total: calculateCartTotal(filteredItems),
        },
      }
    case "UPDATE_CART_QUANTITY":
      const updatedItems = state.cart.items
        .map((item) =>
          item.product.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item,
        )
        .filter((item) => item.quantity > 0)

      return {
        ...state,
        cart: {
          items: updatedItems,
          total: calculateCartTotal(updatedItems),
        },
      }
    case "CLEAR_CART":
      return {
        ...state,
        cart: { items: [], total: 0 },
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("scoder-user")
    if (savedUser) {
      dispatch({ type: "SET_USER", payload: JSON.parse(savedUser) })
    }
  }, [])

  // Save user to localStorage when user changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("scoder-user", JSON.stringify(state.user))
    } else {
      localStorage.removeItem("scoder-user")
    }
  }, [state.user])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}