/**
 * wait for a period of time (use with await)
 * @param timeout time to sleep in ms
 */
export const sleep = (timeout: number): Promise<void> => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, timeout),
  );
};
