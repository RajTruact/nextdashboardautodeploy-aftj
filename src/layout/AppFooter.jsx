"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AppFooter = () => {
  const pathname = usePathname();
  const roles = pathname.split("/")[1];

  return (
    <footer className="sticky bottom-0 w-full bg-white z-50 text-[#344054]  dark:text-[#cbcfd4] dark:bg-[#16181D] h-[40px] border-t-2 dark:border-gray-800 border-white">
      <div className="flex justify-center items-center h-full gap-3 sm:gap-20">
        <p className="text-center text-[13px]">
          © 2025 TruAct | All Rights Reserved
        </p>
        <Link
          href={`/${roles}/terms`}
          className="text-center text-[13px] hover:underline transition-all"
        >
          Terms
        </Link>
        <Link
          href={`/${roles}/privacy`}
          className="text-center text-[13px] hover:underline transition-all"
        >
          Privacy
        </Link>

        <Link
          href={`/${roles}/support`}
          className="text-center text-[13px] hover:underline transition-all"
        >
          Support
        </Link>
        <p className="text-center text-[13px]">v1.0.0</p>
      </div>
    </footer>
  );
};

export default AppFooter;
