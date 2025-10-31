import { connectToDatabase } from '../config/db';
import { User } from '../models/User';
import { Task } from '../models/Task';
import bcrypt from 'bcrypt';

async function run() {
  await connectToDatabase();
  const email = 'demo@example.com';
  const password = 'password123';
  const existing = await User.findOne({ email });
  const user = existing || (await User.create({ email, passwordHash: await bcrypt.hash(password, 10) }));

  await Task.deleteMany({ userId: user.id });
  await Task.insertMany([
    { title: 'Buy groceries', description: 'Milk, eggs, bread', priority: 'High', userId: user.id },
    { title: 'Finish report', deadline: new Date(Date.now() + 86400000), priority: 'Medium', userId: user.id },
    { title: 'Yoga session', datetime: new Date(), priority: 'Low', userId: user.id },
  ]);

  console.log('Seed complete.', { email, password });
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


