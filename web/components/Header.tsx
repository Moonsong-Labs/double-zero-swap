"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RainbowKitCustomConnectButton } from "./RainbowKitCustomConnectButton";
import useCpamm from "~~/hooks/use-cpamm";

type HeaderMenuLink = {
  label: string;
  href: string;
  matches: string[];
};

export const Header = () => {
  const { addLiquidityAllowed } = useCpamm();

  return (
    <div className="flex h-[74px] justify-between z-20 w-full p-4">
      <Link href="/" passHref className="hidden md:flex items-center gap-2 ml-4 mr-6 shrink-0">
        <div className="flex relative w-10 h-10">
          <Image alt="Double Zero Swap logo" className="cursor-pointer" fill src="/logo-dark.svg" />
        </div>
        <span className="text-xl font-normal">Double Zero Swap</span>
      </Link>
      <nav className="hidden md:flex lg:flex-nowrap px-1 gap-2">
        <HeaderMenuLink label="Swap" href="/" matches={["/"]} />
        {addLiquidityAllowed && <HeaderMenuLink label="Pool" href="/pool" matches={["/pool", "/pool/add"]} />}
      </nav>
      <div className="mr-4">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};

function HeaderMenuLink({ label, href, matches }: HeaderMenuLink) {
  const pathname = usePathname();
  const isActive = matches.some(match => pathname == match);

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "bg-zinc-700 shadow-md" : ""
      } hover:bg-zinc-700 hover:shadow-md py-1.5 px-3 text-sm rounded-md h-fit`}
    >
      <span>{label}</span>
    </Link>
  );
}
