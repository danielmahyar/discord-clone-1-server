import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { ApolloServer }  from 'apollo-server-express'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import cors from 'cors'
import schema from './GraphQL/Schema'
dotenv.config()
const app = express()
const PRODUCTION = false


const MONGODB_URL: any = (PRODUCTION) ? process.env.MONGODB_URL_PROD : process.env.MONGODB_URL
const PORT: any = process.env.PORT

const startApolloServer = async () => {
	const httpServer = createServer(app)

	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground(),
			{
				async serverWillStart() {
				return {
					async drainServer() {
						subscriptionServer.close();
					}
					};
				}
			},
		],
		introspection: true
	});

	await mongoose.connect(MONGODB_URL)

	const subscriptionServer = SubscriptionServer.create(
		{ schema, execute, subscribe },
		{ server: httpServer, path: server.graphqlPath }
	);

	await server.start();
	server.applyMiddleware({ app });

	await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));

	console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer().then(() => {
	app.use(express.json())

	app.use(cors())

	app.use((req, res, next) => {
		res.header("Content-Type",'application/json');
		res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-methods", "PUT, DELETE, POST, GET");
		next();
	});

	app.listen(8080, () => {
		console.log("Test")
	})
})