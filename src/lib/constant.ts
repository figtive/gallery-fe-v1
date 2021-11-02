export enum ClassType {
	PPL = 'ppl',
	Propensi = 'propensi'
}

export const ClassTypeLabel: { [key in ClassType]: string } = {
	[ClassType.PPL]: 'PPL',
	[ClassType.Propensi]: 'Propensi'
};

export enum FieldType {
	Semua = '',
	Akademik = 'akademik',
	Sosial = 'sosial',
	Pemerintahan = 'pemerintahan',
	IdeBaru = 'idebaru',
	Startup = 'startup'
}

export const FieldTypeLabel: { [key in FieldType]: string } = {
	[FieldType.Semua]: 'Semua',
	[FieldType.Akademik]: 'Akademik',
	[FieldType.Sosial]: 'Sosial',
	[FieldType.Pemerintahan]: 'Pemerintahan',
	[FieldType.IdeBaru]: 'Ide Baru',
	[FieldType.Startup]: 'Startup / Industri IT'
};
