import { atom } from "recoil";

export const sideNavState = atom({
  key: 'sideNavState',
  default: localStorage.getItem('sideNavBar') || true,
});

export const sideNavCounter = atom({
  key: 'sideNavCounter',
  default: 0,
});

export const accountNameState = atom({
  key: 'walletAccountName',
  default: localStorage.getItem('walletAccountName') || '',
});