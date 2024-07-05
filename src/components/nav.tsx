import Link from "next/link";
import SearchMain from "./searchmain";
import { Button } from "./ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

type Links = {
  name: string;
  href: string;
};

const links: Links[] = [
  {
    name: "All posts",
    href: "/posts",
  },
  {
    href: "/about",
    name: "About us",
  },
];

const Nav = async () => {
  const user = await currentUser();

  return (
    <nav className="w-full flex gap-1 sm:gap-2 md:gap-4 lg:gap-8 xl:gap-12 items-center justify-center">
      <SearchMain />
      {links.map((link) => {
        return (
          <Link href={link.href} key={link.name}>
            {link.name}
          </Link>
        );
      })}

      <div className="flex gap-2">
        {user ? (
          <UserButton />
        ) : (
          <Link href={"/login"}>
            <Button variant={"accent"} className="w-fit">
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
