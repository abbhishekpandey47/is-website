'use client';
import PostSearch from './postSearch';
import Page from './reddit-comment-generator/page';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Competitor from './competitor';
import Current from './current';
import Home2 from './home';
import Mentions from './mentions';
import NewPost from './newPost';

import {
    BarChart2,
    Home,
    MessageCircle,
    NotebookIcon,
    SearchIcon,
    Sparkles
} from 'lucide-react';
import Credits from './credits';
import SubredditSenseDashboard from './subredditsense';

const Dashboard = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigationItems = [
        { id: 'home', label: 'Home', icon: <Home className="w-5 h-5 stroke-gray-600" /> },
        { id: 'new-post', label: 'New Post Generator', icon: <NotebookIcon className="w-5 h-5 stroke-gray-600" /> },
        { id: 'competitor', label: 'Competitor Analysis', icon: <BarChart2 className="w-5 h-5 stroke-gray-600" /> },
        { id: 'current', label: 'Check Current', icon: <SearchIcon className="w-5 h-5 stroke-gray-600" /> },
        { id: 'subredditsense', label: 'Subreddit Dashboard', icon: <BarChart2 className="w-5 h-5 stroke-gray-600" /> },
        { id: 'credits', label: 'Credits', icon: <Sparkles className="w-5 h-5 stroke-gray-600" /> },
        { id: 'reddit-comment', label: 'Reddit Comment', icon: <MessageCircle className="w-5 h-5 stroke-gray-600" /> },
        { id: 'post-search', label: 'Post Search', icon: <SearchIcon className="w-5 h-5 stroke-gray-600" /> },
    ];

    const searchParams = useSearchParams();

    useEffect(() => {
        const tabFromURL = searchParams.get('tab');
        if (tabFromURL) {
            setActiveTab(tabFromURL);
        }
    }, [searchParams]);

    const handleNavClick = (tabId) => {
        setActiveTab(tabId);
        setSidebarOpen(false);
        router.push(`?tab=${tabId}`, { scroll: false });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <Home2 handleNavClick={handleNavClick} />;
            case 'subredditsense':
                return <SubredditSenseDashboard />;
            case 'new-post':
                return <NewPost />;
            case 'competitor':
                return <Competitor />;
            case 'current':
                return <Current />;
            case 'mentions':
                return <Mentions />;
            case 'credits':
                return <Credits />;
            case 'reddit-comment':
                return <Page />;
            case 'post-search':
                return <PostSearch />;
            default:
                return null;
        }
    };

    // Example usage:
    // const tabData = session.get('tab');
    // session.set('tab', { active: true });

    return (
        <div className="relative min-h-screen bg-background flex">
            {/* Sidebar */}
            <div
                className={`
    group
    absolute left-0 top-1 bottom-0 z-50
    bg-sidebar shadow-sm border-r border-sidebar-border
    transition-all duration-300 ease-in-out
    ${sidebarOpen ? 'w-64' : 'w-20 hover:w-64'}
    overflow-y-auto
  `}
            >
                <div className="p-4 md:p-4">
                    <div className="text-lg sm:text-xl font-bold text-sidebar-foreground mb-6 sm:mb-8 mt-8 lg:mt-0">
                          <Link href="/">
                        <Image
                            loading="lazy"
                            width={200}
                            height={200}
                            src="/logodata/infrasity_logo.png"
                            alt="Infrasity Logo"
                        />
                        </Link>
                        </div>
                    <nav className="space-y-1 sm:space-y-2">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full text-left px-3 py-2 sm:py-3 rounded-lg transition-colors flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base ${activeTab === item.id
                                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                                    : 'text-gray-200 hover:bg-sidebar-accent/50 hover:text-white'
                                    }`}
                            >
                                <span className={activeTab === item.id ? "text-base sm:text-lg text-indigo-700" : "text-base sm:text-lg text-gray-200"}>{item.icon}</span>
                                <span
                                    className={`
    ${activeTab === item.id ? "text-indigo-700" : "text-gray-200"} text-[16px] font-semibold
    whitespace-nowrap
    overflow-hidden
    transition-opacity duration-200
    opacity-0 group-hover:opacity-100
  `}
                                >
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 mr-6 md:mr-0 ml-20">
                {renderContent()}
            </div>
        </div>
    );
};

export default function RedditToolsPageWithSuspense(props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Dashboard {...props} />
        </Suspense>
    );
}
