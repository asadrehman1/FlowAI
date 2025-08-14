import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AITools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="px-4 sm:px-20 xl:px-32 mb-30 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <h2 className="text-[42px] font-semibold bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 bg-clip-text text-transparent">
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

      <div className="flex flex-wrap mt-10 justify-center relative z-10">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="group p-8 m-4 max-w-xs rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/30 hover:border-white/50 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden relative"
            onClick={() => user && navigate(tool.path)}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Glassy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Animated background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <tool.Icon
                  className="w-12 h-12 p-3 text-white rounded-xl shadow-lg"
                  style={{
                    background: `linear-gradient(135deg,${tool.bg.from},${tool.bg.to})`,
                  }}
                />
              </div>
              <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                {tool.title}
              </h3>
              <p className="text-gray-400 text-sm max-w-[95%] group-hover:text-gray-500 transition-colors duration-300">
                {tool.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AITools;
