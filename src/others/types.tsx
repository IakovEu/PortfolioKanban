import { ReactNode } from 'react';

// Описываю структуру лежащую в LS
interface Issues {
	id?: number | string;
	name?: string | null;
	description?: string;
}

export interface LocalS {
	title: string;
	issues: Issues[];
}

//Описываю пропсы у бэклога
export interface BacklogProps {
	point: ReactNode;
}

// Описываю пропсы у тасков
export interface TaskProps {
	point: ReactNode;
	variants: ReactNode;
	title: string;
	disabled?: boolean;
	visibility: boolean;
	setVisibiblity: () => void;
}

//Описываю пропсы у футера
export interface FooterProps {
	active: number;
	finished: number;
}
