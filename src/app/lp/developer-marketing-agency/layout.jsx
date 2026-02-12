import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata(
    "Developer Marketing Agency | Infrasity",
    "Infrasity helps SaaS, DevTool, and infra companies grow with developer marketing services, docs, content,  and community engagement.",
    "https://www.infrasity.com/lp/developer-marketing-agency"
);

export default function PageLayout({ children }) {
    return (
        <>
            {children}
        </>
    );
}
