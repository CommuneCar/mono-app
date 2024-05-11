"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const base_route_1 = __importDefault(require("./base.route"));
const router = express_1.default.Router();
// Dynamically populate router with routes
router.use('/', base_route_1.default);
exports.default = router;
