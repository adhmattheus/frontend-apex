"use server";

import { revalidatePath } from "next/cache";

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  imageUrl: string;
  createdAt: Date;
};

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life",
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
    description:
      "Adjustable LED desk lamp with touch controls and USB charging",
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
    description:
      "Ergonomic wireless mouse with adjustable DPI and rechargeable battery",
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
];

export type Sale = {
  id: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "overdue";
  customerName?: string;
  dueDate?: Date;
  paidAt?: Date;
  status: "completed" | "canceled";
  createdAt: Date;
  canceledAt?: Date;
};

export type Transaction = {
  id: string;
  type: "sale" | "cancelation" | "payment";
  amount: number;
  saleId: string;
  createdAt: Date;
};

const sales: Sale[] = [
  // Recent completed sales with immediate payment
  {
    id: "sale_001",
    items: [
      {
        productId: "1",
        productName: "Wireless Headphones",
        quantity: 2,
        price: 299.99,
      },
      {
        productId: "5",
        productName: "Desk Lamp LED",
        quantity: 1,
        price: 79.99,
      },
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
    items: [
      {
        productId: "2",
        productName: "Smart Watch Pro",
        quantity: 1,
        price: 399.99,
      },
    ],
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
      {
        productId: "7",
        productName: "Wireless Mouse",
        quantity: 3,
        price: 39.99,
      },
      {
        productId: "12",
        productName: "Desk Mat Extended",
        quantity: 2,
        price: 24.99,
      },
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
      {
        productId: "3",
        productName: "Ergonomic Office Chair",
        quantity: 2,
        price: 449.99,
      },
      {
        productId: "9",
        productName: "Laptop Stand Aluminum",
        quantity: 2,
        price: 89.99,
      },
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
      {
        productId: "16",
        productName: "External SSD 1TB",
        quantity: 3,
        price: 149.99,
      },
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
    items: [
      {
        productId: "14",
        productName: "Bluetooth Speaker Portable",
        quantity: 4,
        price: 79.99,
      },
    ],
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
      {
        productId: "13",
        productName: "Phone Stand Adjustable",
        quantity: 8,
        price: 19.99,
      },
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
    items: [
      {
        productId: "5",
        productName: "Desk Lamp LED",
        quantity: 5,
        price: 79.99,
      },
    ],
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
      {
        productId: "1",
        productName: "Wireless Headphones",
        quantity: 1,
        price: 299.99,
      },
      {
        productId: "2",
        productName: "Smart Watch Pro",
        quantity: 1,
        price: 399.99,
      },
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
    items: [
      {
        productId: "17",
        productName: "Document Scanner",
        quantity: 2,
        price: 279.99,
      },
    ],
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
      {
        productId: "11",
        productName: "Cable Management Box",
        quantity: 6,
        price: 34.99,
      },
      {
        productId: "15",
        productName: "Desk Organizer Set",
        quantity: 4,
        price: 44.99,
      },
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
    items: [
      {
        productId: "18",
        productName: "Ergonomic Wrist Rest",
        quantity: 12,
        price: 29.99,
      },
    ],
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
      {
        productId: "7",
        productName: "Wireless Mouse",
        quantity: 1,
        price: 39.99,
      },
      {
        productId: "12",
        productName: "Desk Mat Extended",
        quantity: 1,
        price: 24.99,
      },
      {
        productId: "18",
        productName: "Ergonomic Wrist Rest",
        quantity: 1,
        price: 29.99,
      },
    ],
    total: 94.97,
    paymentMethod: "credit_card",
    paymentStatus: "pending",
    customerName: "Robert Johnson",
    dueDate: new Date("2025-01-31T23:59:59"),
    status: "completed",
    createdAt: new Date("2024-12-31T15:45:00"),
  },
];

