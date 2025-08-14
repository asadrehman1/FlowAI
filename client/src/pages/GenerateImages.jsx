import { ImageIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyles = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState(imageStyles[0]);
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        {
          prompt,
          publish,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            AI Image Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your imagination into stunning visuals with AI-powered
            image generation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Configuration Panel */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
            <form onSubmit={onSubmitHandler} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Image Configuration
                </h2>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                  Describe Your Image
                </label>
                <textarea
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  rows={4}
                  className="w-full p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-300 outline-none text-gray-700 placeholder-gray-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 resize-none"
                  placeholder="A majestic dragon soaring through clouds at sunset..."
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                  Art Style
                </label>
                <div className="flex flex-wrap gap-3">
                  {imageStyles.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-sm ${
                        selectedStyle === style
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-300 shadow-lg shadow-emerald-200 scale-105"
                          : "bg-white/50 text-gray-600 border-white/30 hover:bg-white/70 hover:border-emerald-200 hover:text-emerald-600 hover:scale-105"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/20">
                <label className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={(e) => setPublish(e.target.checked)}
                    checked={publish}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-500 transition-all duration-300 shadow-inner"></div>
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></span>
                </label>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Make this image public
                  </p>
                  <p className="text-xs text-gray-500">
                    Share your creation with the community
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white shadow-2xl transition-all duration-300 ${
                  input.trim()
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-200 hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <ImageIcon className="w-5 h-5" />
                )}
                {loading ? "Generating..." : "Generate Image"}
              </button>
            </form>
          </div>

          {/* Generated Image Panel */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 min-h-[600px] hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm">
                <ImageIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Generated Image
              </h2>
            </div>

            {!content ? (
              <div className="flex-1 flex justify-center items-center h-96">
                <div className="text-center space-y-6">
                  <div className="p-6 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 backdrop-blur-sm mx-auto w-fit">
                    <ImageIcon className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-600">
                      Ready to create magic?
                    </p>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto">
                      Describe your vision and watch AI bring it to life in
                      stunning detail
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-2">
                  <img
                    src={content || "/placeholder.svg"}
                    alt="Generated artwork"
                    className="w-full h-auto rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-600">
                      Image generated successfully
                    </span>
                  </div>
                  {publish && (
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium rounded-full">
                      Public
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
