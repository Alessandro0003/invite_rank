import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler
} from 'fastify-type-provider-zod'


const app = fastify()

app.register(fastifyCors)

app.get('/hello', () => {
  return { hello: 'world' }
})

app.listen({ port: 3333 }).then(() => {
  console.log(`Server is running on http://localhost:3333/`)
})