import { useEffect, useState } from "react";

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState("chat");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    let lastMatch = mediaQuery.matches;

    const updateLayout = (event) => {
      const matches = event.matches;
      setIsMobile(matches);
      if (!matches) {
        setMobileView("chat");
      } else if (!lastMatch) {
        setMobileView("sidebar");
      }
      lastMatch = matches;
    };

    const isCurrentlyMobile = mediaQuery.matches;
    setIsMobile(isCurrentlyMobile);
    setMobileView(isCurrentlyMobile ? "sidebar" : "chat");
    lastMatch = isCurrentlyMobile;

    mediaQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
    };
  }, []);

  return { isMobile, mobileView, setMobileView };
}
