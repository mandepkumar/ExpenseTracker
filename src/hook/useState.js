import { defaultState, STATE_NAME } from "../constants/state";

const useStore = () => {
  const saveStore = (state) => {
    localStorage.setItem(STATE_NAME, JSON.stringify(state));
  };

  const getStore = () => {
    if (localStorage.getItem(STATE_NAME) == null) saveStore(defaultState);
    return JSON.parse(localStorage.getItem(STATE_NAME));
  };

  return { getStore };
};

export default useStore;
