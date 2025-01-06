import { getEnvironment } from "./getEnvironment";

// Set a key-value pair in storage (handles any type of data)
export const setStoreValue = async <T>(key: string, value: T): Promise<void> => {
  const environment = getEnvironment();

  try {
    const serializedValue = JSON.stringify(value); // Serialize value to store any data type

    if (environment === "chrome") {
      await new Promise<void>((resolve, reject) => {
        chrome.storage.local.set({ [key]: serializedValue }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      });
    } else {
      localStorage.setItem(key, serializedValue);
    }
  } catch (err) {
    console.error("Failed to set store value:", err);
    throw err;
  }
};

// Get a value by key from storage (returns the correct type based on the generic)
export const getStoreValue = async <T>(key: string): Promise<T | null> => {
  const environment = getEnvironment();

  try {
    if (environment === "chrome") {
      const result = await new Promise<string | null>((resolve, reject) => {
        chrome.storage.local.get(key, (data) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(data[key] || null);
          }
        });
      });

      return result ? (JSON.parse(result) as T) : null; // Deserialize and cast to generic type
    } else {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null; // Deserialize and cast to generic type
    }
  } catch (err) {
    console.error("Failed to get store value:", err);
    throw err;
  }
};

export const removeStoreValue = (key:string) => {
    const environment = getEnvironment();

    return new Promise((resolve, reject) => {
      if (environment === "chrome") {
        // If in a Chrome Extension environment, use chrome.storage.local
        chrome.storage.local.remove(key, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);  // Handle errors in chrome.storage.local
          } else {
            resolve(key);  // Resolve once the item is removed
          }
        });
      } else {
        // If in a regular browser environment, use localStorage
        try {
          localStorage.removeItem(key);  // Remove the item from localStorage
          resolve(key);  // Resolve once the item is removed
        } catch (error) {
          reject(error);  // Handle any error that occurs during localStorage access
        }
      }
    });
  };

  export const getAllStoreKeys = ():Promise<string[]> => {
    const environment = getEnvironment();
    return new Promise((resolve, reject) => {
      if (environment === "chrome") {
        chrome.storage.local.get(null, (items) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(Object.keys(items));  // Return all keys from chrome.storage.local
          }
        });
      } else {
        // If in a regular browser environment, use localStorage
        try {
          const keys:string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            keys.push(localStorage.key(i)||'');  
          }
          resolve(keys);
        } catch (error) {
          reject(error);  // Handle any error that occurs during localStorage access
        }
      }
    });
  };
  
