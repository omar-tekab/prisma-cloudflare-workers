import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { OpenAPIHono } from '@hono/zod-openapi'
import { prettyJSON } from 'hono/pretty-json'
import {routeUpdateUser} from './user/user.contoller'
import {updateUser} from './user/user.contoller'
const ParamsSchema = z.object({
    id: z
      .string()
      .min(3)
      .openapi({
        param: {
          name: 'id',
          in: 'path',
        },
        example: '1212121',
      }),
  })
  

  const userWhereInputSchema = z.object({
    id: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    username: z.string().optional(),
  });
  
  // Generate OpenAPI schema with examples
  const openAPISchema = userWhereInputSchema.openapi({
    example: {
      id: 'example_id' ,
      firstName: 'John' ,
      lastName: 'Doe' ,
      username:  'johndoe' ,
    },
  });
  
    const route = createRoute({
        method: 'get',
        path: '/users/:id',
        request: {
          params: ParamsSchema,
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: openAPISchema,
              },
            },
            description: 'Retrieve the user',
          },
        },
      })

      const app = new OpenAPIHono()

      // app.openapi(route, (c) => {
      //   const { id } = c.req.valid('param')
      //   return c.jsonT({
      //     id,
      //     age: 20,
      //     name: 'Ultra-man',
      //   })
      // })
      app.openapi(routeUpdateUser,updateUser)
      app.use('/doc/*', prettyJSON())

    
      // The OpenAPI documentation will be available at /doc
      app.doc('/doc', {
        openapi: '3.0.0',
        info: {
          version: '1.0.0',
          title: 'My API',
        },
      })

      export default app
