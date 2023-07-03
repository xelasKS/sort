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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorter = void 0;
const sqlite3_1 = require("sqlite3");
const sqlite_1 = require("sqlite");
const promises_1 = __importDefault(require("node:fs/promises"));
class Sorter {
    sort(fileName) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, sqlite_1.open)({ filename: "database.db", driver: sqlite3_1.Database });
            /*await db.exec("CREATE TABLE tbl (col text)");
            await db.exec("CREATE INDEX column_idx ON tbl (col)");
             */
            const insertStatement = yield db.prepare("INSERT INTO tbl VALUES (?)");
            const file = yield promises_1.default.open(fileName, "r");
            try {
                for (var _d = true, _e = __asyncValues(file.readLines()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const line = _c;
                    yield insertStatement.run(line);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            const output = yield promises_1.default.open("output.txt", "w");
            yield db.each("SELECT col FROM tbl ORDER BY col ASC", [], (error, row) => __awaiter(this, void 0, void 0, function* () {
                yield output.write(row.col + "\n");
            }));
        });
    }
}
exports.Sorter = Sorter;
