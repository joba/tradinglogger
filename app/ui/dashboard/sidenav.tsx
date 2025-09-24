import Link from "next/link";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import { Button } from "../button";
import NavLinks from "./nav-links";
import Image from "next/image";
import { lusitana } from "../fonts";
import Logo from "../logo";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
        href="/"
      >
        <Logo />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button type="submit">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </Button>
        </form>
      </div>
    </div>
  );
}
