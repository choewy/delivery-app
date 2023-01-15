export const FileDBTables = ['session', 'user', 'order'] as const;
export type FileDBTable = typeof FileDBTables[number];
