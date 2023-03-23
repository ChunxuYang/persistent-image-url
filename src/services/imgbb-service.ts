import axios from "axios";

const IMGBB_URL = "https://api.imgbb.com/1/upload";

export async function uploadImageToImgbb(
  imageBase64: string,
  token: string
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("image", imageBase64);

    const res = await axios.post(IMGBB_URL, formData, {
      params: {
        key: token,
      },
    });

    return res.data.data.url;
  } catch (error) {
    throw new Error("Unable to upload image to Imgbb");
  }
}
