import {
  Shelf,
  Item,
  Good,
  Category,
  User,
  UserRole,
  Unit,
} from "@prisma/client";

export const users: User[] = [
  {
    id: 61,
    email: "user@mail.com",
    password:
      "$argon2id$v=19$m=65536,t=3,p=4$aggtpNobTGRiDJXRtSw/4A$cb4+jpSqvZ5r4qoSSA8U8h/Av9TDWFRtxJOMdKoTbIE",
    role: "USER" as UserRole,
    deletedAt: null,
  },
  {
    id: 62,
    email: "admin@mail.com",
    password:
      "$argon2id$v=19$m=65536,t=3,p=4$pKBTiXWxbT7fA0bd8jqmHw$vxmdwQse01TcSW0YiphFnibLllQgfYLRrhlathbuBYc",
    role: "ADMIN" as UserRole,
    deletedAt: null,
  },
];

export const categories: Category[] = [
  {
    id: 51,
    name: "Fruits",
  },
  {
    id: 52,
    name: "Metals",
  },
  {
    id: 53,
    name: "Furniture",
  },
  {
    id: 54,
    name: "Electronics",
  },
  {
    id: 55,
    name: "Beverages",
  },
  {
    id: 56,
    name: "Stationery",
  },
  {
    id: 57,
    name: "Clothing",
  },
];

export const goods: Good[] = [
  {
    id: 21,
    name: "Apple",
    description: "Fresh red apples",
    unit: "pcs" as Unit,
    categoryId: 51,
  },
  {
    id: 22,
    name: "Banana",
    description: "Organic bananas",
    unit: "kg" as Unit,
    categoryId: 51,
  },
  {
    id: 23,
    name: "Aluminium",
    description: "High-grade aluminium",
    unit: "kg" as Unit,
    categoryId: 52,
  },
  {
    id: 24,
    name: "Table",
    description: "Wooden dining table",
    unit: "pcs" as Unit,
    categoryId: 53,
  },
  {
    id: 25,
    name: "Laptop",
    description: "14-inch laptop with 16GB RAM",
    unit: "pcs" as Unit,
    categoryId: 54,
  },
  {
    id: 26,
    name: "Smartphone",
    description: "Latest model smartphone",
    unit: "pcs" as Unit,
    categoryId: 54,
  },
  {
    id: 27,
    name: "Sofa",
    description: "Comfortable three-seater sofa",
    unit: "pcs" as Unit,
    categoryId: 53,
  },
  {
    id: 28,
    name: "Coca Cola",
    description: "500ml bottle of Coca Cola",
    unit: "pcs" as Unit,
    categoryId: 55,
  },
  {
    id: 29,
    name: "Coffee",
    description: "Instant coffee 200g",
    unit: "pcs" as Unit,
    categoryId: 55,
  },
  {
    id: 30,
    name: "Notebook",
    description: "A4 size notebook",
    unit: "pcs" as Unit,
    categoryId: 56,
  },
  {
    id: 31,
    name: "Pen",
    description: "Blue ink ballpoint pen",
    unit: "pcs" as Unit,
    categoryId: 56,
  },
  {
    id: 32,
    name: "T-shirt",
    description: "Cotton t-shirt, size M",
    unit: "pcs" as Unit,
    categoryId: 57,
  },
  {
    id: 33,
    name: "Jeans",
    description: "Denim jeans, size 32",
    unit: "pcs" as Unit,
    categoryId: 57,
  },
];

