// pages/api/ai-advisor.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: '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',
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Missing prompt' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const aiReply = completion.choices[0]?.message?.content;
        res.status(200).json({ reply: aiReply });
    } catch (err) {
        console.error('OpenAI error:', err);
        res.status(500).json({ error: 'OpenAI request failed' });
    }
}
