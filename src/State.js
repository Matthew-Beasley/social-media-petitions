import {
  atom,
  selector
} from 'recoil';

const userState = atom({
  key: 'userState',
  default: {}
});

const triggerState = atom({//[trigger, setTrigger] = useState(0);
  key: 'triggerState',
  default: 0
});

export { userState , triggerState };
