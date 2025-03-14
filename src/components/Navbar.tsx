"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
  
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home">
            
          </MenuItem>
        </Link>
        <MenuItem setActive={setActive} active={active} item="Appointments">
          <div className="flex flex-col space-y-4 text-sm ">
            <HoveredLink href="/appointments">Appointments</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Patients">
          <div className="flex flex-col space-y-4 text-sm ">
            <HoveredLink href="/patient-details">Details</HoveredLink>
            <HoveredLink href="/patient-diagonisis">Diagonisis</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;
