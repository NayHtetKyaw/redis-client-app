import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
import { promisify } from "util";

const client = createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => console.log("Redis Client Error", err));
   
client.on("ready", () => {
  console.log("Redis client connected");
});

const RedisSetAsync = promisify(client.set).bind(client);


type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  await client.connect();

  try {
    const { inputKey, inputValue } = req.body;

    await RedisSetAsync(inputKey, JSON.stringify(inputValue));
    console.log("Data set in Redis");

    res.status(200).json({ message: "It was a success!" });
  
  } catch (error) {
    console.error("Error setting data in Redis:", error);
    res.status(500).json({ message: "It was a failure!" });
  } 
}
