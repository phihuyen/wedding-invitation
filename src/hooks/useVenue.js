import {useMemo} from "react";
import config from "@/config/config";

/**
 * Custom hook to get the current venue configuration based on URL query parameter
 * @returns {object} The venue configuration object
 */
export function useVenue() {
  const venueConfig = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const venue = urlParams.get("venue");

    // Validate venue parameter and default to "nha-trai" if invalid
    const venueKey =
      venue === "nha-trai" || venue === "nha-gai" ? venue : "nha-trai";

    return config.venues[venueKey] || config.venues["nha-trai"];
  }, []); // Empty dependency array since we only read from window.location.search once

  return venueConfig;
}
