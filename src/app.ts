import express from 'express';
import { router } from '../src/routes'
import { PrismaClient } from '@prisma/client'

const app = express();

// Prisma
const prisma = new PrismaClient()

// Declare the addons bellow
app.use(router)

// if (import.meta.env.VITE_APP_PORT) {
//   app.listen(3000);
//   console.log('listening on http://localhost:3000/');
// }

export const viteNodeApp = app;