"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistImage = void 0;
const axios_1 = __importDefault(require("axios"));
const IMGBB_URL = "https://api.imgbb.com/1/upload";
function persistImage(tempUrl, config) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get image from tempUrl and convert to base64
            const imageStream = yield axios_1.default.get(tempUrl, {
                responseType: "arraybuffer",
            });
            // convert image to base64
            const imageBase64 = Buffer.from(imageStream.data, "binary").toString("base64");
            const formData = new FormData();
            formData.append("image", imageBase64);
            // upload image to imgbb
            const res = yield axios_1.default.post(IMGBB_URL, formData, {
                params: {
                    key: config.token,
                },
            });
            return res.data.data.url;
        }
        catch (error) {
            throw new Error("Unable to persist image");
        }
    });
}
exports.persistImage = persistImage;
