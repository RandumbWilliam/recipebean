export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = "forget-password:";
export const SESSION_SECRET = process.env.SESSION_SECRET || "default";
export const REDIS_URL = process.env.REDIS_URL || "127.0.0.1:6379";
