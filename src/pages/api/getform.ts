import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.on("ready", () => {
  console.log("Redis client connected");
});

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  await client.connect();

  try {
    const keys = await client.keys("*");
    const keyValuePairs: { [key: string]: any } = {};

    for (const key of keys) {
      const value = await client.get(key);
      keyValuePairs[key] = JSON.parse(value!);
    }
    console.log(keyValuePairs);
    client.quit();
  } catch (error) {
    console.error("Error getting data from redis", error);
    res.status(500).json({ message: "It was a failure!" });
    client.quit();
  }
}
