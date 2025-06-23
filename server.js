const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const https = require('https');
const express = require('express');
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',  // or use '*' for all origins during dev
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'] // add headers you need
}));

// Store webhook events in memory
const webhookEvents = [];


// Handle payment initialization
app.post('/api/initialize-payment', (req, res) => {
  const { email, amount, currency = 'NGN' } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ error: 'Email and amount are required' });
  }

  const postData = JSON.stringify({ email, amount, currency });

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const result = JSON.parse(data);

        if (result.status) {
          res.status(200).json({
            access_code: result.data.access_code,
            reference: result.data.reference
          });
        } else {
          res.status(400).json({ error: result.message });
        }
      } catch (err) {
        console.error('Error parsing Paystack response:', err);
        res.status(500).json({ error: 'Error processing payment response' });
      }
    });
  });

  apiReq.on('error', (err) => {
    console.error('Paystack API error:', err);
    res.status(500).json({ error: 'Unable to reach Paystack API' });
  });

  apiReq.write(postData);
  apiReq.end();
});






// ===========================
// NEW: PAYSTACK WEBHOOK URL
// ===========================
app.post('/api/paystack-webhook', (req, res) => {
  const event = req.body;

  console.log('Paystack Webhook Event:', event);
  webhookEvents.unshift(event);

  // Immediately acknowledge receipt of the webhook
  res.sendStatus(200);

  // OPTIONAL: Do something with the event, e.g. update DB
  if (event.event === 'charge.success') {
    console.log('Payment successful! Reference:', event.data.reference);
    // Example: update payment status in DB
  }
  // You can handle other event types if needed
});

  app.get('/webhook-events', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Paystack Webhook Events</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            pre { background: #f4f4f4; padding: 10px; overflow-x: auto; }
          </style>
        </head>
        <body>
          <h1>Latest Paystack Webhook Events</h1>
          ${webhookEvents.length === 0 ? '<p>No events received yet.</p>' : ''}
          ${webhookEvents.map(ev => `<pre>${JSON.stringify(ev, null, 2)}</pre>`).join('')}
        </body>
      </html>
    `);
  });



// ==================
// VERIFY TRANSACTION
app.post('/api/verify-payment', (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ success: false, message: 'Transaction reference is required' });
  }

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/transaction/verify/${reference}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    }
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (result.status && result.data.status === 'success') {
          res.status(200).json({ success: true, data: result.data });
        } else {
          res.status(400).json({
            success: false,
            message: result.data?.gateway_response || 'Transaction failed',
            data: result.data
          });
        }
      } catch (err) {
        console.error('Error parsing verification response:', err);
        res.status(500).json({ success: false, message: 'Invalid response from Paystack' });
      }
    });
  });
  apiReq.on('error', (err) => {
    console.error('Paystack API error:', err);
    res.status(500).json({ success: false, message: 'Unable to verify transaction' });
  });

  apiReq.end();


})




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
