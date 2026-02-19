import ContactPopupButton from "./ContactPopupButton";


const ServiceCard = ({ icon, title, description }) => {
    return (
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-900 border-[1.5px] border-[#2c2d2d] rounded-2xl p-5 transition-all duration-300 hover:bg-[#252761ba] hover:border-[#51538f] cursor-pointer min-h-[100px]">
            <div className="mb-0">
                <div className="flex items-center mb-5">
                    <div className="w-12 h-12 bg-[#2b3074] rounded-xl flex items-center justify-center mr-4">
                        {icon}
                    </div>
                    <h3 className="text-white font-semibold text-lg leading-snug">{title}</h3>
                </div>
                <p className="text-[#9ca3af] text-sm leading-6">{description}</p>
            </div>
        </div>
    );
};

const RedditServiceCards = () => {
  return null;
};

export default RedditServiceCards;
