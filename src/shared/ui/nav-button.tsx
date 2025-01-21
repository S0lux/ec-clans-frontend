import Link from "next/link";
import { Button } from "./components/shadcn/button";
import { cn } from "../lib";

export const NavButton = ({
  text,
  active,
}: {
  text: string;
  active: boolean;
}) => {
  return (
    <Link href={`/admin/${text.toLowerCase()}`} prefetch={true}>
      <Button
        className={cn(
          "text-md h-full rounded-none text-foreground/50 shadow-none hover:bg-foreground/10",
          active &&
            "border-b-2 border-b-yellow-600 font-semibold text-foreground",
        )}
      >
        {text}
      </Button>
    </Link>
  );
};
