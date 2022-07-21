import {ApolloServer, ServerInfo} from 'apollo-server'
import getPort, { makeRange } from 'get-port'
import { GraphQLClient } from 'graphql-request'
import {StageAPI} from '../api/entities/stageApi'
import {StepAPI} from '../api/entities/stepApi'
import {db} from './mockData'
import {schema} from '../api/schema'

type TestContext = {
    client: GraphQLClient
}

export function createTestContext(): TestContext {
    let ctx = {} as TestContext
    const graphqlCtx = graphqlTestContext()
    beforeEach(async () => {
        const client = await graphqlCtx.before()
        Object.assign(ctx, {
            client,
        })
    })
    afterEach(async () => {
        await graphqlCtx.after()
    })
    return ctx
}

const server = new ApolloServer({
    schema, context: {
        stageApi: new StageAPI(db),
        stepApi: new StepAPI(db)
    },
})

function graphqlTestContext() {
    let serverInstance: ServerInfo | null = null
    return {
        async before() {
            const port = await getPort({ port: makeRange(4000, 6000) })
            serverInstance = await server.listen({ port })
            return new GraphQLClient(`http://localhost:${port}`)
        },
        async after() {
            serverInstance?.server.close()
        },
    }
}
