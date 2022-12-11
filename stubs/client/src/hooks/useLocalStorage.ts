const useLocalStorage = (KEY: string) => {

  const setLocalStorage = (data: any) => {
    localStorage.setItem(KEY, JSON.stringify(data));
    return data;
  };

  const getLocalStorage = () => {
    const value = localStorage.getItem(KEY);
    if (!value) return null;

    return JSON.parse(value);
  };

  const clearLocalStorage = () => localStorage.setItem(KEY, '');

  return {
    setLocalStorage,
    getLocalStorage,
    clearLocalStorage,
  };
};

export default useLocalStorage;
