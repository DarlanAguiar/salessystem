import routes from './routes';

import express from 'express';
import cors from 'cors';
import { resolve } from 'path';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(resolve(__dirname, '../build')));

app.use('/', routes);

app.get('/login', (req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Servidor rodando');
});

export {};

// codigo para transpilar
// tsc -p tsconfig-server.json && react-scripts build
