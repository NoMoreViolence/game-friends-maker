declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'dev' | 'prod';
    DATABASE: string;
    DATABASE_PORT: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
    GOOGLE_SECRET: string;
    GOOGLE_CLIENT: string;
    APOLLO_KEY: string;
  }
}
