const express = require('express');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});

register.registerMetric(httpRequestCounter);

app.get('/', (req, res) => {
  httpRequestCounter.inc();
  res.send('Hello DevOps Monitoring 🚀');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3001, () => {
  console.log('App running on port 3001');
});