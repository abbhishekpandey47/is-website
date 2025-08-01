'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Home2 from './home';
import NewPost from './newPost';
import Competitor from './competitor';
import Current from './current';
import Mentions from './mentions';
import {
    Home,
    Sparkles,
    BarChart2,
    Search,
    MessageCircle
} from 'lucide-react';


const Dashboard = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigationItems = [
        { id: 'home', label: 'Home', icon: <Home className="w-5 h-5 stroke-gray-600" /> },
        { id: 'new-post', label: 'New Post Generator', icon: <Sparkles className="w-5 h-5 stroke-gray-600" /> },
        { id: 'competitor', label: 'Competitor Analysis', icon: <BarChart2 className="w-5 h-5 stroke-gray-600" /> },
        { id: 'current', label: 'Check Current', icon: <Search className="w-5 h-5 stroke-gray-600" /> },
        { id: 'mentions', label: 'Mentions', icon: <MessageCircle className="w-5 h-5 stroke-gray-600" /> }
    ];

    const handleNavClick = (tabId) => {
        setActiveTab(tabId);
        setSidebarOpen(false); // Close sidebar on mobile after selection
    };


    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <Home2 handleNavClick={handleNavClick} />
                );

            case 'new-post':
                return (
                    <NewPost />
                );

            case 'competitor':
                return (
                    <Competitor />
                );

            case 'current':
                return (
                    <Current />
                );

            case 'mentions':
                return (
                    <Mentions />
                );

            default:
                return null;
        }
    };

    return (
        <div className="relative min-h-screen bg-[#f6f8fc] flex">
            {/* Mobile Menu Button */}
            {/* <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-40 right-10 z-50 p-2 bg-white rounded-md shadow-md"
            >
                <div className="w-6 h-6 flex flex-col justify-center">
                    <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${sidebarOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                    <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${sidebarOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </div>
            </button> */}
            {/* Mobile Overlay */}
            {/* {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )} */}

            {/* Sidebar */}
<div
  className={`
    group
    absolute left-0 top-1 bottom-0 z-50
    bg-white shadow-sm border-r border-gray-200
    transition-all duration-300 ease-in-out
    ${sidebarOpen ? 'w-64' : 'w-20 hover:w-64'}
    overflow-y-auto
  `}
>


                <div className="p-2 md:p-4">
                    <div className="text-lg sm:text-xl font-bold text-gray-900 mb-6 sm:mb-8 mt-8 lg:mt-0">
                        <Image
                            loading="lazy"
                            width={200}
                            height={200}
                            src="/logodata/infrasity_logo.png"
                            alt="Infrasity Logo"
                        /></div>
                    <nav className="space-y-1 sm:space-y-2">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full text-left px-1 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base ${activeTab === item.id
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="text-base sm:text-lg">{item.icon}</span>
                                <span
                                    className={`
    text-[#54616e] text-[16px] font-semibold
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

export default Dashboard;