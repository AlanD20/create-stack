import cors from 'cors';
import express from 'express';
import config from './app/config';
import { Newsletter, validator } from './app/validator';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Create public directory at root to serve static
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.send('<h1>Hey There! Your {{appName}} Application is ready<h1>');
});


app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Hey There, This is an API endpoint for {{appName}} Application!',
    status: 'success',
    code: 200,
  });
});


app.post('/api/newsletter', (req, res) => {

  return validator({
    response: res,
    schema: 'newsletter',
    body: req.body
  }, ({ name, email, subscribe }: Newsletter) => {

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
