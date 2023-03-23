import { persistImage } from "./index";
import * as dotenv from "dotenv";
dotenv.config();

describe("persistImage", () => {
  it("should return a url", async () => {
    const testUrl = "https://picsum.photos/200/300";
    const IMGBB_TOKEN = process.env.IMGBB_API_KEY as string;

    const persistUrl = await persistImage(testUrl, {
      token: IMGBB_TOKEN,
    });

    // any url can be returned, check start of string
    expect(persistUrl).toMatch(/^http/);
  });

  it("should throw an error if the image cannot be downloaded", async () => {
    const testUrl = "https://thisimagewillnotexist.com/foobar";
    const IMGBB_TOKEN = process.env.IMGBB_API_KEY as string;

    await expect(
      persistImage(testUrl, {
        uploader: "smms",
        token: IMGBB_TOKEN,
      })
    ).rejects.toThrowError();
  });

  it("should throw an error if the image cannot be uploaded", async () => {
    const testUrl = "https://picsum.photos/200/300";
    const IMGBB_TOKEN = "invalid-token";

    await expect(
      persistImage(testUrl, {
        token: IMGBB_TOKEN,
      })
    ).rejects.toThrowError();
  });

  it("should throw an error if the tempUrl is invalid or the image cannot be downloaded", async () => {
    const testUrl = "invalid-url";
    const IMGBB_TOKEN = process.env.IMGBB_API_KEY as string;

    await expect(
      persistImage(testUrl, {
        uploader: "smms",
        token: IMGBB_TOKEN,
      })
    ).rejects.toThrowError();
  });
});

describe("smms", () => {
  it("should return a url", async () => {
    const testUrl = "https://picsum.photos/200/300";
    const TOKEN = process.env.SMMS_API_KEY as string;

    const persistUrl = await persistImage(testUrl, {
      uploader: "smms",
      token: TOKEN,
    });

    // any url can be returned, check start of string
    expect(persistUrl).toMatch(/^http/);
  });

  it("should throw an error if the image cannot be downloaded", async () => {
    const testUrl = "https://thisimagewillnotexist.com/foobar";
    const TOKEN = process.env.SMMS_API_KEY as string;

    await expect(
      persistImage(testUrl, {
        uploader: "smms",
        token: TOKEN,
      })
    ).rejects.toThrowError();
  });

  it("should throw an error if the image cannot be uploaded", async () => {
    const testUrl = "https://picsum.photos/200/300";
    const TOKEN = "invalid-token";

    await expect(
      persistImage(testUrl, {
        uploader: "smms",
        token: TOKEN,
      })
    ).rejects.toThrowError();
  });
});
