export const databaseConfig = () => ({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    database: {
        host: process.env.DATABASE_HOST ?? 'localhost',
        port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
    }
} satisfies AppConfig);


export interface AppConfig {
    port: number,
    database: DatabaseConfig
}

export interface DatabaseConfig {
    host: string | undefined,
    port: number,
    name: string | undefined,
    username: string | undefined,
    password: string | undefined
}