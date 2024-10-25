import { cn } from "../utils";
import UserCard from "./UserCard";
import List from "./List";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("loading-skeleton animate-pulse rounded-md bg-muted last:flex", className)} {...props} />;
}
export function PaginationSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <UserCard key={i} className="w-full">
          <Skeleton className="h-28 w-28 rounded-full md:h-32 md:w-32" />
          <UserCard.ProfileInfo>
            <h2 className="mb-4">
              <Skeleton className="h-8 w-56" />
            </h2>
            <List itemsBgColor="#fff">
              {Array.from({ length: 4 }).map((_, i) => (
                <List.Item key={i} className="w-full">
                  <Skeleton className="h-5 w-auto" />
                </List.Item>
              ))}
            </List>
          </UserCard.ProfileInfo>
        </UserCard>
      ))}
    </>
  );
}
