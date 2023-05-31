import { atom } from "jotai";

type ModalStatus = boolean;
const modalStatus = atom<ModalStatus>(false);
export default modalStatus;
