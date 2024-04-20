// importing relevant modules
import dotenv from "dotenv";
import path from "path";

dotenv.config();

console.log(process.env, "ok")

// import relevant types
import { defaultConfigTypes } from "../types/config.types";

export const isProd: boolean = process.env.ENGINE_ENV === "production";
export const isDevelopment: boolean = process.env.ENGINE_ENV === "development";
export const PORT: number = parseInt(process.env.PORT || "8000", 10);


interface CorsSettings {
  credentials: boolean;
  origin: string[];
  methods: string[];
}

export const corsSettings: CorsSettings = isProd
  ? {
      credentials: true,
      origin: [
        "https://google.com",
        "http://localhost:8000",
        "http://localhost:3000",
        "http://localhost:5173",
        "https://remitflex.com"
      ],
      methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
    }
  : {
      credentials: true,
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:9000",
        "http://localhost:5173",
        "https://www.test.google.com",
        "http://localhost:8080", 
        "https://storage.googleapis.com" 
      ],
      methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
    };


// defaultConfig object - this contains any config strings || numbers
export const defaultConfig: defaultConfigTypes = {
  PORT: Number(process.env.PORT),
  FLW_PUBLIC_KEY: process.env.FLW_PUBLIC_KEY,
  FLW_SECRET_KEY: process.env.FLW_SECRET_KEY,
  CC_API_KEY: process.env.CC_API_KEY,
  BTCPAY_SERVER_URL:process.env.BTCPAY_SERVER_URL,
  API_KEY:process.env.API_KEY,
  STORE_ID_OR_TOKEN :process.env.STORE_ID_OR_TOKEN,
  USERNAME :process.env.USERNAME,
  PASSWORD :process.env.PASSWORD,
};

console.log(defaultConfig)