export const shelves: Shelf[] = [
  {
    id: 31,
    row: 1,
    position: 1,
    level: 1,
    capacity: 100,
  },
  {
    id: 32,
    row: 1,
    position: 2,
    level: 1,
    capacity: 100,
  },
  {
    id: 33,
    row: 1,
    position: 1,
    level: 2,
    capacity: 100,
  },
  {
    id: 34,
    row: 1,
    position: 2,
    level: 2,
    capacity: 100,
  },
  {
    id: 35,
    row: 2,
    position: 1,
    level: 1,
    capacity: 100,
  },
  {
    id: 36,
    row: 2,
    position: 2,
    level: 1,
    capacity: 100,
  },
  {
    id: 37,
    row: 2,
    position: 1,
    level: 2,
    capacity: 100,
  },
  {
    id: 38,
    row: 2,
    position: 2,
    level: 2,
    capacity: 100,
  },
  {
    id: 39,
    row: 3,
    position: 1,
    level: 1,
    capacity: 100,
  },
  {
    id: 40,
    row: 3,
    position: 2,
    level: 1,
    capacity: 100,
  },
  {
    id: 41,
    row: 3,
    position: 1,
    level: 2,
    capacity: 80,
  },
  {
    id: 42,
    row: 3,
    position: 2,
    level: 2,
    capacity: 80,
  },
  {
    id: 43,
    row: 4,
    position: 1,
    level: 1,
    capacity: 80,
  },
  {
    id: 44,
    row: 4,
    position: 2,
    level: 1,
    capacity: 80,
  },
  {
    id: 45,
    row: 4,
    position: 1,
    level: 2,
    capacity: 80,
  },
  {
    id: 46,
    row: 4,
    position: 2,
    level: 2,
    capacity: 80,
  },
  {
    id: 47,
    row: 5,
    position: 1,
    level: 1,
    capacity: 80,
  },
  {
    id: 48,
    row: 5,
    position: 2,
    level: 1,
    capacity: 80,
  },
];

