export const getDomainName=(url:string)=>{
    const parsedUrl = new URL(url); // Parse the URL
    const hostname = parsedUrl.hostname; // Get the hostname (e.g., "www.behance.net")
    const parts = hostname.split('.'); // Split by dots
    
    // Return the second-to-last part of the hostname, assuming standard domain structure
    return parts.length > 2 ? parts[1] : parts[0];
  }