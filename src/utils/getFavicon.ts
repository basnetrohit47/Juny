export const getFavicon =  (url:string,size:"sm"|"md"|"lg"="md"): string => {
    const iconSize = {
        "sm":128,
        "md":128,
        "lg":128
    }
    const urlObject = new URL(url ?? "");
    const hostname = urlObject.hostname;
    const parts = hostname.split(".");
    const rootDomain = parts.slice(-2).join("."); // Extract root domain (e.g., "medium.com")

    return (
      `https://www.google.com/s2/favicons?domain=${rootDomain}&sz=${iconSize[size]}`
    );
  };
 
  