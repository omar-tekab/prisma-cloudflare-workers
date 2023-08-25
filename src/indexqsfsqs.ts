import { Hono } from 'hono'
import PrismaEdge from "@prisma/client/edge"
import { basicAuth } from 'hono/basic-auth'
import {login} from './auth/auth.contoller'
import { auth } from './middlewares/auth'

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = new Hono<any>()
const { PrismaClient } = PrismaEdge
const prisma = new PrismaClient()
const results = async () => {
    try {
      const quotes = await prisma.user.findMany();
      return quotes; // You can modify this to format the response as needed
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error(error);
      throw new Error("An error occurred while fetching quotes.");
    }
  };
  

app.get("/quotes", async (c) => {
  try {
    const quotes = await results();
    return  c.json(quotes)
  } catch (error) {
    c.text('Hello from Hono')
  }
}) 
app.fire()