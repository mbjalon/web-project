import { Shelf, ShelfCoords } from "@/models/shelf/shelf.ts";

export type PostSingleShelfResponse = {
  data: Shelf;
  message: string;
};

export type PostMultiShelfResponse = {
  data: number;
  message: string;
};

export type GetSingleShelfResponse = PostSingleShelfResponse;

export type GetMultiShelfResponse = {
  data: Shelf[];
  message: string;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
};

export type PutSingleShelfResponse = PostSingleShelfResponse;

export type GetCoordinatesResponse = {
  data: ShelfCoords[];
  message: string;
};
