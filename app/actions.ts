"use server"

import { revalidatePath } from "next/cache"

export type Product = {
  id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  status: "active" | "inactive"
  imageUrl: string
  createdAt: Date
}

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    category: "Electronics",
    price: 299.99,
    stock: 45,
    status: "active",
    imageUrl: "/wireless-headphones.png",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking with heart rate monitor and GPS",
    category: "Electronics",
    price: 399.99,
    stock: 23,
    status: "active",
    imageUrl: "/smartwatch-lifestyle.png",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    description: "Adjustable lumbar support with breathable mesh back",
    category: "Furniture",
    price: 449.99,
    stock: 12,
    status: "active",
    imageUrl: "/ergonomic-office-chair.png",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with Cherry MX switches",
    category: "Electronics",
    price: 159.99,
    stock: 0,
    status: "inactive",
    imageUrl: "/mechanical-keyboard.png",
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "5",
    name: "Desk Lamp LED",
    description: "Adjustable LED desk lamp with touch controls and USB charging",
    category: "Lighting",
    price: 79.99,
    stock: 67,
    status: "active",
    imageUrl: "/modern-desk-lamp.png",
    createdAt: new Date("2024-02-14"),
  },
  {
    id: "6",
    name: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader",
    category: "Electronics",
    price: 49.99,
    stock: 89,
    status: "active",
    imageUrl: "/usb-hub.png",
    createdAt: new Date("2024-03-01"),
  },
  {
    id: "7",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI and rechargeable battery",
    category: "Electronics",
    price: 39.99,
    stock: 134,
    status: "active",
    imageUrl: "/wireless-mouse.png",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "8",
    name: "Monitor Stand",
    description: "Adjustable monitor stand with storage drawer",
    category: "Furniture",
    price: 59.99,
    stock: 28,
    status: "active",
    imageUrl: "/monitor-stand.jpg",
    createdAt: new Date("2024-02-28"),
  },
  {
    id: "9",
    name: "Laptop Stand Aluminum",
    description: "Premium aluminum laptop stand with cooling ventilation",
    category: "Furniture",
    price: 89.99,
    stock: 34,
    status: "active",
    imageUrl: "/aluminum-laptop-stand.jpg",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "10",
    name: "Webcam 4K",
    description: "4K ultra HD webcam with auto-focus and dual microphones",
    category: "Electronics",
    price: 199.99,
    stock: 18,
    status: "active",
    imageUrl: "/4k-webcam.png",
    createdAt: new Date("2024-02-05"),
  },
  {
    id: "11",
    name: "Cable Management Box",
    description: "Wooden cable organizer box with multiple outlets",
    category: "Accessories",
    price: 34.99,
    stock: 56,
    status: "active",
    imageUrl: "/cable-management-box.jpg",
    createdAt: new Date("2024-03-15"),
  },
  {
    id: "12",
    name: "Desk Mat Extended",
    description: "Extended mouse pad desk mat with stitched edges",
    category: "Accessories",
    price: 24.99,
    stock: 103,
    status: "active",
    imageUrl: "/extended-desk-mat.jpg",
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "13",
    name: "Phone Stand Adjustable",
    description: "Universal adjustable phone holder for desk",
    category: "Accessories",
    price: 19.99,
    stock: 87,
    status: "active",
    imageUrl: "/phone-stand-desk-holder.jpg",
    createdAt: new Date("2024-02-18"),
  },
  {
    id: "14",
    name: "Bluetooth Speaker Portable",
    description: "Waterproof portable speaker with 20-hour battery",
    category: "Electronics",
    price: 79.99,
    stock: 42,
    status: "active",
    imageUrl: "/portable-bluetooth-speaker.jpg",
    createdAt: new Date("2024-03-08"),
  },
  {
    id: "15",
    name: "Desk Organizer Set",
    description: "5-piece bamboo desk organizer set with pen holder",
    category: "Accessories",
    price: 44.99,
    stock: 29,
    status: "active",
    imageUrl: "/bamboo-desk-organizer.jpg",
    createdAt: new Date("2024-01-30"),
  },
  {
    id: "16",
    name: "External SSD 1TB",
    description: "Portable external SSD with USB-C and 1050MB/s speed",
    category: "Electronics",
    price: 149.99,
    stock: 31,
    status: "active",
    imageUrl: "/external-ssd-portable.jpg",
    createdAt: new Date("2024-02-22"),
  },
  {
    id: "17",
    name: "Document Scanner",
    description: "High-speed duplex document scanner with auto-feed",
    category: "Electronics",
    price: 279.99,
    stock: 8,
    status: "active",
    imageUrl: "/document-scanner.jpg",
    createdAt: new Date("2024-03-12"),
  },
  {
    id: "18",
    name: "Ergonomic Wrist Rest",
    description: "Memory foam keyboard and mouse wrist rest set",
    category: "Accessories",
    price: 29.99,
    stock: 72,
    status: "active",
    imageUrl: "/ergonomic-wrist-rest.jpg",
    createdAt: new Date("2024-01-18"),
  },
]

