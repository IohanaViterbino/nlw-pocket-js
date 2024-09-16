import fastify from 'fastify'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { createGoalRouter } from '@/routers/create-goal';
import { createGoalCompletionRouter } from '@/routers/create-goals-completitions';
import { pengingGoalsRouter } from '@/routers/get-peding-goals';
import { getSummaryRouter } from '@/routers/get-weekly-summary';
import fastifyCors from '@fastify/cors';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// registrando as rotas
app.register(createGoalRouter);
app.register(createGoalCompletionRouter);
app.register(pengingGoalsRouter);
app.register(getSummaryRouter);

app
  .listen({
    port: 3333,
    host: '0.0.0.0'
  })
  .then(() => {
    console.log('HTTP server is running! :)')
  })
