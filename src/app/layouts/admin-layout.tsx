"use client";

import { NavButton, ResponsiveContainer } from "@/src/shared/ui";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <div className="flex w-full flex-col">
      <ResponsiveContainer className="flex h-10 w-full flex-row bg-neutral-900">
        <NavButton text={"CLANS"} active={pathName!.includes("/admin/clans")} />
        <NavButton text={"BANS"} active={pathName!.includes("/admin/bans")} />
      </ResponsiveContainer>
      {children}
    </div>
  );
}
