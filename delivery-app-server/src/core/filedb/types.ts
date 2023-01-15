export const FileDBTables = ['user', 'order'] as const;
export type FileDBTable = typeof FileDBTables[number];
