import { ShelfCoords } from "@/models/shelf/shelf.ts";

export type PostSingleShelfRequest = ShelfCoords & {
  capacity: string;
};

export type PostMultiShelfRequest = {
  fromRow: string;
  toRow: string;
  fromPosition: string;
  toPosition: string;
  fromLevel: string;
  toLevel: string;
  capacity: string;
};

export type PutSingleShelfRequest = {
  row: string;
  position: string;
  level: string;
  capacity: string;
};

export type GetMultiShelfRequest = {
  row?: string;
  position?: string;
  level?: string;
  freeCapacity?: string;
  pagination?: {
    page?: string;
    pageSize?: string;
  };
};
