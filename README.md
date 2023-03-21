# Persistent Image URL

A lightweight Node.js library for persisting image URLs using the [imgbb.com](https://imgbb.com/) API. This library allows you to upload images from temporary URLs and get back persistent URLs that can be used to access the image later.

## Installation

```bash
npm install persistent-image-url
```

## Usage

```javascript
const { persistImage } = require("persistent-image-url");
// or using ES6 modules:
// import { persistImage } from "persistent-image-url";

const tempUrl = "https://example.com/image.jpg";
const imgbbToken = "YOUR_IMGBB_API_TOKEN";

persistImage(tempUrl, { token: imgbbToken })
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
  - `token`: Your [ImgBB](https://imgbb.com/) API token.

## License

This package is released under the MIT License.
