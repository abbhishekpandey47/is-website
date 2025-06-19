'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AlternateLinks() {
    const pathname = usePathname();

    useEffect(() => {
        const baseHref = 'https://www.infrasity.com';

        document.querySelectorAll('link[rel="alternate"]').forEach(el => el.remove());

        const fullHref = `${baseHref}${pathname}`;

        const links = [
            { href: fullHref, hreflang: 'x-default' },
            { href: fullHref, hreflang: 'en-us' }
        ];

        links.forEach(({ href, hreflang }) => {
            const linkTag = document.createElement('link');
            linkTag.setAttribute('rel', 'alternate');
            linkTag.setAttribute('href', href);
            linkTag.setAttribute('hreflang', hreflang);
            document.head.appendChild(linkTag);
        });
    }, [pathname]); 

    return null;
}
