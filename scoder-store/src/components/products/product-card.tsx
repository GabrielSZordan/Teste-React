import { Star, ShoppingCart } from 'lucide-react'
import type { Product } from "@/types"
import { useApp } from "@/contexts/app-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useApp()

  const handleAddToCart = () => {
    if (!state.user) {
      alert("Please login to add items to cart")
      return
    }

    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  return (
    <div className="card" style={{ 
      padding: '1rem', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%' 
    }}>
      <div style={{ 
        aspectRatio: '1', 
        marginBottom: '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain', 
            borderRadius: '0.375rem' 
          }}
        />
      </div>

      <span style={{
        backgroundColor: '#f3f4f6',
        color: '#374151',
        padding: '0.25rem 0.5rem',
        borderRadius: '1rem',
        fontSize: '0.75rem',
        width: 'fit-content',
        marginBottom: '0.5rem'
      }}>
        {product.category}
      </span>

      <h3 style={{ 
        fontSize: '1.125rem', 
        fontWeight: '600', 
        marginBottom: '0.5rem',
        lineHeight: '1.4'
      }}>
        {product.title}
      </h3>

      <p style={{ 
        fontSize: '0.875rem', 
        color: '#6b7280', 
        marginBottom: '1rem',
        flex: 1,
        lineHeight: '1.4'
      }}>
        {product.description}
      </p>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        marginBottom: '0.5rem' 
      }}>
        <Star style={{ width: '1rem', height: '1rem', fill: '#fbbf24', color: '#fbbf24' }} />
        <span style={{ fontSize: '0.875rem' }}>{product.rating.rate}</span>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          ({product.rating.count} reviews)
        </span>
      </div>

      <div style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        color: '#059669', 
        marginBottom: '1rem' 
      }}>
        ${product.price.toFixed(2)}
      </div>

      <button className="btn btn-primary" onClick={handleAddToCart} style={{ width: '100%' }}>
        <ShoppingCart style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
        Add to Cart
      </button>
    </div>
  )
}