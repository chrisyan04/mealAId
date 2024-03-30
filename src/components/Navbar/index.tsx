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
  User,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import logo from "@/public/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useUser();

  const menuItems = [{ label: "Home", url: "/" }];

  return (
    <div className="flex items-center justify-center mt-6 sticky">
      <NextUINavbar
        onMenuOpenChange={setIsMenuOpen}
        className="border-2 border-blue-700/50 rounded-full w-9/12 bg-blue-100"
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">
              <Image
                src={logo}
                alt="logo"
                height={70}
                width={70}
                className="rounded-lg border-1 border-blue-300"
              />
            </p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="center">
          <NavbarItem>
            <Link href="/">
              <Button className="bg-blue-700/80 text-white text-lg">
                Home
              </Button>
            </Link>
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
                  <DropdownItem key="settings">
                    <Link href="/savedMeals">Saved Meals</Link>
                  </DropdownItem>
                  <DropdownItem key="logout">
                    <Link href="/api/auth/logout">
                      <Button color="danger">Log Out</Button>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link href="/api/auth/login">
                <Button className="dark">Sign In</Button>
              </Link>
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
