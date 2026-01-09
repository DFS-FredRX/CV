import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmTestConfig: TypeOrmModuleOptions = {
    type: 'better-sqlite3',
    database: ':memory:',
    entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
    synchronize: true
}