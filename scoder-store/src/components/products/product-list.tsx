import { useEffect } from "react"
import { ProductCard } from "./product-card"
import { useApp } from "@/contexts/app-context"
import type { Product } from "@/types"

export function ProductList() {
  const { state, dispatch } = useApp()

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "SET_LOADING", payload: true })
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        const products: Product[] = await response.json()
        dispatch({ type: "SET_PRODUCTS", payload: products })
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    if (state.products.length === 0) {
      fetchProducts()
    }
  }, [state.products.length, dispatch])

  const filteredProducts = state.products.filter(
    (product) =>
      product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(state.searchQuery.toLowerCase()),
  )

  if (state.loading) {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i} 
            style={{ 
              height: '24rem', 
              backgroundColor: '#e5e7eb', 
              borderRadius: '0.5rem',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }} 
          />
        ))}
      </div>
    )
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
      gap: '1.5rem' 
    }}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}