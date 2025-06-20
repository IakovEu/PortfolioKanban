import { createContext } from 'react';
import { LocalS } from './types';

type descr = {
	dat: LocalS[] | null;
	setDat: (param: LocalS[] | null) => void;

};

const pattern: descr = {
	dat: null,
	setDat: () => {},
};

export const MyContext = createContext<descr>(pattern);
