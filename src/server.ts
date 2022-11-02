import Fastify from "fastify";
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

// Cliente de banco de dados
const prisma = new PrismaClient({
  log: ['query'],
});

// Função de iniciação do servidor
async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true, //Aceita de qualquer origem
  });

  fastify.get('/pools/count', async () => {
    const poolsCount = await prisma.pool.count();
    return {poolsCount};
  });

  await fastify.listen({port: 3333});
}

bootstrap();