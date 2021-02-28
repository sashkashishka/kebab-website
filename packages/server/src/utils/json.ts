export const safeParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error(e, str);
    return undefined;
  }
};