const transactions: Transaction[] = [
  {
    id: "txn_001",
    type: "sale",
    amount: 679.97,
    saleId: "sale_001",
    createdAt: new Date("2024-12-30T14:30:00"),
  },
  {
    id: "txn_002",
    type: "sale",
    amount: 399.99,
    saleId: "sale_002",
    createdAt: new Date("2024-12-30T16:45:00"),
  },
  {
    id: "txn_003",
    type: "sale",
    amount: 169.95,
    saleId: "sale_003",
    createdAt: new Date("2024-12-31T10:15:00"),
  },
  {
    id: "txn_007",
    type: "sale",
    amount: 659.82,
    saleId: "sale_007",
    createdAt: new Date("2024-12-28T15:00:00"),
  },
  {
    id: "txn_008",
    type: "sale",
    amount: 399.95,
    saleId: "sale_008",
    createdAt: new Date("2024-12-27T11:30:00"),
  },
  {
    id: "txn_009",
    type: "sale",
    amount: 699.98,
    saleId: "sale_009",
    createdAt: new Date("2024-12-26T14:20:00"),
  },
  {
    id: "txn_010",
    type: "sale",
    amount: 559.98,
    saleId: "sale_010",
    createdAt: new Date("2024-12-25T10:00:00"),
  },
  {
    id: "txn_010_cancel",
    type: "cancelation",
    amount: 559.98,
    saleId: "sale_010",
    createdAt: new Date("2024-12-26T09:00:00"),
  },
  {
    id: "txn_011",
    type: "sale",
    amount: 389.9,
    saleId: "sale_011",
    createdAt: new Date("2024-12-29T16:00:00"),
  },
  {
    id: "txn_012",
    type: "sale",
    amount: 359.88,
    saleId: "sale_012",
    createdAt: new Date("2024-12-30T09:00:00"),
  },
];

export async function getProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products;
}

export async function createProduct(data: Omit<Product, "id" | "createdAt">) {
  const newProduct: Product = {
    ...data,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date(),
  };
  products.push(newProduct);
  revalidatePath("/");
  return { success: true, product: newProduct };
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt">>
) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return { success: false, error: "Product not found" };
  }
  products[index] = { ...products[index], ...data };
  revalidatePath("/");
  revalidatePath("/sales");
  return { success: true, product: products[index] };
}

export async function deleteProduct(id: string) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return { success: false, error: "Product not found" };
  }
  products.splice(index, 1);
  revalidatePath("/");
  return { success: true };
}

export async function createSale(
  items: { productId: string; quantity: number }[],
  paymentMethod: string,
  customerName?: string
) {
  // Validate stock and calculate total
  let total = 0;
  const saleItems: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[] = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return { success: false, error: `Product ${item.productId} not found` };
    }
    if (product.stock < item.quantity) {
      return {
        success: false,
        error: `Insufficient stock for ${product.name}`,
      };
    }
    saleItems.push({
      productId: item.productId,
      productName: product.name,
      quantity: item.quantity,
      price: product.price,
    });
    total += product.price * item.quantity;
  }

  // Update stock
  for (const item of saleItems) {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.stock -= item.quantity;
      if (product.stock === 0) {
        product.status = "inactive";
      }
    }
  }

  // Determine payment status and due date based on payment method
  const immediatePaymentMethods = ["cash", "pix", "debit_card"];
  const isImmediate = immediatePaymentMethods.includes(paymentMethod);

  const paymentStatus: "paid" | "pending" = isImmediate ? "paid" : "pending";
  const dueDate = isImmediate
    ? undefined
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days for credit/invoice
  const paidAt = isImmediate ? new Date() : undefined;

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
  };
  sales.push(sale);

  // Create transaction only if payment is immediate
  if (isImmediate) {
    const transaction: Transaction = {
      id: Math.random().toString(36).substring(7),
      type: "sale",
      amount: total,
      saleId: sale.id,
      createdAt: new Date(),
    };
    transactions.push(transaction);
  }

  revalidatePath("/sales");
  revalidatePath("/sales/history");
  revalidatePath("/financial");
  revalidatePath("/receivables");
  revalidatePath("/");
  return { success: true, sale };
}

