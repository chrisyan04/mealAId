import React, { use } from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useUser();

  const menuItems = [
    { label: "Home", url: "#" },
    { label: "Product", url: "#product" },
  ];

  return (
    <div>
      <NextUINavbar
        onMenuOpenChange={setIsMenuOpen}
        className="border-2 border-blue-500"
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">TBD</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="center">
          <NavbarItem>
            <Link href="#">Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#product">Product</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {user ? (
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: user.picture || undefined,
                    }}
                    className="transition-transform"
                    description={`@${user.nickname}`}
                    name={user.name}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">@{user.nickname}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">Saved Meals</DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    <Link href="/api/auth/logout">Log Out</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link href="/api/auth/login">Sign In</Link>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link href={item.url}>{item.label}</Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
}