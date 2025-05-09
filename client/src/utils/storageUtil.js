const StorageType = {
    SESSION: "SESSION",
    LOCAL: "LOCAL",
  };
  
  const getStorage = (type) => {
    return type === StorageType.SESSION ? window.sessionStorage : window.localStorage;
  };
  
  const setItem = (type) => (key, value) => {
    getStorage(type).setItem(key, JSON.stringify(value));
  };
  
  const getItem = (type) => (key, defaultVal) => {
    const val = getStorage(type).getItem(key);
    if (!val || val === "undefined") return defaultVal;
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  };
  
  const removeItem = (type) => (key) => {
    getStorage(type).removeItem(key);
  };
  
  const Storage = {
    session: {
      get: getItem(StorageType.SESSION),
      set: setItem(StorageType.SESSION),
      remove: removeItem(StorageType.SESSION),
    },
    local: {
      get: getItem(StorageType.LOCAL),
      set: setItem(StorageType.LOCAL),
      remove: removeItem(StorageType.LOCAL),
    },
  };
  
  export { Storage, StorageType };
  