export type Sale = {
  id: string
  items: { productId: string; productName: string; quantity: number; price: number }[]
  total: number
  paymentMethod: string
  paymentStatus: "paid" | "pending" | "overdue"
  customerName?: string
  dueDate?: Date
  paidAt?: Date
  status: "completed" | "canceled"
  createdAt: Date
  canceledAt?: Date
}

export type Transaction = {
  id: string
  type: "sale" | "cancelation" | "payment"
  amount: number
  saleId: string
  createdAt: Date
}

const sales: Sale[] = [
  // Recent completed sales with immediate payment
  {
    id: "sale_001",
    items: [
      { productId: "1", productName: "Wireless Headphones", quantity: 2, price: 299.99 },
      { productId: "5", productName: "Desk Lamp LED", quantity: 1, price: 79.99 },
    ],
    total: 679.97,
    paymentMethod: "cash",
    paymentStatus: "paid",
    customerName: "John Smith",
    paidAt: new Date("2024-12-30T14:30:00"),
    status: "completed",
    createdAt: new Date("2024-12-30T14:30:00"),
  },
  {
    id: "sale_002",
    items: [{ productId: "2", productName: "Smart Watch Pro", quantity: 1, price: 399.99 }],
    total: 399.99,
    paymentMethod: "pix",
    paymentStatus: "paid",
    customerName: "Maria Santos",
    paidAt: new Date("2024-12-30T16:45:00"),
    status: "completed",
    createdAt: new Date("2024-12-30T16:45:00"),
  },
  {
    id: "sale_003",
    items: [
      { productId: "7", productName: "Wireless Mouse", quantity: 3, price: 39.99 },
      { productId: "12", productName: "Desk Mat Extended", quantity: 2, price: 24.99 },
    ],
    total: 169.95,
    paymentMethod: "debit_card",
    paymentStatus: "paid",
    customerName: "Carlos Mendes",
    paidAt: new Date("2024-12-31T10:15:00"),
    status: "completed",
    createdAt: new Date("2024-12-31T10:15:00"),
  },

  // Pending receivables (credit card and invoice)
  {
    id: "sale_004",
    items: [
      { productId: "3", productName: "Ergonomic Office Chair", quantity: 2, price: 449.99 },
      { productId: "9", productName: "Laptop Stand Aluminum", quantity: 2, price: 89.99 },
    ],
    total: 1079.96,
    paymentMethod: "credit_card",
    paymentStatus: "pending",
    customerName: "Tech Solutions Corp",
    dueDate: new Date("2025-01-30T23:59:59"),
    status: "completed",
    createdAt: new Date("2024-12-31T11:00:00"),
  },
  {
    id: "sale_005",
    items: [
      { productId: "10", productName: "Webcam 4K", quantity: 5, price: 199.99 },
      { productId: "16", productName: "External SSD 1TB", quantity: 3, price: 149.99 },
    ],
    total: 1449.92,
    paymentMethod: "invoice",
    paymentStatus: "pending",
    customerName: "Digital Media Inc",
    dueDate: new Date("2025-02-05T23:59:59"),
    status: "completed",
    createdAt: new Date("2024-12-31T13:20:00"),
  },

  // Overdue receivable
  {
    id: "sale_006",
    items: [{ productId: "14", productName: "Bluetooth Speaker Portable", quantity: 4, price: 79.99 }],
    total: 319.96,
    paymentMethod: "invoice",
    paymentStatus: "overdue",
    customerName: "Sound Events LLC",
    dueDate: new Date("2024-12-15T23:59:59"),
    status: "completed",
    createdAt: new Date("2024-11-15T09:30:00"),
  },

  // Older completed sales
  {
    id: "sale_007",
    items: [
      { productId: "6", productName: "USB-C Hub", quantity: 10, price: 49.99 },
      { productId: "13", productName: "Phone Stand Adjustable", quantity: 8, price: 19.99 },
    ],
    total: 659.82,
    paymentMethod: "pix",
    paymentStatus: "paid",
    customerName: "Office Supplies Store",
    paidAt: new Date("2024-12-28T15:00:00"),
    status: "completed",
    createdAt: new Date("2024-12-28T15:00:00"),
  },
  {
    id: "sale_008",
    items: [{ productId: "5", productName: "Desk Lamp LED", quantity: 5, price: 79.99 }],
    total: 399.95,
    paymentMethod: "cash",
    paymentStatus: "paid",
    customerName: "Furniture Plus",
    paidAt: new Date("2024-12-27T11:30:00"),
    status: "completed",
    createdAt: new Date("2024-12-27T11:30:00"),
  },
  {
    id: "sale_009",
    items: [
      { productId: "1", productName: "Wireless Headphones", quantity: 1, price: 299.99 },
      { productId: "2", productName: "Smart Watch Pro", quantity: 1, price: 399.99 },
    ],
    total: 699.98,
    paymentMethod: "debit_card",
    paymentStatus: "paid",
    customerName: "Patricia Lima",
    paidAt: new Date("2024-12-26T14:20:00"),
    status: "completed",
    createdAt: new Date("2024-12-26T14:20:00"),
  },

  // Canceled sale
  {
    id: "sale_010",
    items: [{ productId: "17", productName: "Document Scanner", quantity: 2, price: 279.99 }],
    total: 559.98,
    paymentMethod: "cash",
    paymentStatus: "paid",
    customerName: "Business Center",
    paidAt: new Date("2024-12-25T10:00:00"),
    status: "canceled",
    createdAt: new Date("2024-12-25T10:00:00"),
    canceledAt: new Date("2024-12-26T09:00:00"),
  },

  // More recent sales
  {
    id: "sale_011",
    items: [
      { productId: "11", productName: "Cable Management Box", quantity: 6, price: 34.99 },
      { productId: "15", productName: "Desk Organizer Set", quantity: 4, price: 44.99 },
    ],
    total: 389.9,
    paymentMethod: "pix",
    paymentStatus: "paid",
    customerName: "Clean Office Co",
    paidAt: new Date("2024-12-29T16:00:00"),
    status: "completed",
    createdAt: new Date("2024-12-29T16:00:00"),
  },
  {
    id: "sale_012",
    items: [{ productId: "18", productName: "Ergonomic Wrist Rest", quantity: 12, price: 29.99 }],
    total: 359.88,
    paymentMethod: "cash",
    paymentStatus: "paid",
    customerName: "Ergonomics Inc",
    paidAt: new Date("2024-12-30T09:00:00"),
    status: "completed",
    createdAt: new Date("2024-12-30T09:00:00"),
  },
  {
    id: "sale_013",
    items: [
      { productId: "7", productName: "Wireless Mouse", quantity: 1, price: 39.99 },
      { productId: "12", productName: "Desk Mat Extended", quantity: 1, price: 24.99 },
      { productId: "18", productName: "Ergonomic Wrist Rest", quantity: 1, price: 29.99 },
    ],
    total: 94.97,
    paymentMethod: "credit_card",
    paymentStatus: "pending",
    customerName: "Robert Johnson",
    dueDate: new Date("2025-01-31T23:59:59"),
    status: "completed",
    createdAt: new Date("2024-12-31T15:45:00"),
  },
]

