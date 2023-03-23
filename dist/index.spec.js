"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
describe("persistImage", () => {
    it("should return a url", () => __awaiter(void 0, void 0, void 0, function* () {
        const testUrl = "https://picsum.photos/200/300";
        const IMGBB_TOKEN = process.env.IMGBB_API_KEY;
        const persistUrl = yield (0, index_1.persistImage)(testUrl, {
            token: IMGBB_TOKEN,
        });
        // any url can be returned, check start of string
        expect(persistUrl).toMatch(/^http/);
    }));
    it("should throw an error if the image cannot be downloaded", () => __awaiter(void 0, void 0, void 0, function* () {
        const testUrl = "https://thisimagewillnotexist.com/foobar";
        const IMGBB_TOKEN = process.env.IMGBB_API_KEY;
        yield expect((0, index_1.persistImage)(testUrl, {
            uploader: "smms",
            token: IMGBB_TOKEN,
        })).rejects.toThrowError();
    }));
    it("should throw an error if the image cannot be uploaded", () => __awaiter(void 0, void 0, void 0, function* () {
        const testUrl = "https://picsum.photos/200/300";
        const IMGBB_TOKEN = "invalid-token";
        yield expect((0, index_1.persistImage)(testUrl, {
            token: IMGBB_TOKEN,
        })).rejects.toThrowError();
    }));
    it("should throw an error if the tempUrl is invalid or the image cannot be downloaded", () => __awaiter(void 0, void 0, void 0, function* () {
        const testUrl = "invalid-url";
        const IMGBB_TOKEN = process.env.IMGBB_API_KEY;
        yield expect((0, index_1.persistImage)(testUrl, {
            uploader: "smms",
            token: IMGBB_TOKEN,
        })).rejects.toThrowError();
    }));
});
describe("smms", () => {
    it("should return a url", () => __awaiter(void 0, void 0, void 0, function* () {
        const testUrl = "https://picsum.photos/200/300";
        const TOKEN = process.env.SMMS_API_KEY;
        const persistUrl = yield (0, index_1.persistImage)(testUrl, {
            uploader: "smms",
            token: TOKEN,
        });
        // any url can be returned, check start of string
        expect(persistUrl).toMatch(/^http/);
    }));
    it("should throw an error if the image cannot be downloaded", () => __awaiter(void 0, void 0, void 0, function* () {
        const testUrl = "https://thisimagewillnotexist.com/foobar";
        const TOKEN = process.env.SMMS_API_KEY;
        yield expect((0, index_1.persistImage)(testUrl, {
            uploader: "smms",
            token: TOKEN,
        })).rejects.toThrowError();
    }));
    it("should throw an error if the image cannot be uploaded", () => __awaiter(void 0, void 0, void 0, function* () {
        const testUrl = "https://picsum.photos/200/300";
        const TOKEN = "invalid-token";
        yield expect((0, index_1.persistImage)(testUrl, {
            uploader: "smms",
            token: TOKEN,
        })).rejects.toThrowError();
    }));
});
