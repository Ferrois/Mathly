import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";
import Hero1Svg from "@/assets/Hero1.svg";
import Benefits from "@/components/Benefits";
import { AnimatedPage } from "@/components/AnimatedPage";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <AnimatedPage>
      <div className="flex container sm:w-5/6 justify-center sm:px-10 px-5">
        <section className="mt-2 bg-white">
          <div className="py-8 px-4 mx-auto text-center lg:py-16">
            <h3 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl">
              Conquer A-levels with confidence.
            </h3>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
              Interactive mathematical problem solving and guidance from a user-driven community of Singaporean math students.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              <Link
                href="/register"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300"
              >
                Start Learning
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
              <Link
                href="/register"
                className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
              >
                Start Guiding
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="inline-flex justify-center bg-gray-200 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 "
              >
                View
              </Link>
            </div>
          </div>
        </section>
        <Image src={Hero1Svg} width={200} height={200} alt="illustration" className="hidden sm:flex" />
      </div>
    </AnimatedPage>
  );
}
