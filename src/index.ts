import express from 'express';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv'
import authRoute from './routes/userRoutes';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoute); 
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!');
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error('Database connection failed:', e);
  });
