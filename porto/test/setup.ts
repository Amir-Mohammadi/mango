// we always make sure 'react-native' gets included first
import 'react-native';
import './mock-async-storage';
// libraries to mock
import './mock-react-native-image';
import './mock-reactotron';

jest.useFakeTimers();

declare global {
  let __TEST__;
}
