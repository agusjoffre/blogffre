import { currentUser } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import Nav from "./nav";
import Link from "next/link";

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="px-5 sm:px-20 h-24 w-full bg-background shadow-sm shadow-muted flex items-center justify-between">
      <div className="flex justify-center gap-6 items-center w-full">
        <Link href={"/"}>
          <h1 className="hidden sm:flex sm:text-2xl md:text-3xl font-bold font-sans">
            Un Blog de Historia
          </h1>
          <h1 className="flex sm:hidden font-bold font-sans text-xl">UBH</h1>
        </Link>
        {user ? <Button className="w-fit">Crear post</Button> : null}
      </div>
      <Nav />
    </header>
  );
};

export default Header;
