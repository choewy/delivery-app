import { OnApplicationBootstrap } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { FileDBTable } from './types';

export class FileDBService<R> implements OnApplicationBootstrap {
  private readonly DB_PATH = './db';

  constructor(private readonly table: FileDBTable) {}

  async onApplicationBootstrap(): Promise<void> {
    this.initializeDB();
    this.initializeIndex();
  }

  private initializeDB() {
    if (!existsSync(this.DB_PATH)) {
      mkdirSync(this.DB_PATH);
    }
  }

  private initializeIndex() {
    const indexTable = [this.DB_PATH, 'index'].join('/');

    if (!existsSync(indexTable)) {
      const initIndex = {
        user: 0,
        order: 0,
      };

      writeFileSync(indexTable, JSON.stringify(initIndex, null, 2));
    }

    return indexTable;
  }

  private initializeTable(table: string) {
    const tablePath = [this.DB_PATH, table].join('/');

    if (!existsSync(tablePath)) {
      writeFileSync(tablePath, JSON.stringify([], null, 2));
    }

    return tablePath;
  }

  private increaseIndex(): number {
    const row = this.parseTable('index');

    writeFileSync(
      this.initializeIndex(),
      JSON.stringify(
        Object.assign(row, { [this.table]: row[this.table] + 1 }),
        null,
        2,
      ),
    );

    return row[this.table];
  }

  private parseTable(table: string): R[] {
    const tablePath = this.initializeTable(table);
    return JSON.parse(readFileSync(tablePath).toString());
  }

  async find(): Promise<R[]> {
    return this.parseTable(this.table);
  }

  async findOne(id: number): Promise<R> {
    return this.parseTable(this.table).find((row) => row['id'] === id) || null;
  }

  async findOrBy(option: Partial<R>): Promise<R> {
    return (
      this.parseTable(this.table).find((row) => {
        return Object.entries(option).reduce<number>((match, [key, value]) => {
          if (row[key] === value) {
            match += 1;
          }

          return match;
        }, 0);
      }) || null
    );
  }

  async findAndBy(option: Partial<R>): Promise<R> {
    return (
      this.parseTable(this.table).find((row) => {
        return Object.entries(option).reduce<number>((match, [key, value]) => {
          if (row[key] !== value) {
            match = 0;
          }

          return match;
        }, 1);
      }) || null
    );
  }

  async insert(row: Partial<R>): Promise<R> {
    row['id'] = this.increaseIndex();

    writeFileSync(
      this.initializeTable(this.table),
      JSON.stringify(this.parseTable(this.table).concat(row as R), null, 2),
    );

    return row as R;
  }
}
