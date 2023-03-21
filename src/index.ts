import axios from "axios";

const IMGBB_URL = "https://api.imgbb.com/1/upload";

export type UploaderConfig = {
  token: string;
};

export async function persistImage(
  tempUrl: string,
  config: UploaderConfig
): Promise<string> {
  try {
    // get image from tempUrl and convert to base64
    const imageStream = await axios.get(tempUrl, {
      responseType: "arraybuffer",
    });

    // convert image to base64
    const imageBase64 = Buffer.from(imageStream.data, "binary").toString(
      "base64"
    );

    const formData = new FormData();
    formData.append("image", imageBase64);

    // upload image to imgbb
    const res = await axios.post(IMGBB_URL, formData, {
      params: {
        key: config.token,
      },
    });

    return res.data.data.url;
  } catch (error) {
    throw new Error("Unable to persist image");
  }
}
