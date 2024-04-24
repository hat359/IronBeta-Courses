"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = __importDefault(require("./models/db"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// create application/x-www-form-urlencoded parser
var urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
const PORT = 3000;
(0, db_1.default)();
// Define routes
app.use('/api/v1/courses', courseRoutes_1.default);
// Error handling middleware
app.use(errorMiddleware_1.errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//   }).catch(err => {
//     console.error('Error connecting to MongoDB:', err);
//   });
exports.default = app;
