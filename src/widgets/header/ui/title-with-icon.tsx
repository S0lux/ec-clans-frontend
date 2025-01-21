import { cn } from "@/src/shared/lib";
import { ReactNode } from "react";

export const TitleWithIcon = ({
  title,
  icon,
  className,
}: {
  title: string;
  icon: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {icon}
      <div className="text-xl font-semibold">{title}</div>
    </div>
  );
};
