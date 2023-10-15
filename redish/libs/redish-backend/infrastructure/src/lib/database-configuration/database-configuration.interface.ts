export interface IDatabaseConfiguration {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  autoLoadEntities: boolean;
}
