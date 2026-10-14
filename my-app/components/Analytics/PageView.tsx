"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

let lastPath = "";

export default function PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (pagePath === lastPath) return;

    const isFirstView = lastPath === "";
    lastPath = pagePath;

    if (isFirstView) return;

    trackPageView(pagePath);
  }, [pathname, searchParams]);

  return null;
}
