import {
  atom,
  selector
} from 'recoil';

const userState = atom({
  key: 'userState',
  default: {}
});

const triggerState = atom({
  key: 'triggerState',
  default: 0
});

const startTimeState = atom({
  key: 'startTimeState',
  default: ''
});

const endTimeState = atom({
  key: 'endTimeState',
  default: ''
});

const isDroppedState = atom({
  key: 'isDroppedState',
  default: false
});

const suggestionsState = atom({
  key: 'suggestionsState',
  default: []
});

const signaturesState = atom({
  key: 'signaturesState',
  default: []
});

export {
  userState,
  triggerState,
  startTimeState,
  endTimeState,
  isDroppedState,
  suggestionsState,
  signaturesState
};