export async function getSales(): Promise<Sale[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return sales.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function cancelSale(saleId: string) {
  const sale = sales.find((s) => s.id === saleId);
  if (!sale) {
    return { success: false, error: "Sale not found" };
  }

  if (sale.status === "canceled") {
    return { success: false, error: "Sale already canceled" };
  }

  // Restore stock
  for (const item of sale.items) {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.stock += item.quantity;
      if (product.stock > 0 && product.status === "inactive") {
        product.status = "active";
      }
    }
  }

  // Update sale status
  sale.status = "canceled";
  sale.canceledAt = new Date();

  // Create cancelation transaction only if payment was completed
  if (sale.paymentStatus === "paid") {
    const transaction: Transaction = {
      id: Math.random().toString(36).substring(7),
      type: "cancelation",
      amount: sale.total,
      saleId: sale.id,
      createdAt: new Date(),
    };
    transactions.push(transaction);
  }

  revalidatePath("/sales/history");
  revalidatePath("/financial");
  revalidatePath("/receivables");
  revalidatePath("/");
  return { success: true };
}

export async function getTransactions(): Promise<Transaction[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return transactions.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export async function getFinancialSummary() {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const completedSales = sales.filter(
    (s) => s.status === "completed" && s.paymentStatus === "paid"
  );
  const canceledSales = sales.filter(
    (s) => s.status === "canceled" && s.paymentStatus === "paid"
  );

  const totalSales = completedSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCancelations = canceledSales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );
  const cashBalance = totalSales - totalCancelations;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySales = completedSales.filter(
    (s) => s.paidAt && s.paidAt >= today
  );
  const dailyTotal = todaySales.reduce((sum, sale) => sum + sale.total, 0);

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthlySales = completedSales.filter(
    (s) => s.paidAt && s.paidAt >= firstDayOfMonth
  );
  const monthlyTotal = monthlySales.reduce((sum, sale) => sum + sale.total, 0);

  return {
    cashBalance,
    dailyTotal,
    monthlyTotal,
    totalSales: completedSales.length,
    totalCancelations: canceledSales.length,
  };
}

export async function markPaymentAsPaid(saleId: string) {
  const sale = sales.find((s) => s.id === saleId);
  if (!sale) {
    return { success: false, error: "Sale not found" };
  }

  if (sale.status === "canceled") {
    return { success: false, error: "Cannot mark canceled sale as paid" };
  }

  if (sale.paymentStatus === "paid") {
    return { success: false, error: "Payment already completed" };
  }

  // Update payment status
  sale.paymentStatus = "paid";
  sale.paidAt = new Date();

  // Create payment transaction
  const transaction: Transaction = {
    id: Math.random().toString(36).substring(7),
    type: "payment",
    amount: sale.total,
    saleId: sale.id,
    createdAt: new Date(),
  };
  transactions.push(transaction);

  revalidatePath("/receivables");
  revalidatePath("/financial");
  revalidatePath("/sales/history");
  return { success: true };
}

export async function getReceivables(): Promise<Sale[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const now = new Date();

  // Update overdue status
  sales.forEach((sale) => {
    if (
      sale.paymentStatus === "pending" &&
      sale.dueDate &&
      sale.dueDate < now &&
      sale.status === "completed"
    ) {
      sale.paymentStatus = "overdue";
    }
  });

  return sales
    .filter((s) => s.status === "completed" && s.paymentStatus !== "paid")
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
}

export async function getCustomerAnalytics() {
  // Group sales by customer
  const customerMap = new Map<
    string,
    {
      name: string;
      totalSpent: number;
      totalPurchases: number;
      lastPurchase: Date;
      sales: Sale[];
    }
  >();

  sales.forEach((sale) => {
    if (sale.status === "completed" && sale.customerName) {
      const existing = customerMap.get(sale.customerName);
      if (existing) {
        existing.totalSpent += sale.total;
        existing.totalPurchases += 1;
        if (sale.createdAt > existing.lastPurchase) {
          existing.lastPurchase = sale.createdAt;
        }
        existing.sales.push(sale);
      } else {
        customerMap.set(sale.customerName, {
          name: sale.customerName,
          totalSpent: sale.total,
          totalPurchases: 1,
          lastPurchase: sale.createdAt,
          sales: [sale],
        });
      }
    }
  });

  return Array.from(customerMap.values()).sort(
    (a, b) => b.totalSpent - a.totalSpent
  );
}

export type Supplier = {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  cnpj?: string;
  status: "active" | "inactive";
  createdAt: Date;
};

