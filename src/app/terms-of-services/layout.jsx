export const metadata = {
    title: 'Terms Of Use | Infrasity',
    description: 'Review the Terms of Use for Infrasity’s website, covering usage permissions, limitations, and legal guidelines governing access to our content and services.',
    keywords: 'Infrasity, Terms of Use, Website Usage, Legal Guidelines, Content Permissions, Copyright, License, User Restrictions, Website Terms, User Agreement, Access Guidelines',
    openGraph: {
        title: 'Terms Of Use | Infrasity',
        description: 'Understand the legal guidelines and user restrictions on accessing and using Infrasity\'s website.',
        url: '', 
        type: 'website',
        images: [
            {
                url: '/blog_home/blog_home.png', 
                width: 1200,
                height: 630,
                alt: 'Infrasity Terms Of Use',
            },
        ],
    },
}


export default function PageLayout({ children }) {
    return <>{children}</>
}
