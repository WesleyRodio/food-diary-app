import { Dialog as DialogPrimitive } from "radix-ui";
import type { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export type DialogProps = { children: ReactNode } & DialogPrimitive.DialogProps;
function Dialog({ children, ...props }: DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={twMerge(
        (className =
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/10 px-2 py-8 backdrop-blur-xs transition-all duration-300"),
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <DialogPortal>
      <DialogOverlay>
        <DialogPrimitive.Content
          className={twMerge(
            "bg-foreground data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 shadow-shadow pointer-events-auto relative min-h-34 w-dvw max-w-105 rounded-3xl p-5 shadow outline-0 transition-all duration-300",
            className,
          )}
        >
          {children}
          <DialogPrimitive.Close className="focus-visible:ring-border absolute top-4 right-4 cursor-pointer rounded-lg p-2 ring-2 ring-transparent outline-0">
            <IoClose className="text-muted/60 text-xl" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
}

function DialogFooter({
  className,
  ...props
}: { className?: string } & React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
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
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-Close" {...props} />;
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
};
