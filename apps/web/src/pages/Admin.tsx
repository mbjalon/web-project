import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";

import { ShelvesTable } from "@/components/admin/shelf/ShelvesTable.tsx";
import { StoreGoodsTable } from "@/components/admin/good/StoreGoodsTable.tsx";
import { UsersTable } from "@/components/admin/user/UsersTable.tsx";
import { CategoriesTable } from "@/components/admin/category/CategoriesTable.tsx";

const SearchShelves = () => {
  return (
    <div className="w-full md:mt-24 mt-12 items-center flex flex-col">
      <Tabs
        defaultValue="account"
        className="flex flex-col items-center w-full"
      >
        <TabsList>
          <TabsTrigger
            value="storeGoods"
            className="text-base px-6 py-2 hover:bg-gray-300 rounded-md"
          >
            Store Goods
          </TabsTrigger>
          <TabsTrigger
            value="shelves"
            className="text-base px-6 py-2 hover:bg-gray-300 rounded-md"
          >
            Shelves
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="text-base px-6 py-2 hover:bg-gray-300 rounded-md"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="text-base px-6 py-2 hover:bg-gray-300 rounded-md"
          >
            Categories
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="storeGoods"
          className="w-full justify-center flex my-0"
        >
          <StoreGoodsTable />
        </TabsContent>
        <TabsContent
          value="shelves"
          className="w-full justify-center flex my-0"
        >
          <ShelvesTable />
        </TabsContent>
        <TabsContent value="users" className="w-full justify-center flex my-0">
          <UsersTable />
        </TabsContent>
        <TabsContent
          value="categories"
          className="w-full justify-center flex my-0"
        >
          <CategoriesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchShelves;
