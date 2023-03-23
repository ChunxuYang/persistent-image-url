import axios from "axios";
import { uploadImageToImgbb } from "./services/imgbb-service";
import { uploadImageToSmms } from "./services/smms-service";

type Uploader = "imgbb" | "smms";

export type UploaderConfig = {
  uploader?: Uploader;
  token: string;
};

export async function persistImage(
  tempUrl: string,
  config: UploaderConfig
): Promise<string> {
  try {
    // default to imgbb
    if (!config.uploader) {
      config.uploader = "imgbb";
    }

    const imageStream = await axios.get(tempUrl, {
      responseType: "arraybuffer",
    });

    const imageBase64 = Buffer.from(imageStream.data, "binary").toString(
      "base64"
    );

    if (config.uploader === "imgbb") {
      return uploadImageToImgbb(imageBase64, config.token);
    } else if (config.uploader === "smms") {
      return uploadImageToSmms(imageBase64, config.token);
    } else {
      throw new Error("Invalid uploader specified");
    }
  } catch (error) {
    throw new Error("Unable to persist image");
  }
}
