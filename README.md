# Persistent Image Url

A lightweight Node.js library for persisting image URLs using the [imgbb.com](https://imgbb.com/) or [sm.ms](https://sm.ms/) API. This library allows you to upload images from temporary URLs and get back persistent URLs that can be used to access the image later.

## Installation

```bash
npm install persistent-image-url

# or using Yarn:
yarn add persistent-image-url

# or using pnpm:
pnpm add persistent-image-url
```

## Usage

```javascript
const { persistImage } = require("persistent-image-url");
// or using ES6 modules:
// import { persistImage } from "persistent-image-url";

const tempUrl = "https://example.com/image.jpg";
const token = "YOUR_API_TOKEN";

persistImage(tempUrl, {
  uploader: "imgbb", // or "smms", defaults to "imgbb"
  token,
})
  .then((url) => {
    console.log(`Image uploaded to ${url}`);
  })
  .catch((error) => {
    console.error(`Error uploading image: ${error.message}`);
  });
```

## Configuration

The `persistImage` function takes a configuration object with the following properties:

- `tempUrl`: The temporary URL of the image to upload.
- `config`: An object with the following properties:
  - `uploader`: The image uploader service to use. Supported values are `"imgbb"` and `"smms"`. Defaults to `"imgbb"`.
  - `token`: Your [ImgBB](https://imgbb.com/) or [SM.MS](https://sm.ms/) API token.

## License

This package is released under the MIT License.
