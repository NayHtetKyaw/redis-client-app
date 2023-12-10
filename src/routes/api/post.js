import { promisify } from "util";
import redis from "redis";

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("error", (error) => {
  console.error(error);
  redisClient.quit();
});

const redisSetAsync = promisify(redisClient.set).bind(redisClient);

export default async function handler(req, res) {
  console.log("Request received at /api/post");
  if (req.method === "POST") {
    try {
      const { key, value } = req.body;
      console.log(`KEY: ${key}, VALUE: ${value}`);

      await redisSetAsync(key, JSON.stringify(value));
      console.log("Data saved in Redis");
      res.status(200).json({ message: "POST request successful!" });
    } catch (error) {
      console.error("ERROR:", error);

      if (
        error instanceof redis.AbortError ||
        error instanceof redis.AggregateError
      ) {
        console.error("Redis client is closed. Reconnection...");
      }

      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
