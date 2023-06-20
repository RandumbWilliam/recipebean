declare namespace NodeJS {
  export interface ProcessEnv {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_FOLDER: string;
    CLOUDINARY_API_KEY: string;
    CLOUNDINARY_API_SECRET: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}
