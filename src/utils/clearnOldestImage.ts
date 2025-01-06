import { getAllStoreKeys, removeStoreValue } from "./localStorageUtil";

// Clears the oldest image object if there are more than 30
export const clearOldestImage = async () => {
    try {
      // Retrieve all keys from the storage
      const allKeys = await getAllStoreKeys(); // Replace with your store method to get all keys
        console.log("lue",allKeys);
      // Filter keys starting with 'juny-bg-' and sort them by date
      const sortedKeys = allKeys
        .filter((key) => key.startsWith('juny-bg-')) // Only consider 'juny-bg-' keys
        .sort((a, b) => {
          // Extract the date part from the keys
          const dateA = new Date(a.split('juny-bg-')[1]);
          const dateB = new Date(b.split('juny-bg-')[1]);
  
          // Ensure both dates are valid
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            throw new Error("Invalid date format in key");
          }
  
          return dateA.getTime() - dateB.getTime(); // Sort by date (ascending)
        });
  
      // If there are more than 30 keys, remove the oldest one
      if (sortedKeys.length > 1) {
        const oldestKey = sortedKeys[0]; // Get the oldest (smallest date) key
        await removeStoreValue(oldestKey); // Remove the oldest image object from the store
        console.log(`Removed the oldest image: ${oldestKey}`);
      }
    } catch (error) {
      console.error("Error while clearing the oldest image:", error);
    }
  };
  