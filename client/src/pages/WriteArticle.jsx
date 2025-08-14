import { Edit, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      const { data } = await axios.post(
        "/api/ai/generate-article",
        {
          prompt,
          length: selectedLength.length,
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Article Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create compelling, well-structured articles with the power of
            artificial intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Configuration Panel */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl"></div>
            <form
              onSubmit={onSubmitHandler}
              className="relative backdrop-blur-xl bg-white/70 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Article Configuration
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    Configure your AI-powered article
                  </p>
                </div>
              </div>

              {/* Topic Input */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Article Topic
                </label>
                <div className="relative">
                  <input
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className="w-full p-4 px-5 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl outline-none text-gray-800 placeholder-gray-400 focus:border-blue-400/50 focus:bg-white/70 transition-all duration-300 shadow-inner"
                    placeholder="The future of artificial intelligence is ..."
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Length Selection */}
              <div className="mb-10">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Article Length
                </label>
                <div className="flex gap-3 flex-wrap">
                  {articleLength.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedLength.text === item.text
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                          : "bg-white/50 backdrop-blur-sm text-gray-600 border border-white/30 hover:bg-white/70 hover:border-blue-300/50"
                      }`}
                      onClick={() => setSelectedLength(item)}
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white shadow-xl transition-all duration-300 transform ${
                  input.trim()
                    ? "bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Edit className="w-5 h-5" />
                )}
                <span className="text-lg">Generate Article</span>
              </button>
            </form>
          </div>

          {/* Generated Content Panel */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl"></div>
            <div className="relative backdrop-blur-xl bg-white/70 border border-white/20 rounded-3xl p-8 shadow-2xl min-h-[600px] max-h-[800px] flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                  <Edit className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Generated Article
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    AI-powered content creation
                  </p>
                </div>
              </div>

              {/* Content Area */}
              {!content ? (
                <div className="flex-1 flex justify-center items-center">
                  <div className="text-center">
                    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl mb-6 inline-block">
                      <Edit className="w-16 h-16 text-gray-300 mx-auto" />
                    </div>
                    <p className="text-gray-400 text-lg font-medium mb-2">
                      Ready to create amazing content?
                    </p>
                    <p className="text-gray-400">
                      Enter a topic and click "Generate Article" to get started
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto">
                  <div className="prose prose-lg max-w-none">
                    <div className="reset-tw">
                      <Markdown>
                        {content}
                      </Markdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
