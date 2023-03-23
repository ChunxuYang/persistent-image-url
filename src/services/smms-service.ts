import axios from "axios";

const SMMS_URL = "https://sm.ms/api/v2/upload";

export async function uploadImageToSmms(
  imageBase64: string,
  token: string
): Promise<string> {
  try {
    // convert base64 to blob
    const blob = await fetch(`
      data:application/octet-stream;base64,${imageBase64}
    `).then((r) => r.blob());

    const formData = new FormData();
    formData.append("smfile", blob);

    const res = await axios.post(SMMS_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });

    return res.data.data.url;
  } catch (error) {
    throw new Error("Unable to upload image to Smms");
  }
}
