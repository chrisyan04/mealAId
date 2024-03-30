import React from "react";
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
  Avatar,
  User,
} from "@nextui-org/react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform"
                  description="@tonyreichert"
                  name="Tony Reichert"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">@tonyreichert</p>
                </DropdownItem>
                <DropdownItem key="settings">Saved Meals</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
