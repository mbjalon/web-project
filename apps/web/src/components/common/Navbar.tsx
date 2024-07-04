import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { useCallback, useEffect, useState, useMemo } from "react";
import BaseApi from "@/api/baseApi.ts";

export interface NavigationLinkProps {
  path: string;
  title: string;
  onClick?: () => void;
}

const NavigationLink = ({ path, title, onClick }: NavigationLinkProps) => {
  return (
    <NavLink
      onClick={onClick}
      to={path}
      className={({ isActive }: { isActive: boolean }) =>
        [isActive ? "bg-amber-400" : ""].join(" ") +
        " px-4 py-2 font-medium items-center flex hover:bg-amber-400 rounded-md duration-150 text-center"
      }
    >
      {title}
    </NavLink>
  );
};

export const Navbar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    const trimmedRole = role?.trim() ?? "";
    setUserRole(trimmedRole);
  }, []);

  const onLogout = useCallback(async () => {
    await BaseApi.getSingle("auth/logout");
    navigate("/login");
  }, [navigate]);

  const navigationLinks = useMemo(() => {
    const links = [
      { path: "/log-purchase", title: "Log Purchase" },
      { path: "/search-goods", title: "Search Goods" },
      { path: "/search-shelves", title: "Search Shelves" },
    ];
    if (userRole && userRole[1] === "A") {
      // Adjusted to compare the first letter
      links.push({ path: "/admin", title: "Admin" });
    }
    return links;
  }, [userRole]);

  return (
    <div className="bg-amber-300 justify-between mx-2 rounded-lg items-center flex fixed top-0 left-0 right-0">
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="p-1">
          {navigationLinks.map((link) => (
            <NavigationMenuItem key={link.path}>
              <NavigationLink path={link.path} title={link.title} />
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Sheet open={sheetOpen} onOpenChange={(op) => setSheetOpen(op)}>
        <SheetTrigger
          className="inline md:hidden bg-amber-400 p-2 rounded-md"
          onClick={() => setSheetOpen(true)}
        >
          Menu
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-amber-300 gap-2 flex flex-col pt-12"
        >
          {navigationLinks.map((link) => (
            <NavigationLink
              key={link.path}
              path={link.path}
              title={link.title}
              onClick={() => setSheetOpen(false)}
            />
          ))}
        </SheetContent>
      </Sheet>
      <Button className="md:mr-1" onClick={onLogout}>
        Log out
      </Button>
    </div>
  );
};
