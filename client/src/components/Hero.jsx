import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 text-center mb-6 animate-fade-in-up">
        <h1 className="text-2xl sm:text-4xl md:text-5xl 2xl:text-7xl font-semibold mx-auto leading-[1.2] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent animate-gradient-x">
          Create Amazing content with <br />
          <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
            AI tools
          </span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600 animate-fade-in-up delay-300">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs animate-fade-in-up delay-500">
        <button
          onClick={() => navigate("/ai")}
          className="group relative bg-gradient-to-r from-primary to-purple-600 text-white px-10 py-3 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">Start creating now</span>
        </button>
      </div>

      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600 animate-fade-in-up delay-700">
        <img
          src={assets.user_group || "/placeholder.svg"}
          alt=""
          className="h-8 transform transition-transform duration-300 hover:scale-110"
        />
        <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
          Trusted by 10k+ people
        </span>
      </div>
    </div>
  );
};

export default Hero;
