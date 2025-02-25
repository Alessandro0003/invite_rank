import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkrRoute } from './routes/access-invite-link'
import { getSubscribeInviteClicsRoute } from './routes/subscribe-invite-clics'
import { getSubscribeInviteCountRoute } from './routes/subscribe-invite-count'
import { subscribeToEventRoute } from './routes/subscribe-to-event'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NWL Connect API',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkrRoute)
app.register(getSubscribeInviteClicsRoute)
app.register(getSubscribeInviteCountRoute)

const port = env.PORT

app.listen({ port }).then(() => {
  console.log(`Server is running on http://localhost:${port}/`)
})
