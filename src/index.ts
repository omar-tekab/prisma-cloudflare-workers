import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { OpenAPIHono } from '@hono/zod-openapi'
import { prettyJSON } from 'hono/pretty-json'
import {routeUpdateUser} from './user/user.contoller'
import {updateUser} from './user/user.contoller'
import { html } from 'hono/html'
import { cors } from 'hono/cors'





      const app = new OpenAPIHono()

      // app.openapi(route, (c) => {
      //   const { id } = c.req.valid('param')
      //   return c.jsonT({
      //     id,
      //     age: 20,
      //     name: 'Ultra-man',
      //   })
      // })
      app.use('*', cors())

      app.openapi(routeUpdateUser,updateUser)
      app.use('/doc/*', prettyJSON())

      app.get('/swagger', (c) => {
        return c.html(
          html`<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
              name="description"
              content="SwaggerUI"
            />
            <title>SwaggerUI</title>
            <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
          </head>
          <body>
          <div id="swagger-ui"></div>
          <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js" crossorigin></script>
          <script>
            window.onload = () => {
              
              window.ui = SwaggerUIBundle({
                  url: "https://8787-omartekab-prismacloudfl-1rdourb7e1i.ws-eu104.gitpod.io/doc",
                dom_id: '#swagger-ui',
              });
            };
          </script>
          </body>
          </html>
        `
        )
      })
      // The OpenAPI documentation will be available at /doc
      app.doc('/doc', {
        openapi: '3.0.0',
        info: {
          version: '1.0.0',
          title: 'My API',
        },
      })

      export default app