const suppliers: Supplier[] = [
  {
    id: "sup_001",
    name: "Tech Distributors Inc",
    contactName: "Michael Chen",
    email: "michael@techdist.com",
    phone: "(11) 98765-4321",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    cnpj: "12.345.678/0001-90",
    status: "active",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "sup_002",
    name: "Electronics Wholesale",
    contactName: "Sarah Williams",
    email: "sarah@elecwholesale.com",
    phone: "(21) 97654-3210",
    address: "Rua das Laranjeiras, 500 - Rio de Janeiro, RJ",
    cnpj: "23.456.789/0001-81",
    status: "active",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "sup_003",
    name: "Furniture World Supply",
    contactName: "David Martinez",
    email: "david@furnitureworld.com",
    phone: "(31) 96543-2109",
    address: "Av. Afonso Pena, 3000 - Belo Horizonte, MG",
    cnpj: "34.567.890/0001-72",
    status: "active",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "sup_004",
    name: "Office Supplies Pro",
    contactName: "Jessica Brown",
    email: "jessica@officesupplies.com",
    phone: "(41) 95432-1098",
    address: "Rua XV de Novembro, 800 - Curitiba, PR",
    cnpj: "45.678.901/0001-63",
    status: "active",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "sup_005",
    name: "Global Tech Imports",
    contactName: "Robert Taylor",
    email: "robert@globaltechimports.com",
    phone: "(51) 94321-0987",
    address: "Av. Ipiranga, 1500 - Porto Alegre, RS",
    cnpj: "56.789.012/0001-54",
    status: "inactive",
    createdAt: new Date("2024-01-20"),
  },
];

export type PurchaseOrder = {
  id: string;
  supplierId: string;
  supplierName: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitCost: number;
  }[];
  total: number;
  status: "pending" | "received" | "canceled";
  orderDate: Date;
  expectedDate?: Date;
  receivedDate?: Date;
  notes?: string;
};

export type StockMovement = {
  id: string;
  productId: string;
  productName: string;
  type: "purchase" | "sale" | "adjustment";
  quantity: number;
  reference: string; // PO ID, Sale ID, or note
  createdAt: Date;
};

const purchaseOrders: PurchaseOrder[] = [
  {
    id: "po_001",
    supplierId: "sup_001",
    supplierName: "Tech Distributors Inc",
    items: [
      {
        productId: "1",
        productName: "Wireless Headphones",
        quantity: 50,
        unitCost: 180.0,
      },
      {
        productId: "10",
        productName: "Webcam 4K",
        quantity: 30,
        unitCost: 120.0,
      },
    ],
    total: 12600.0,
    status: "received",
    orderDate: new Date("2024-12-15"),
    expectedDate: new Date("2024-12-22"),
    receivedDate: new Date("2024-12-21"),
    notes: "Bulk order for holiday season",
  },
  {
    id: "po_002",
    supplierId: "sup_002",
    supplierName: "Electronics Wholesale",
    items: [
      {
        productId: "7",
        productName: "Wireless Mouse",
        quantity: 100,
        unitCost: 22.0,
      },
      {
        productId: "6",
        productName: "USB-C Hub",
        quantity: 80,
        unitCost: 28.0,
      },
    ],
    total: 4440.0,
    status: "received",
    orderDate: new Date("2024-12-18"),
    expectedDate: new Date("2024-12-28"),
    receivedDate: new Date("2024-12-27"),
  },
  {
    id: "po_003",
    supplierId: "sup_003",
    supplierName: "Furniture World Supply",
    items: [
      {
        productId: "3",
        productName: "Ergonomic Office Chair",
        quantity: 20,
        unitCost: 280.0,
      },
      {
        productId: "8",
        productName: "Monitor Stand",
        quantity: 40,
        unitCost: 35.0,
      },
    ],
    total: 7000.0,
    status: "pending",
    orderDate: new Date("2024-12-28"),
    expectedDate: new Date("2025-01-08"),
    notes: "Scheduled delivery after holidays",
  },
  {
    id: "po_004",
    supplierId: "sup_004",
    supplierName: "Office Supplies Pro",
    items: [
      {
        productId: "11",
        productName: "Cable Management Box",
        quantity: 60,
        unitCost: 18.0,
      },
      {
        productId: "15",
        productName: "Desk Organizer Set",
        quantity: 50,
        unitCost: 25.0,
      },
      {
        productId: "13",
        productName: "Phone Stand Adjustable",
        quantity: 100,
        unitCost: 11.0,
      },
    ],
    total: 3430.0,
    status: "pending",
    orderDate: new Date("2024-12-30"),
    expectedDate: new Date("2025-01-10"),
  },
];

