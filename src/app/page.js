import HomePage from '@/Components/HomePage/HomePage';
import { ConfigProvider } from 'antd';
import { headers } from 'next/headers';

export default function Home() {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';

    const ip = headersList.get('x-forwarded-for') || '127.0.0.1';
    const url = '/';

    const knownBots = ['gptbot', 'bingbot', 'googlebot'];
    const matchedBot = knownBots.find((bot) => userAgent.toLowerCase().includes(bot));

    if (matchedBot) {
        fetch('https://www.infrasity.com/api/log-bot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dt: new Date().toISOString(),
                message: `Bot detected: ${matchedBot}`,
                userAgent,
                ip,
                url,
            }),
        }).catch((error) => {
            console.error('Failed to log bot detection:', error);
        });
    }
    return (
        <>
            <div>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: '#red',
                                algorithm: true, // Enable algorithm
                            },
                            Input: {
                                colorPrimary: '#eb2f96',
                                algorithm: true,
                            },
                        },
                    }}
                >
                    <HomePage />
                </ConfigProvider>
            </div>
        </>
    );
}
