import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { ItemSelector } from "@/components/search-goods/ItemSelector.tsx";
import * as React from "react";
import { useState } from "react";
import { ItemInfo } from "@/components/common/ItemInfo.tsx";

import { Shelf } from "@/models/shelf/shelf.ts";

export interface ShelfViewProps {
  shelf: Shelf;
  items: { id: number }[];
}

export const ShelfView = ({ shelf, items }: ShelfViewProps) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = React.useState<number | null>(null);

  const totalItems = items.length;

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => {
        setOpen(op);
        setSelectedItem(null);
      }}
    >
      <DialogTrigger asChild>
        <div className="b-gray-200 border-[1px] flex flex-col bg-amber-500 hover:bg-amber-300 duration-150 justify-between items-center rounded-lg overflow-clip hover:cursor-pointer">
          <div className="py-4 flex flex-col items-center text-center p-4 font-medium">
            #{" "}
            {`${shelf.row?.toString() ?? "xx"}-${
              shelf.position?.toString() ?? "xx"
            }-${shelf.level?.toString() ?? "xx"}`}
          </div>
          <div className="flex-col bg-white w-full">
            <div className="flex justify-between p-4">
              <div>Row: {shelf.row}</div>
              <div>Column: {shelf.position}</div>
              <div>Level: {shelf.level}</div>
            </div>
            <div className="flex justify-between p-4">
              <div>
                Capacity: {shelf.freeCapacity}/{shelf.capacity}
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full md:w-1/2 max-w-full overflow-y-scroll max-h-dvh">
        <DialogHeader className="flex flex-col w-full gap-2 pb-4 mb-4 border-b-[1px] border-b-gray-200">
          <div className="h-full flex flex-col gap-2">
            <DialogTitle>
              Shelf#
              {`${shelf.row ?? "xx"}-${shelf.position ?? "xx"}-${shelf.level ?? "xx"}`}
            </DialogTitle>
            <div className="break-all text-sm text-gray-400">
              Row: {shelf.row} Column: {shelf.position} Level: {shelf.level}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 font-medium">
            <div className="px-2 py-1 bg-gray-100 rounded-md">
              Capacity: {shelf.freeCapacity}/{shelf.capacity}
            </div>
            <div className="px-2 py-1 bg-gray-100 rounded-md">
              Amount of items: {totalItems}
            </div>
          </div>
        </DialogHeader>
        <ItemSelector
          itemIds={items.map((item) => item.id)}
          setItemId={setSelectedItem}
        />
        {items
          .filter((item) => item.id === selectedItem)
          .map((item, key) => (
            <ItemInfo key={key} itemId={item.id} />
          ))}
      </DialogContent>
    </Dialog>
  );
};