export const items: Item[] = [
  {
    id: 101,
    goodId: 21,
    shelfId: 31,
    pricePerUnit: 1.5,
    quantity: 40,
    storageDate: new Date("2024-06-24"),
    stockedById: 61,
  },
  {
    id: 102,
    goodId: 22,
    shelfId: 32,
    pricePerUnit: 0.9,
    quantity: 20,
    storageDate: new Date("2024-06-23"),
    stockedById: 61,
  },
  {
    id: 103,
    goodId: 23,
    shelfId: 33,
    pricePerUnit: 2.5,
    quantity: 13,
    storageDate: new Date("2023-03-20"),
    stockedById: 61,
  },
  {
    id: 104,
    goodId: 24,
    shelfId: 34,
    pricePerUnit: 150.0,
    quantity: 1,
    storageDate: new Date("2023-04-05"),
    stockedById: 61,
  },
  {
    id: 105,
    goodId: 21,
    shelfId: 35,
    pricePerUnit: 1.5,
    quantity: 10,
    storageDate: new Date("2024-06-18"),
    stockedById: 61,
  },
  {
    id: 106,
    goodId: 22,
    shelfId: 35,
    pricePerUnit: 0.9,
    quantity: 80,
    storageDate: new Date("2024-06-23"),
    stockedById: 62,
  },
  {
    id: 107,
    goodId: 23,
    shelfId: 34,
    pricePerUnit: 2.5,
    quantity: 10,
    storageDate: new Date("2023-03-25"),
    stockedById: 62,
  },
  {
    id: 108,
    goodId: 24,
    shelfId: 36,
    pricePerUnit: 150.0,
    quantity: 6,
    storageDate: new Date("2023-04-10"),
    stockedById: 62,
  },
  {
    id: 109,
    goodId: 21,
    shelfId: 35,
    pricePerUnit: 1.5,
    quantity: 10,
    storageDate: new Date("2024-06-25"),
    stockedById: 62,
  },
  {
    id: 110,
    goodId: 22,
    shelfId: 37,
    pricePerUnit: 0.9,
    quantity: 60,
    storageDate: new Date("2024-06-19"),
    stockedById: 62,
  },
  {
    id: 111,
    goodId: 23,
    shelfId: 38,
    pricePerUnit: 2.5,
    quantity: 90,
    storageDate: new Date("2023-03-30"),
    stockedById: 62,
  },
  {
    id: 112,
    goodId: 24,
    shelfId: 37,
    pricePerUnit: 150.0,
    quantity: 4,
    storageDate: new Date("2023-04-15"),
    stockedById: 62,
  },
  {
    id: 113,
    goodId: 25,
    shelfId: 39,
    pricePerUnit: 1000.0,
    quantity: 15,
    storageDate: new Date("2023-05-01"),
    stockedById: 62,
  },
  {
    id: 114,
    goodId: 26,
    shelfId: 39,
    pricePerUnit: 800.0,
    quantity: 20,
    storageDate: new Date("2023-05-10"),
    stockedById: 62,
  },
  {
    id: 115,
    goodId: 27,
    shelfId: 46,
    pricePerUnit: 300.0,
    quantity: 10,
    storageDate: new Date("2023-05-20"),
    stockedById: 62,
  },
  {
    id: 116,
    goodId: 28,
    shelfId: 40,
    pricePerUnit: 1.0,
    quantity: 20,
    storageDate: new Date("2023-06-01"),
    stockedById: 61,
  },
  {
    id: 117,
    goodId: 29,
    shelfId: 41,
    pricePerUnit: 5.0,
    quantity: 30,
    storageDate: new Date("2023-06-10"),
    stockedById: 61,
  },
  {
    id: 118,
    goodId: 32,
    shelfId: 47,
    pricePerUnit: 2.0,
    quantity: 30,
    storageDate: new Date("2023-06-20"),
    stockedById: 61,
  },
  {
    id: 119,
    goodId: 31,
    shelfId: 42,
    pricePerUnit: 0.5,
    quantity: 5,
    storageDate: new Date("2023-07-01"),
    stockedById: 61,
  },
  {
    id: 120,
    goodId: 32,
    shelfId: 42,
    pricePerUnit: 10.0,
    quantity: 10,
    storageDate: new Date("2023-07-10"),
    stockedById: 61,
  },
  {
    id: 121,
    goodId: 33,
    shelfId: 42,
    pricePerUnit: 20.0,
    quantity: 4,
    storageDate: new Date("2023-07-20"),
    stockedById: 61,
  },
  {
    id: 122,
    goodId: 25,
    shelfId: 42,
    pricePerUnit: 1000.0,
    quantity: 1,
    storageDate: new Date("2023-08-01"),
    stockedById: 61,
  },
  {
    id: 123,
    goodId: 26,
    shelfId: 43,
    pricePerUnit: 800.0,
    quantity: 25,
    storageDate: new Date("2023-08-10"),
    stockedById: 62,
  },
  {
    id: 124,
    goodId: 27,
    shelfId: 43,
    pricePerUnit: 300.0,
    quantity: 2,
    storageDate: new Date("2023-08-20"),
    stockedById: 62,
  },
  {
    id: 125,
    goodId: 28,
    shelfId: 43,
    pricePerUnit: 1.0,
    quantity: 5,
    storageDate: new Date("2023-09-01"),
    stockedById: 62,
  },
  {
    id: 126,
    goodId: 29,
    shelfId: 44,
    pricePerUnit: 5.0,
    quantity: 32,
    storageDate: new Date("2023-09-10"),
    stockedById: 62,
  },
  {
    id: 127,
    goodId: 30,
    shelfId: 44,
    pricePerUnit: 2.0,
    quantity: 10,
    storageDate: new Date("2023-09-20"),
    stockedById: 62,
  },
  {
    id: 128,
    goodId: 31,
    shelfId: 44,
    pricePerUnit: 0.5,
    quantity: 10,
    storageDate: new Date("2023-10-01"),
    stockedById: 62,
  },
  {
    id: 129,
    goodId: 32,
    shelfId: 45,
    pricePerUnit: 10.0,
    quantity: 10,
    storageDate: new Date("2023-10-10"),
    stockedById: 62,
  },
  {
    id: 130,
    goodId: 33,
    shelfId: 45,
    pricePerUnit: 20.0,
    quantity: 70,
    storageDate: new Date("2023-10-20"),
    stockedById: 62,
  },
];