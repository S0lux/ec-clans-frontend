"use client";

import { TriangleAlert } from "lucide-react";
import { cn } from "../lib";
import { AxiosError } from "axios";

type ErrorDisplayProps = {
  error?: Error | null;
  errorMessage?: string;
  className?: string;
};

export default function ErrorDisplay({
  error,
  errorMessage,
  className,
}: ErrorDisplayProps) {
  let displayText: string = errorMessage ?? "Unknown error";

  if (error instanceof AxiosError) {
    displayText = error.response?.data.message ?? error.message;
  } else if (error) {
    displayText = error.message;
  }

  return (
    <div
      className={cn(
        "flex h-48 w-full flex-col items-center justify-center",
        className,
      )}
    >
      <TriangleAlert size={64} className="text-neutral-400" />
      <span className="mt-2 text-neutral-400">{displayText}</span>
    </div>
  );
}
