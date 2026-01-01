"use client"

import type { Product } from "@/app/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Check, Package, Plus } from "lucide-react"
import Image from "next/image"

interface ProductSalesCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  cartQuantity: number
}

export function ProductSalesCard({ product, onAddToCart, cartQuantity }: ProductSalesCardProps) {
  const isOutOfStock = product.stock === 0
  const isMaxedOut = cartQuantity >= product.stock

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="aspect-square relative overflow-hidden bg-muted">
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          {cartQuantity > 0 && (
            <Badge variant="default" className="gap-1">
              <Check className="h-3 w-3" />
              {cartQuantity} in cart
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-lg leading-tight line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 text-sm">
          <Badge variant="outline">{product.category}</Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Package className="h-3.5 w-3.5" />
            <span>{product.stock} available</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
        <Button
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock || isMaxedOut}
          className="gap-2 bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  )
}
