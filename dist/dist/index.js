"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const schema_1 = require("@graphql-tools/schema");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const PORT = 4000;
const pubsub = new graphql_subscriptions_1.PubSub();
const typeDefs = apollo_server_express_1.gql `
  type Query {
    currentNumber: Int
  }

  type Subscription {
    numberIncremented: Int
  }
`;
const resolvers = {
    Query: {
        currentNumber() {
            return currentNumber;
        },
    },
    Subscription: {
        numberIncremented: {
            subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
        },
    },
};
const schema = schema_1.makeExecutableSchema({ typeDefs, resolvers });
const app = express_1.default();
const httpServer = http_1.createServer(app);
const wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: "/graphql",
});
const serverCleanup = ws_2.useServer({ schema }, wsServer);
const server = new apollo_server_express_1.ApolloServer({
    schema,
    plugins: [
        apollo_server_core_1.ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            serverWillStart() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        drainServer() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield serverCleanup.dispose();
                            });
                        },
                    };
                });
            },
        },
    ],
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    server.applyMiddleware({ app });
    httpServer.listen(PORT, () => {
        console.log(`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`);
    });
    let currentNumber = 0;
    function incrementNumber() {
        currentNumber++;
        pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumber });
        setTimeout(incrementNumber, 1000);
    }
    incrementNumber();
});
main();
//# sourceMappingURL=index.js.map