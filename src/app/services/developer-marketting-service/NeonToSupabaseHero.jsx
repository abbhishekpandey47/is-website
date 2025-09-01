"use client";
import Image from "next/image";
import Link from "next/link";

export default function NeonToSupabaseHero() {
  return (
    <section className="w-full relative mx-auto py-6 lg:py-10 overflow-hidden">
      <div className="container mx-auto grid grid-cols-12 gap-8 px-6 lg:px-16 xl:px-20">
        
        {/* Left Content */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
          <span className="mb-4 specialtext font-mono uppercase">
            Moving from Neon to Supabase
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold tracking-tight">
            Neon users switch to Supabase for a complete Postgres experience
          </h1>

          <div className="mt-6 space-y-4 ">
            <p className="lg:text-lg max-w-lg text-zinc-400">
              Supabase is a composable stack for modern applications: Postgres
              Database, built-in Auth, Real-time sync, Edge Functions, Storage,
              and a powerful developer experience.
            </p>
            <p className="lg:text-lg max-w-lg text-zinc-400">
              Supabase is the preferred foundation for high-performance,
              high-scale SaaS, AI-native apps, data-intensive tools, and more.
            </p>
          </div>

           <div className="mt-6 flex flex-col items-start justify-center gap-y-8">
                       <div className="mt-10 gap-4 justify-left items-center">
                         <Link
                           href="/contact"
                           className="group relative inline-flex rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
                         >
                           <span className="absolute inset-0 overflow-hidden rounded-full">
                             <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(108,91,233,0.6)_0%,rgba(108,91,233,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                           </span>
                           <div className="relative z-10 rounded-full bg-zinc-950 px-6 py-2 ring-1 ring-white/10">
                             Start your migration
                           </div>
                           <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#6c5be9]/0 via-[#6c5be9]/90 to-[#6c5be9]/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                         </Link>
                       </div>
                     </div> 
        </div>

        {/* Right Image */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-6 xl:col-start-7 flex items-center justify-center mt-8 lg:mt-0">
          <Image
            src="https://supabase.com/images/solutions/neon/neon-hero-dark.svg"
            alt="Neon to Supabase illustration"
            width={500}
            height={400}
            className="max-w-[500px] max-h-[400px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
