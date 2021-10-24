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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var apollo_server_express_1 = require("apollo-server-express");
var http_1 = require("http");
var graphql_1 = require("graphql");
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
var apollo_server_core_1 = require("apollo-server-core");
var cors_1 = __importDefault(require("cors"));
var Schema_1 = __importDefault(require("./GraphQL/Schema"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var MONGODB_URL = process.env.MONGODB_URL;
var PORT = process.env.PORT;
var startApolloServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var httpServer, server, subscriptionServer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                httpServer = (0, http_1.createServer)(app);
                server = new apollo_server_express_1.ApolloServer({
                    schema: Schema_1.default,
                    plugins: [
                        (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
                        {
                            serverWillStart: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, {
                                                drainServer: function () {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            subscriptionServer.close();
                                                            return [2 /*return*/];
                                                        });
                                                    });
                                                }
                                            }];
                                    });
                                });
                            }
                        },
                    ],
                });
                return [4 /*yield*/, mongoose_1.default.connect(MONGODB_URL)];
            case 1:
                _a.sent();
                subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({ schema: Schema_1.default, execute: graphql_1.execute, subscribe: graphql_1.subscribe }, { server: httpServer, path: server.graphqlPath });
                return [4 /*yield*/, server.start()];
            case 2:
                _a.sent();
                server.applyMiddleware({ app: app });
                return [4 /*yield*/, new Promise(function (resolve) { return httpServer.listen({ port: PORT }, resolve); })];
            case 3:
                _a.sent();
                console.log("\uD83D\uDE80 Server ready at http://localhost:" + PORT + server.graphqlPath);
                return [2 /*return*/];
        }
    });
}); };
startApolloServer().then(function () {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(function (req, res, next) {
        res.header("Content-Type", 'application/json');
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-methods", "PUT, DELETE, POST, GET");
        next();
    });
    app.listen(8080, function () {
        console.log("Test");
    });
});
