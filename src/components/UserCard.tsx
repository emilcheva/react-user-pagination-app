import { ComponentPropsWithoutRef } from "react";
import { cn } from "../utils";

type HeaderProps = {
  imgSrc: string;
} & ComponentPropsWithoutRef<"img">;

const UserImage = ({ imgSrc, ...restProps }: HeaderProps) => (
  <img
    className="mx-auto mt-4 h-28 w-28 rounded-full border-4 border-vivid md:h-36 md:w-36"
    src={imgSrc}
    alt="user profile image"
    {...restProps}
  />
);

type UserProfileInfoProps = ComponentPropsWithoutRef<"figure">;

const UserProfileInfo = ({ className, children, ...restProps }: UserProfileInfoProps) => (
  <figcaption className={cn("p-4", className)} {...restProps}>
    {children}
  </figcaption>
);

type UserCardProps = ComponentPropsWithoutRef<"figure">;

const UserCard = ({ className, children, ...restProps }: UserCardProps) => (
  <figure
    className={cn(
      "flex flex-col items-center justify-center gap-3 rounded-xl bg-white p-4 text-center shadow-glow md:min-h-[425px]",
      className,
    )}
    {...restProps}
  >
    {children}
  </figure>
);

UserCard.Image = UserImage;
UserCard.ProfileInfo = UserProfileInfo;

export default UserCard;
