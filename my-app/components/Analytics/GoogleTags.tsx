import { Suspense } from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { GA_ID, GTM_ID } from "@/lib/tagIds";
import PageView from "./PageView";

export default function GoogleTags() {
  const gtmId = GTM_ID;
  const gaId = GA_ID;

  if (!gtmId && !gaId) return null;

  return (
    <>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {gtmId ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      ) : null}
      <Suspense fallback={null}>
        <PageView />
      </Suspense>
    </>
  );
}
