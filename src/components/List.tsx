import { ComponentPropsWithoutRef, createContext, useContext } from "react";
import { ReactNode } from "react";
import { cn } from "../utils";

type ListContextType = {
  bgColor: string;
};

const ListContext = createContext<ListContextType | undefined>(undefined);

type ListProps = {
  className?: string;
  itemsBgColor: string;
  children: ReactNode;
};

const List = ({ className, itemsBgColor, children }: ListProps) => {
  return (
    <ListContext.Provider value={{ bgColor: itemsBgColor }}>
      <ul className={cn("flex list-none flex-col gap-2", className)}>{children}</ul>
    </ListContext.Provider>
  );
};

type ListItemProps = ComponentPropsWithoutRef<"li">;
const ListItem = ({ children, ...restProps }: ListItemProps) => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("ListItem must be used within a List component");
  }
  const { bgColor } = context;
  return (
    <li className="flex items-center justify-center break-words" style={{ backgroundColor: bgColor }} {...restProps}>
      {children}
    </li>
  );
};

List.Item = ListItem;

export default List;