const stockMovements: StockMovement[] = [
  {
    id: "mov_001",
    productId: "1",
    productName: "Wireless Headphones",
    type: "purchase",
    quantity: 50,
    reference: "po_001",
    createdAt: new Date("2024-12-21"),
  },
  {
    id: "mov_002",
    productId: "10",
    productName: "Webcam 4K",
    type: "purchase",
    quantity: 30,
    reference: "po_001",
    createdAt: new Date("2024-12-21"),
  },
  {
    id: "mov_003",
    productId: "7",
    productName: "Wireless Mouse",
    type: "purchase",
    quantity: 100,
    reference: "po_002",
    createdAt: new Date("2024-12-27"),
  },
  {
    id: "mov_004",
    productId: "6",
    productName: "USB-C Hub",
    type: "purchase",
    quantity: 80,
    reference: "po_002",
    createdAt: new Date("2024-12-27"),
  },
];

export async function getSuppliers() {
  return suppliers;
}

export async function createSupplier(data: Omit<Supplier, "id" | "createdAt">) {
  const newSupplier: Supplier = {
    ...data,
    id: `sup_${Date.now()}`,
    createdAt: new Date(),
  };
  suppliers.push(newSupplier);
  revalidatePath("/suppliers");
  return { success: true, supplier: newSupplier };
}

export async function updateSupplier(id: string, data: Partial<Supplier>) {
  const index = suppliers.findIndex((s) => s.id === id);
  if (index === -1) {
    return { success: false, error: "Supplier not found" };
  }
  suppliers[index] = { ...suppliers[index], ...data };
  revalidatePath("/suppliers");
  return { success: true, supplier: suppliers[index] };
}

export async function deleteSupplier(id: string) {
  const index = suppliers.findIndex((s) => s.id === id);
  if (index === -1) {
    return { success: false, error: "Supplier not found" };
  }
  suppliers.splice(index, 1);
  revalidatePath("/suppliers");
  return { success: true };
}

export async function getPurchaseOrders() {
  return purchaseOrders.sort(
    (a, b) => b.orderDate.getTime() - a.orderDate.getTime()
  );
}

export async function createPurchaseOrder(data: {
  supplierId: string;
  items: { productId: string; quantity: number; unitCost: number }[];
  expectedDate?: Date;
  notes?: string;
}) {
  const supplier = suppliers.find((s) => s.id === data.supplierId);
  if (!supplier) {
    return { success: false, error: "Supplier not found" };
  }

  // Validate products and build items
  const items: {
    productId: string;
    productName: string;
    quantity: number;
    unitCost: number;
  }[] = [];
  let total = 0;

  for (const item of data.items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return { success: false, error: `Product ${item.productId} not found` };
    }
    items.push({
      productId: item.productId,
      productName: product.name,
      quantity: item.quantity,
      unitCost: item.unitCost,
    });
    total += item.quantity * item.unitCost;
  }

  const po: PurchaseOrder = {
    id: `po_${Date.now()}`,
    supplierId: data.supplierId,
    supplierName: supplier.name,
    items,
    total,
    status: "pending",
    orderDate: new Date(),
    expectedDate: data.expectedDate,
    notes: data.notes,
  };

  purchaseOrders.push(po);
  revalidatePath("/purchases");
  return { success: true, purchaseOrder: po };
}

export async function receivePurchaseOrder(poId: string) {
  const po = purchaseOrders.find((p) => p.id === poId);
  if (!po) {
    return { success: false, error: "Purchase order not found" };
  }

  if (po.status !== "pending") {
    return { success: false, error: "Purchase order already processed" };
  }

  // Update stock for all items
  for (const item of po.items) {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.stock += item.quantity;
      if (product.stock > 0) {
        product.status = "active";
      }

      // Create stock movement
      const movement: StockMovement = {
        id: `mov_${Date.now()}_${item.productId}`,
        productId: item.productId,
        productName: item.productName,
        type: "purchase",
        quantity: item.quantity,
        reference: poId,
        createdAt: new Date(),
      };
      stockMovements.push(movement);
    }
  }

  // Update PO status
  po.status = "received";
  po.receivedDate = new Date();

  revalidatePath("/purchases");
  revalidatePath("/products");
  revalidatePath("/inventory");
  revalidatePath("/");
  return { success: true };
}

