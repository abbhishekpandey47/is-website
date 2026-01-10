export const metadata = {
    title: "Developer Marketing Agency | Infrasity",
    description: "Infrasity helps SaaS, DevTool, and infra companies grow with developer marketing services, docs, content,  and community engagement.",
    robots: {
        index: false,
        follow: false,
    },

};

export default function PageLayout({ children }) {
    return (
        <>
            {children}
        </>
    );
}
