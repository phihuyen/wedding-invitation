import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import config from "@/config/config";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the current venue key from URL query parameter
 * Defaults to "nha-trai" if missing or invalid
 * @returns {string} The venue key ("nha-trai" or "nha-gai")
 */
export function getVenueKey() {
  const urlParams = new URLSearchParams(window.location.search);
  const venue = urlParams.get("venue");

  // Validate venue parameter and default to "nha-trai" if invalid
  if (venue === "nha-trai" || venue === "nha-gai") {
    return venue;
  }

  return "nha-trai"; // Default venue
}

/**
 * Gets the current venue configuration object
 * @returns {object} The venue configuration object
 */
export function getVenueConfig() {
  const venueKey = getVenueKey();
  return config.venues[venueKey] || config.venues["nha-trai"];
}