export async function cancelPurchaseOrder(poId: string) {
  const po = purchaseOrders.find((p) => p.id === poId);
  if (!po) {
    return { success: false, error: "Purchase order not found" };
  }

  if (po.status !== "pending") {
    return { success: false, error: "Can only cancel pending orders" };
  }

  po.status = "canceled";
  revalidatePath("/purchases");
  return { success: true };
}

export async function getStockMovements() {
  return stockMovements.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export type Expense = {
  id: string;
  description: string;
  category:
    | "rent"
    | "utilities"
    | "salaries"
    | "marketing"
    | "maintenance"
    | "taxes"
    | "supplies"
    | "other";
  amount: number;
  date: Date;
  recurring: boolean;
  status: "paid" | "pending";
  notes?: string;
  createdAt: Date;
};

const expenses: Expense[] = [
  {
    id: "exp_001",
    description: "Store Rent - December",
    category: "rent",
    amount: 3500.0,
    date: new Date("2024-12-01"),
    recurring: true,
    status: "paid",
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "exp_002",
    description: "Electricity Bill",
    category: "utilities",
    amount: 450.0,
    date: new Date("2024-12-15"),
    recurring: true,
    status: "paid",
    createdAt: new Date("2024-12-15"),
  },
  {
    id: "exp_003",
    description: "Internet & Phone",
    category: "utilities",
    amount: 280.0,
    date: new Date("2024-12-10"),
    recurring: true,
    status: "paid",
    createdAt: new Date("2024-12-10"),
  },
  {
    id: "exp_004",
    description: "Employee Salaries - December",
    category: "salaries",
    amount: 8500.0,
    date: new Date("2024-12-28"),
    recurring: true,
    status: "paid",
    createdAt: new Date("2024-12-28"),
  },
  {
    id: "exp_005",
    description: "Social Media Advertising",
    category: "marketing",
    amount: 650.0,
    date: new Date("2024-12-20"),
    recurring: false,
    status: "paid",
    createdAt: new Date("2024-12-20"),
  },
  {
    id: "exp_006",
    description: "AC Maintenance",
    category: "maintenance",
    amount: 320.0,
    date: new Date("2024-12-18"),
    recurring: false,
    status: "paid",
    createdAt: new Date("2024-12-18"),
  },
  {
    id: "exp_007",
    description: "Business Tax Payment",
    category: "taxes",
    amount: 1200.0,
    date: new Date("2024-12-30"),
    recurring: false,
    status: "paid",
    createdAt: new Date("2024-12-30"),
  },
  {
    id: "exp_008",
    description: "Office Cleaning Supplies",
    category: "supplies",
    amount: 180.0,
    date: new Date("2024-12-22"),
    recurring: false,
    status: "paid",
    createdAt: new Date("2024-12-22"),
  },
  {
    id: "exp_009",
    description: "Store Rent - January",
    category: "rent",
    amount: 3500.0,
    date: new Date("2025-01-01"),
    recurring: true,
    status: "pending",
    createdAt: new Date("2024-12-28"),
  },
  {
    id: "exp_010",
    description: "Insurance Premium",
    category: "other",
    amount: 890.0,
    date: new Date("2025-01-05"),
    recurring: false,
    status: "pending",
    createdAt: new Date("2024-12-30"),
  },
];

export async function getExpenses() {
  return expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function createExpense(data: Omit<Expense, "id" | "createdAt">) {
  const newExpense: Expense = {
    ...data,
    id: `exp_${Date.now()}`,
    createdAt: new Date(),
  };
  expenses.push(newExpense);
  revalidatePath("/expenses");
  revalidatePath("/financial");
  revalidatePath("/");
  return { success: true, expense: newExpense };
}

export async function updateExpense(id: string, data: Partial<Expense>) {
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return { success: false, error: "Expense not found" };
  }
  expenses[index] = { ...expenses[index], ...data };
  revalidatePath("/expenses");
  revalidatePath("/financial");
  revalidatePath("/");
  return { success: true, expense: expenses[index] };
}

export async function deleteExpense(id: string) {
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return { success: false, error: "Expense not found" };
  }
  expenses.splice(index, 1);
  revalidatePath("/expenses");
  revalidatePath("/financial");
  revalidatePath("/");
  return { success: true };
}