const transactions: Transaction[] = [
  { id: "txn_001", type: "sale", amount: 679.97, saleId: "sale_001", createdAt: new Date("2024-12-30T14:30:00") },
  { id: "txn_002", type: "sale", amount: 399.99, saleId: "sale_002", createdAt: new Date("2024-12-30T16:45:00") },
  { id: "txn_003", type: "sale", amount: 169.95, saleId: "sale_003", createdAt: new Date("2024-12-31T10:15:00") },
  { id: "txn_007", type: "sale", amount: 659.82, saleId: "sale_007", createdAt: new Date("2024-12-28T15:00:00") },
  { id: "txn_008", type: "sale", amount: 399.95, saleId: "sale_008", createdAt: new Date("2024-12-27T11:30:00") },
  { id: "txn_009", type: "sale", amount: 699.98, saleId: "sale_009", createdAt: new Date("2024-12-26T14:20:00") },
  { id: "txn_010", type: "sale", amount: 559.98, saleId: "sale_010", createdAt: new Date("2024-12-25T10:00:00") },
  {
    id: "txn_010_cancel",
    type: "cancelation",
    amount: 559.98,
    saleId: "sale_010",
    createdAt: new Date("2024-12-26T09:00:00"),
  },
  { id: "txn_011", type: "sale", amount: 389.9, saleId: "sale_011", createdAt: new Date("2024-12-29T16:00:00") },
  { id: "txn_012", type: "sale", amount: 359.88, saleId: "sale_012", createdAt: new Date("2024-12-30T09:00:00") },
]

