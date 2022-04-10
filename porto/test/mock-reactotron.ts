declare const tron; // eslint-disable-line @typescript-eslint/no-unused-vars

jest.mock('reactotron-react-native', () => {
  return {
    configure: (): void => undefined,
    use: (): void => undefined,
    useReactNative: (): void => undefined,
    onCustomCommand: (): void => undefined,
  };
});
