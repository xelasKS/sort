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
exports.Generator = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const crypto_1 = require("crypto");
class Generator {
    generate(linesCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = "input.txt";
            const file = yield promises_1.default.open(fileName, "w");
            const stream = file.createWriteStream();
            for (let i = 0; i < linesCount; ++i) {
                stream.write(this.generateString() + "\n");
            }
            return fileName;
        });
    }
    generateString() {
        return (0, crypto_1.randomUUID)();
    }
}
exports.Generator = Generator;
