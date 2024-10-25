import { ComponentPropsWithoutRef } from "react";
import { cn } from "../utils";

type PaginationButtonProps = ComponentPropsWithoutRef<"button">;

const PaginationButton = ({ className, children, ...restProps }: PaginationButtonProps) => (
  <button
    className={cn(
      "fixed top-1/2 rounded-full bg-vivid/60 p-4 shadow-lg hover:bg-vivid disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white md:static md:bg-white",
      className,
    )}
    {...restProps}
  >
    {children}
  </button>
);

type PaginationContentProps = ComponentPropsWithoutRef<"div">;

const PaginationContent = ({ className, children, ...restProps }: PaginationContentProps) => (
  <div className={cn("grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3", className)} {...restProps}>
    {children}
  </div>
);

type PaginationProps = ComponentPropsWithoutRef<"div">;

const Pagination = ({ className, children, ...restProps }: PaginationProps) => (
  <div className={cn("flex items-center gap-5 p-5 md:p-0", className)} {...restProps}>
    {children}
  </div>
);

Pagination.Button = PaginationButton;
Pagination.Content = PaginationContent;

export default Pagination;
