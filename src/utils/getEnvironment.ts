export const getEnvironment = (): "chrome" | "local" => {
    if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
      return "chrome"; // Running as a Chrome Extension
    }
    return "local"; // Running locally
  };