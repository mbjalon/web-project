import { useSearchParams } from "react-router-dom";
import { useGetItem } from "@/hooks/useItems.ts";

const ItemPage = () => {
  const [searchParams] = useSearchParams();
  const { data: item, error } = useGetItem(Number(searchParams.get("itemId")));

  return (
    <div className="w-full mt-24 items-center flex flex-col">
      {!error ? (
        <>
          <h1>{item?.data.id}</h1>
          {`${item?.data.Shelf.row}-${item?.data.Shelf.position}-${item?.data.Shelf.level}`}
          {item?.data.goodId}
          {item?.data.quantity}
          {item?.data.pricePerUnit}
          {item?.data.storageDate}
        </>
      ) : (
        <div>Error: {error.message}</div>
      )}
    </div>
  );
};

export default ItemPage;
