import { AppProvider } from "@/contexts/app-context"
import { Header } from "@/components/layout/header"
import { ProductList } from "@/components/products/product-list"

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600">Discover our amazing collection of products from the best brands</p>
          </div>

          <ProductList />
        </main>
      </div>
    </AppProvider>
  )
}

export default App