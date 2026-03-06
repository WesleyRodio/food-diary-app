import { Button } from "@/components/ui/button";
import { Dialog as DialogPrimitive } from "radix-ui";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function Dialog({
  children,
  ...props
}: {
  children: ReactNode;
} & DialogPrimitive.DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

function DialogContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-1000 flex items-center justify-center bg-black/10">
        <DialogPrimitive.Content
          className={twMerge(
            "bg-background shadow-shadow min-h-34 w-dvw max-w-105 rounded-3xl p-5 shadow outline-0",
            className,
          )}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  );
}

function DialogTitle({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <DialogPrimitive.Title
      className={twMerge("text-primary text-lg font-semibold", className)}
    >
      {children}
    </DialogPrimitive.Title>
  );
}

function DialogDescription({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <DialogPrimitive.Description
      className={twMerge("text-muted mb-4 text-xs font-semibold", className)}
    >
      {children}
    </DialogPrimitive.Description>
  );
}

function DialogTrigger({
  className,
  children,
}: {
  className?: string;
} & React.ComponentProps<"button">) {
  return (
    <DialogPrimitive.Trigger asChild>
      <Button className={className}>{children}</Button>
    </DialogPrimitive.Trigger>
  );
}

export { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription };
