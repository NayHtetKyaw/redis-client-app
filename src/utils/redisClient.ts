import { createClient, RedisClientType, RedisModules } from "@redis/client";

let isConnected = false;

const client = createClient({
  url: "redis://localhost:6379",
}); 

client.on("connect", () => {
  isConnected = true;
  console.log("Redis client connected");
});

client.on("disconnect", () => { 
  isConnected = false;
});

client.on("error", (err) => {   
  console.log("Redis Client Error", err)
  isConnected = false;
});

export { client, isConnected };