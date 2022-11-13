import { atom } from 'recoil';

export const InitialChatForm = {
    username: '',
    chatroom: 'general'
}

export const chatFormState = atom({
    key: 'chatFormState', // unique ID (with respect to other atoms/selectors)
    default: InitialChatForm, // default value (aka initial value)
});