export async function markExpenseAsPaid(id: string) {
  const expense = expenses.find((e) => e.id === id);
  if (!expense) {
    return { success: false, error: "Expense not found" };
  }
  expense.status = "paid";
  expense.date = new Date();
  revalidatePath("/expenses");
  revalidatePath("/financial");
  revalidatePath("/");
  return { success: true };
}

export async function getExpensesSummary() {
  const paidExpenses = expenses.filter((e) => e.status === "paid");
  const totalExpenses = paidExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthlyExpenses = paidExpenses.filter((e) => {
    const expDate = new Date(e.date);
    return (
      expDate.getMonth() === today.getMonth() &&
      expDate.getFullYear() === today.getFullYear()
    );
  });
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  const categoryTotals = expenses
    .filter((e) => e.status === "paid")
    .reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);

  return {
    totalExpenses,
    monthlyTotal,
    categoryTotals,
    pendingCount: expenses.filter((e) => e.status === "pending").length,
  };
}

// Analytics functions
export async function getAnalytics() {
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  // Sales by day for the current month
  const salesByDay: Record<string, number> = {};
  const lastMonth = new Date(thisYear, thisMonth - 1, 1);

  sales
    .filter((s) => s.status === "completed" && s.paymentStatus === "paid")
    .forEach((sale) => {
      if (sale.paidAt) {
        const day = sale.paidAt.toISOString().split("T")[0];
        salesByDay[day] = (salesByDay[day] || 0) + sale.total;
      }
    });

  // Product sales analysis
  const productSales: Record<
    string,
    { name: string; quantity: number; revenue: number }
  > = {};
  sales
    .filter((s) => s.status === "completed")
    .forEach((sale) => {
      sale.items.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            name: item.productName,
            quantity: 0,
            revenue: 0,
          };
        }
        productSales[item.productId].quantity += item.quantity;
        productSales[item.productId].revenue += item.quantity * item.price;
      });
    });

  const topProducts = Object.entries(productSales)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  // Monthly comparison
  const currentMonthSales = sales.filter((s) => {
    if (s.status !== "completed" || s.paymentStatus !== "paid" || !s.paidAt)
      return false;
    const paidDate = new Date(s.paidAt);
    return (
      paidDate.getMonth() === thisMonth && paidDate.getFullYear() === thisYear
    );
  });

  const lastMonthSales = sales.filter((s) => {
    if (s.status !== "completed" || s.paymentStatus !== "paid" || !s.paidAt)
      return false;
    const paidDate = new Date(s.paidAt);
    return (
      paidDate.getMonth() === thisMonth - 1 &&
      paidDate.getFullYear() === thisYear
    );
  });

  const currentMonthTotal = currentMonthSales.reduce(
    (sum, s) => sum + s.total,
    0
  );
  const lastMonthTotal = lastMonthSales.reduce((sum, s) => sum + s.total, 0);
  const salesGrowth =
    lastMonthTotal > 0
      ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
      : 0;

  // Category analysis
  const categoryRevenue: Record<string, number> = {};
  products.forEach((product) => {
    if (productSales[product.id]) {
      categoryRevenue[product.category] =
        (categoryRevenue[product.category] || 0) +
        productSales[product.id].revenue;
    }
  });

  // Expenses by category
  const expensesByCategory: Record<string, number> = {};
  const paidExpenses = expenses.filter((e) => e.status === "paid");
  paidExpenses.forEach((expense) => {
    expensesByCategory[expense.category] =
      (expensesByCategory[expense.category] || 0) + expense.amount;
  });

  return {
    salesByDay,
    topProducts,
    salesGrowth,
    currentMonthTotal,
    lastMonthTotal,
    categoryRevenue,
    expensesByCategory,
    totalOrders: currentMonthSales.length,
    averageOrderValue:
      currentMonthSales.length > 0
        ? currentMonthTotal / currentMonthSales.length
        : 0,
  };
}
