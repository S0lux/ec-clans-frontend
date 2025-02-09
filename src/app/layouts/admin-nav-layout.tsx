"use client";

import { NavButton, ResponsiveContainer } from "@/src/shared/ui";
import { usePathname } from "next/navigation";

export default function AdminNavigationHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <div className="flex h-full w-full flex-col overflow-y-scroll">
      <ResponsiveContainer className="sticky left-0 top-0 flex min-h-10 w-full flex-row bg-neutral-900">
        <NavButton text={"CLANS"} active={pathName!.includes("/admin/clans")} />
        <NavButton text={"BANS"} active={pathName!.includes("/admin/bans")} />
      </ResponsiveContainer>
      {children}
    </div>
  );
}
