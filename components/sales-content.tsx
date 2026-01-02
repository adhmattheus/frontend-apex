"use client"

import type { Product } from "@/app/actions"
import { ProductSalesCard } from "@/components/product/product-sales-card"
import { ShoppingCart } from "@/components/shopping-cart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CarIcon as CartIcon, Search } from "lucide-react"
import { useMemo, useState } from "react"

export type CartItem = {
  product: Product
  quantity: number
}

interface SalesContentProps {
  products: Product[]
}

export function SalesContent({ products }: SalesContentProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false)

  const activeProducts = useMemo(() => {
    return products.filter((p) => p.status === "active" && p.stock > 0)
  }, [products])

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return activeProducts
    return activeProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [activeProducts, searchQuery])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) {
          return prev
        }
        return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.min(quantity, item.product.stock) } : item,
      ),
    )
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }, [cart])

  const cartItemsCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  return (
    <div className="space-y-6">
      {/* Search and Cart */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="gap-2 relative w-full sm:w-auto">
              <CartIcon className="h-5 w-5" />
              Cart
              {cartItemsCount > 0 && (
                <Badge variant="secondary" className="ml-1 px-2">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <ShoppingCart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              cartTotal={cartTotal}
              onClose={() => setIsCartOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products available for sale</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.product.id === product.id)
            return (
              <ProductSalesCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                cartQuantity={cartItem?.quantity || 0}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
