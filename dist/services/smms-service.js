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
exports.uploadImageToSmms = void 0;
const axios_1 = __importDefault(require("axios"));
const SMMS_URL = "https://sm.ms/api/v2/upload";
function uploadImageToSmms(imageBase64, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // convert base64 to blob
            const blob = yield fetch(`
      data:application/octet-stream;base64,${imageBase64}
    `).then((r) => r.blob());
            const formData = new FormData();
            formData.append("smfile", blob);
            const res = yield axios_1.default.post(SMMS_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token,
                },
            });
            return res.data.data.url;
        }
        catch (error) {
            throw new Error("Unable to upload image to Smms");
        }
    });
}
exports.uploadImageToSmms = uploadImageToSmms;
