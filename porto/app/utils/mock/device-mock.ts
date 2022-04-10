import { DeviceProfile } from '../../services/api';
import { roomsMock } from './room-mock';
export const devicesMock = [
  {
    id: 1,
    name: 'Mi Smart Plug',
    room: roomsMock[1],
    status: 'offline',
    image:
      'http://192.168.0.6/parlar/porto/uploads/31022ad784a99ba1eaf09d57e1c005e9/shopping.png',
    isFav: false,
  },
  {
    id: 2,
    name: 'Mi Smart Plug_1',
    room: roomsMock[1],
    status: 'offline',
    image:
      'http://192.168.0.6/parlar/porto/uploads/31022ad784a99ba1eaf09d57e1c005e9/shopping.png',
    isFav: true,
  },
];

export const deviceProfileMock: Array<DeviceProfile> = [
  {
    id: 1,
    profileName: 'دستگاه عمومی',
    profileRegex: '^elevia-.*$',
    profileImage: '../../assets/fan.png',
  },
];
