import { createApp } from './app';
import { connectToDatabase } from './config/db';
import { config } from './config/env';

async function main() {
  await connectToDatabase();
  const app = createApp();
  app.listen(config.port, () => {
    console.log(`Server listening on http://localhost:${config.port}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});


