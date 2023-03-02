import { createReadStream } from "fs";
import type { ReadStream } from "fs";
import axios from "axios";
import type { Argv } from "./validator";

export async function getReadableStream({ path, isUrl }: Argv) {
  if (isUrl) {
    try {
      const { data } = await axios.get<ReadStream>(path, {
        responseType: "stream",
      });

      return data;
    } catch {
      return null;
    }
  }

  return createReadStream(path);
}
