import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="relative w-full mt-20 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient">
      {/* Content container */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 flex flex-col items-center text-gray-600 relative z-10 border-t border-white/30">
        {/* Logo & description */}
        <div className="flex flex-col items-center max-w-xl text-center animate-fade-in-up">
          <img
            className="h-20 transform transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
            src={assets.logo || "/placeholder.svg"}
            alt="logo"
          />
          <p className="mt-6 text-sm md:text-base leading-relaxed">
            Experience the power of AI with{" "}
            <span className="font-semibold">FlowAI</span>. <br />
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>
        </div>

        {/* Contact Email */}
        <p className="mt-2 text-xs md:text-sm text-gray-500 animate-fade-in-up delay-700">
          Contact:{" "}
          <a
            href="mailto:asadrehman2321@gmail.com"
            className="text-blue-600 hover:underline"
          >
            asadrehman2321@gmail.com
          </a>
        </p>

        {/* Copyright */}
        <p className="pt-8 text-xs md:text-sm text-gray-500 animate-fade-in-up delay-500">
          © {new Date().getFullYear()} Asad Rehman. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
