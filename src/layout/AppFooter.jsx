"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AppFooter = () => {
  const pathname = usePathname();
  const roles = pathname.split("/")[1];
  return (
    <footer className="sticky bottom-0 w-full bg-white z-50 text-gray-700 dark:text-white dark:bg-[#16181D] h-[40px] border-t-2 dark:border-gray-800 border-white">
      <div className="flex justify-center items-center gap-1 mt-2.5">
        <p className="text-center flex justify-center items-center h-full text-[13px]">
          © 2025 TruAct. All Rights Reserved.
        </p>
        <Link
          href={`/${roles}/support`}
          className="text-center flex justify-center items-center h-full text-[13px]"
        >
          Support
        </Link>
        <p className="text-center flex justify-center items-center h-full text-[13px]">
          1.7
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
