export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const body = req.body;
        const token = process.env.LOGTAIL_TOKEN;

        const response = await fetch('https://s1353716.eu-nbg-2.betterstackdata.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const result = await response.text();

        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json({ error: 'Log failed' });
    }
}
