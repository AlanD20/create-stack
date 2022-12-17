import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { Question, validator } from './app/validator';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hey There! Welcome to zod');
});


app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Hey There, This is an API endpoint for zod!',
    status: 'success',
    code: 200,
  });
});


app.post('/api/question', (req, res) => {

  return validator({
    response: res,
    schema: 'question',
    body: req.body
  }, ({ name, email, subscribe }: Question) => {

    return {
      data: { name, email, subscribe },
      message: 'User subscribed successfully'
    }
  })
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${PORT}`);
});


export {
  app
}
