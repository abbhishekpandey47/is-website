import HomePage from '@/Components/HomePage/HomePage';
import { ConfigProvider } from 'antd';
import { headers } from 'next/headers';



export default async function Home() {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';

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
