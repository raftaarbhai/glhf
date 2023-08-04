import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function Header() {
  return (
    <footer>
      <div className="container flex flex-wrap items-center justify-center px-4 py-8 mx-auto  lg:justify-between">
        <div className="flex flex-wrap justify-center">
          <ul className="flex items-center space-x-4">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
