import { PrismaClient } from "@prisma/client/edge"
import {Hono} from 'hono'

const app = new Hono()
const prisma = new PrismaClient()

const headers = {
  "Content-Type": "application/json"
}

app.get("/quotes", async () => {
  const results = await prisma.quote.findMany()
  return new Response(JSON.stringify(results, null, 2), {
    headers
  })
})

app.get("/quotes/:id", async ({ params }) => {
  // @ts-ignore
  const { id } = params

  const result = await prisma.quote.findUnique({
    where: {
      id
    }
  })

  return new Response(JSON.stringify(result), {
    headers
  })
})

app.post("/quotes", async (request: Request) => {
  // @ts-ignore
  const { content, author } = await request.json()

  const result = await prisma.quote.create({
    data: {
      content,
      author
    }
  })

  return new Response(JSON.stringify(result, null, 2), {
    headers
  })
})

/** handle 404 results */
app.all('*', () => new Response('Not Found.', { status: 404 }))

export default app;

