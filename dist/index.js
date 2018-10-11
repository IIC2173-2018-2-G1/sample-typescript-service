"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 5000;
const HOSTNAME = "0.0.0.0";
app_1.app.listen(PORT, HOSTNAME, () => {
    // Success callback
    console.log(`Listening at http://${HOSTNAME}:${PORT}/`);
});
//# sourceMappingURL=index.js.map