export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { fields, context } = req.body;

  if (!fields || !Array.isArray(fields)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  // Map field array to object
  const fieldMap = Object.fromEntries(fields.map(f => [f.name, f.value]));

  const fullName = fieldMap.full_name;
  const workEmail = fieldMap.email;
  const companyName = fieldMap.company;

  if (!fullName || !workEmail) {
    return res.status(400).json({ error: 'Missing full name or email' });
  }

  // 👇 You now have the values ready to use
  const userData = {
    fullName,
    workEmail,
    companyName,
    submittedAt: new Date().toISOString(),
    context
  };

  console.log("Sanitized userData:", userData);

  // send to Google Apps Script
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const resultText = await response.text();
    console.log("Google Apps Script result:", resultText);

    return res.status(200).json({ message: 'Success', result: resultText });
  } catch (err) {
    console.error("Failed to send to Apps Script:", err);
    return res.status(500).json({ error: 'Failed to forward to Apps Script' });
  }
}