export async function getProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products
}

export async function createProduct(data: Omit<Product, "id" | "createdAt">) {
  const newProduct: Product = {
    ...data,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date(),
  }
  products.push(newProduct)
  revalidatePath("/")
  return { success: true, product: newProduct }
}

export async function updateProduct(id: string, data: Partial<Omit<Product, "id" | "createdAt">>) {
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) {
    return { success: false, error: "Product not found" }
  }
  products[index] = { ...products[index], ...data }
  revalidatePath("/")
  revalidatePath("/sales")
  return { success: true, product: products[index] }
}

export async function deleteProduct(id: string) {
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) {
    return { success: false, error: "Product not found" }
  }
  products.splice(index, 1)
  revalidatePath("/")
  return { success: true }
}

export async function createSale(
  items: { productId: string; quantity: number }[],
  paymentMethod: string,
  customerName?: string,
) {
  // Validate stock and calculate total
  let total = 0
  const saleItems: { productId: string; productName: string; quantity: number; price: number }[] = []

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId)
    if (!product) {
      return { success: false, error: `Product ${item.productId} not found` }
    }
    if (product.stock < item.quantity) {
      return { success: false, error: `Insufficient stock for ${product.name}` }
    }
    saleItems.push({
      productId: item.productId,
      productName: product.name,
      quantity: item.quantity,
      price: product.price,
    })
    total += product.price * item.quantity
  }

  // Update stock
  for (const item of saleItems) {
    const product = products.find((p) => p.id === item.productId)
    if (product) {
      product.stock -= item.quantity
      if (product.stock === 0) {
        product.status = "inactive"
      }
    }
  }

  // Determine payment status and due date based on payment method
  const immediatePaymentMethods = ["cash", "pix", "debit_card"]
  const isImmediate = immediatePaymentMethods.includes(paymentMethod)

  const paymentStatus: "paid" | "pending" = isImmediate ? "paid" : "pending"
  const dueDate = isImmediate ? undefined : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days for credit/invoice
  const paidAt = isImmediate ? new Date() : undefined

  // Create sale
  const sale: Sale = {
    id: Math.random().toString(36).substring(7),
    items: saleItems,
    total,
    paymentMethod,
    paymentStatus,
    customerName,
    dueDate,
    paidAt,
    status: "completed",
    createdAt: new Date(),
  }
  sales.push(sale)

  // Create transaction only if payment is immediate
  if (isImmediate) {
    const transaction: Transaction = {
      id: Math.random().toString(36).substring(7),
      type: "sale",
      amount: total,
      saleId: sale.id,
      createdAt: new Date(),
    }
    transactions.push(transaction)
  }

  revalidatePath("/sales")
  revalidatePath("/sales/history")
  revalidatePath("/financial")
  revalidatePath("/receivables")
  revalidatePath("/")
  return { success: true, sale }
}

