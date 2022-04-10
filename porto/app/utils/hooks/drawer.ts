import { useState } from 'react';

const useFriendStatus = friendID => {
  const [isVisible, setIsVisible] = useState(false);
  return [isVisible, setIsVisible];
};
