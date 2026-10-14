"use client";

import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";
import { GA_ID, GTM_ID } from "@/lib/tagIds";

export function trackEvent(
  event: string,
  params: Record<string, string> = {},
) {
  if (GA_ID) {
    sendGAEvent("event", event, params);
    return;
  }

  if (GTM_ID) {
    sendGTMEvent({ event, ...params });
  }
}

export function trackPageView(pagePath: string) {
  trackEvent("page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}