export async function getSales(): Promise<Sale[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return sales.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function cancelSale(saleId: string) {
  const sale = sales.find((s) => s.id === saleId)
  if (!sale) {
    return { success: false, error: "Sale not found" }
  }

  if (sale.status === "canceled") {
    return { success: false, error: "Sale already canceled" }
  }

  // Restore stock
  for (const item of sale.items) {
    const product = products.find((p) => p.id === item.productId)
    if (product) {
      product.stock += item.quantity
      if (product.stock > 0 && product.status === "inactive") {
        product.status = "active"
      }
    }
  }

  // Update sale status
  sale.status = "canceled"
  sale.canceledAt = new Date()

  // Create cancelation transaction only if payment was completed
  if (sale.paymentStatus === "paid") {
    const transaction: Transaction = {
      id: Math.random().toString(36).substring(7),
      type: "cancelation",
      amount: sale.total,
      saleId: sale.id,
      createdAt: new Date(),
    }
    transactions.push(transaction)
  }

  revalidatePath("/sales/history")
  revalidatePath("/financial")
  revalidatePath("/receivables")
  revalidatePath("/")
  return { success: true }
}

export async function getTransactions(): Promise<Transaction[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getFinancialSummary() {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const completedSales = sales.filter((s) => s.status === "completed" && s.paymentStatus === "paid")
  const canceledSales = sales.filter((s) => s.status === "canceled" && s.paymentStatus === "paid")

  const totalSales = completedSales.reduce((sum, sale) => sum + sale.total, 0)
  const totalCancelations = canceledSales.reduce((sum, sale) => sum + sale.total, 0)
  const cashBalance = totalSales - totalCancelations

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todaySales = completedSales.filter((s) => s.paidAt && s.paidAt >= today)
  const dailyTotal = todaySales.reduce((sum, sale) => sum + sale.total, 0)

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const monthlySales = completedSales.filter((s) => s.paidAt && s.paidAt >= firstDayOfMonth)
  const monthlyTotal = monthlySales.reduce((sum, sale) => sum + sale.total, 0)

  return {
    cashBalance,
    dailyTotal,
    monthlyTotal,
    totalSales: completedSales.length,
    totalCancelations: canceledSales.length,
  }
}

export async function markPaymentAsPaid(saleId: string) {
  const sale = sales.find((s) => s.id === saleId)
  if (!sale) {
    return { success: false, error: "Sale not found" }
  }

  if (sale.status === "canceled") {
    return { success: false, error: "Cannot mark canceled sale as paid" }
  }

  if (sale.paymentStatus === "paid") {
    return { success: false, error: "Payment already completed" }
  }

  // Update payment status
  sale.paymentStatus = "paid"
  sale.paidAt = new Date()

  // Create payment transaction
  const transaction: Transaction = {
    id: Math.random().toString(36).substring(7),
    type: "payment",
    amount: sale.total,
    saleId: sale.id,
    createdAt: new Date(),
  }
  transactions.push(transaction)

  revalidatePath("/receivables")
  revalidatePath("/financial")
  revalidatePath("/sales/history")
  return { success: true }
}

export async function getReceivables(): Promise<Sale[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const now = new Date()

  // Update overdue status
  sales.forEach((sale) => {
    if (sale.paymentStatus === "pending" && sale.dueDate && sale.dueDate < now && sale.status === "completed") {
      sale.paymentStatus = "overdue"
    }
  })

  return sales
    .filter((s) => s.status === "completed" && s.paymentStatus !== "paid")
    .sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.getTime() - b.dueDate.getTime()
    })
}
