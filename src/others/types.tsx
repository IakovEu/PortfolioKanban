// Описываю структуру лежащую в LS

interface Issues {
	id?: number;
	name?: string;
	description?: string;
}

export interface LocalS {
	title: string;
	issues: Issues[];
}
