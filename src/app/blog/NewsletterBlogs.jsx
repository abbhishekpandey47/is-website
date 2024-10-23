import { Input } from "../../Components/ui/input"

export default function NewsletterBlogs() {
  return (
    <div className="max-w-6xl max-sm:flex-col max-sm:p-8 max-sm:text-center max-md:max-w-xl justify-between mt-6 py-12 mx-auto p-4 flex rounded-lg shadow-sm readytostart">
      <div className="flex items-center  space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <svg
            className=" w-6 h-6 text-blue-600"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </div>
        <div className="space-y-1 flex-grow">
          <h2 className="text-xl quicksand-bold text-white">Want the latest News about Infrasity?</h2>
          <p className="text-[wheat] quicksand-medium">
            Get access to monthly development updates, exciting new projects and much much more.
          </p>
        </div>
      </div>
      <form className="mt-4 sm:flex sm:items-center">
        <Input
          className="w-full sm:max-w-xs text-white text-md quicksand-medium border-[#999]"
          placeholder="Enter your email"
          type="email"
        />
        <button className="bg-[#0A66C2] btn mx-2 text-white quicksand-light text-sm h-[30px] leading-5 max-w-[480px] min-h-[40px] px-3 py-0 rounded-full inline-flex items-center justify-center transition duration-150 ease-in-out hover:bg-[#16437E] focus:bg-[#16437E] active:bg-[#09223b] active:text-white/70 disabled:bg-black/20 disabled:text-black/50 disabled:cursor-not-allowed max-sm:mt-5">
          Subscribe
        </button>
      </form>
    </div>
  )
}