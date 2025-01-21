import { ReactNode } from "react";
import { cn } from "../lib/cn";

export const ResponsiveContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("px-6 md:px-12 lg:px-24 xl:px-36 2xl:px-64", className)}>
      {children}
    </div>
  );
};
