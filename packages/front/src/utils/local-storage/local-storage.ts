interface LocalStorage {
  get: (key: string) => undefined | any;
  set: (key: string, value: any) => void;
  delete: (key: string) => void;
}

export const LS: LocalStorage = ({
  get: (key) => {
    try {
      const json = localStorage.getItem(key) || '';
      return JSON.parse(json);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }

    return undefined;
  },
  delete: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }

    return undefined;
  },
});
