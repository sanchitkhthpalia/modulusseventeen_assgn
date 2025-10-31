import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { authRouter } from './routes/authRoutes';
import { taskRouter } from './routes/taskRoutes';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.use('/api/auth', authRouter);
  app.use('/api/tasks', taskRouter);

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    // centralized error handler
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'Server error' });
  });

  return app;
}


