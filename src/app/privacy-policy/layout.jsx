export const metadata = {
    title: 'Privacy Policy | Infrasity',
    description: 'Learn how Infrasity collects, uses, and protects your personal information when you use our website and services. Our Privacy Policy explains your rights and our obligations regarding data privacy.',
    keywords: 'Infrasity, Privacy Policy, Data Privacy, Personal Information, Data Protection, User Rights, GDPR Compliance, Information Security, Cookies, Data Collection, Data Usage, Privacy Rights',
    openGraph: {
        title: 'Privacy Policy | Infrasity',
        description: 'Understand how Infrasity protects your data and respects your privacy when using our services.',
        url: '', 
        type: 'website',
        images: [
            {
                url: '/blog_home/blog_home.png', 
                width: 1200,
                height: 630,
                alt: 'Infrasity Privacy Policy',
            },
        ],
    },
}

export default function PageLayout({ children }) {
    return <>{children}</>
}
