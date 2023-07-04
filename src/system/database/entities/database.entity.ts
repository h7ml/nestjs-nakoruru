export class Database {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  type: string;
  createdAt: Date;
  data: Database[];
  total: number;
  page: number;
  pageSize: number;
  [key: string]: any;
}
