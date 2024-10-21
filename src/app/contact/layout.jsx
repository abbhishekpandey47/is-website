export const metadata = {
    title: 'Contact | Infrasity',
    description: 'Get in touch with Infrasity\'s Developer Relations team to discuss how we can support your engineering and marketing efforts, increase user sign-ups, and accelerate your pipeline effectively.',
    keywords: 'Infrasity, Contact, Developer Relations, Engineering Support, Marketing Strategies, User Sign-ups, Pipeline Acceleration, Customer Support, Get in Touch, Infrasity Contact',
    openGraph: {
        title: 'Contact | Infrasity',
        description: 'Reach out to Infrasity\'s Developer Relations team to enhance your engineering and marketing initiatives, boost user engagement, and accelerate your business pipeline.',
        url: '', 
        type: 'website',
        images: [
            {
                url: '/blog_home/blog_home.png',
                width: 1200,
                height: 630,
                alt: 'Contact Infrasity',
            },
        ],
    },
}

export default function PageLayout({ children }) {
    return <>{children}</>
}
