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
const imgbb_service_1 = require("./services/imgbb-service");
const smms_service_1 = require("./services/smms-service");
function persistImage(tempUrl, config) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // default to imgbb
            if (!config.uploader) {
                config.uploader = "imgbb";
            }
            const imageStream = yield axios_1.default.get(tempUrl, {
                responseType: "arraybuffer",
            });
            const imageBase64 = Buffer.from(imageStream.data, "binary").toString("base64");
            if (config.uploader === "imgbb") {
                return (0, imgbb_service_1.uploadImageToImgbb)(imageBase64, config.token);
            }
            else if (config.uploader === "smms") {
                return (0, smms_service_1.uploadImageToSmms)(imageBase64, config.token);
            }
            else {
                throw new Error("Invalid uploader specified");
            }
        }
        catch (error) {
            throw new Error("Unable to persist image");
        }
    });
}
exports.persistImage = persistImage;
