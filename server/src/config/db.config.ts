import * as dotenv from 'dotenv'
import { DataSourceOptions } from 'typeorm'
dotenv.config()

const requiredEnv = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
]

for (const env of requiredEnv) {
    if (!process.env[env]) throw new Error(`Variable d'environnement manquante: ${env}. Veuillez la définir dans votre fichier .env.`)
}

export const dbConfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    entities: [__dirname + '/../**/*.entity{.ts, .js}'],
    synchronize: false
}