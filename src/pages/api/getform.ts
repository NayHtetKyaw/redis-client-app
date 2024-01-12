import { client, isConnected } from "../../utils/redisClient";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> {
 
  if (!isConnected) {
    await client.connect();
  }

  try {
    const keys = await client.keys("*");
    const keyValuePairs: { [key: string]: any } = {};
    type ResponseData = { [key: string]: any };

    for (const key of keys) {
      const value = await client.get(key);
      keyValuePairs[key] = JSON.parse(value!);
    }

    
      const validKeyValueArray = Object.entries(keyValuePairs).filter(([key, value]) => {
        return value !== null && value !== undefined;
      });

      const responseData: ResponseData = keyValuePairs;

      res.status(200).json(responseData);
      console.log(validKeyValueArray);
      } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
