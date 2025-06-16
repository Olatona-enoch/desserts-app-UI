import * as https from 'https';

export default function handler(req:any , res:any ) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, amount } = req.body as { email: string; amount: number };

  if (!email || !amount) {
    return res.status(400).json({ error: 'Email and amount are required' });
  }

  const postData = JSON.stringify({ email, amount });

  const options: https.RequestOptions = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env['PAYSTACK_SECRET_KEY']}`,
      'Content-Type': 'application/json'
    }
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk: Buffer) => {
      data += chunk.toString();
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

  apiReq.on('error', (err: Error) => {
    console.error('Paystack API error:', err);
    res.status(500).json({ error: 'Unable to reach Paystack API' });
  });

  apiReq.write(postData);
  apiReq.end();
}
