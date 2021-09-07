export interface IConfig {
    env: string,
    api: {
        version: number,
        port: number
    },
    logger: {
        level: string
    },
    bot: {
        token: string
    },
    db: {
        //db config model
    }
}