"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
exports.app = express_1.default();
exports.app.get("/", (req, res) => {
    res.send("Hello World!");
});
//# sourceMappingURL=app.js.map