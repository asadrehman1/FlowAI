import { Hash, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;
      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            AI Title Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate compelling blog titles that capture attention and drive
            engagement
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Configuration Panel */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl"></div>
            <form
              onSubmit={onSubmitHandler}
              className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Title Configuration
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Keyword
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className="w-full p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 outline-none text-gray-700 placeholder-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300"
                    placeholder="Enter your topic or keyword..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {blogCategories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedCategory === item
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105"
                            : "bg-white/50 backdrop-blur-sm text-gray-600 border border-white/30 hover:border-purple-300 hover:bg-purple-50/50 hover:scale-105"
                        }`}
                        onClick={() => setSelectedCategory(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 ${
                    input.trim()
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Hash className="w-5 h-5" />
                  )}
                  Generate Title
                </button>
              </div>
            </form>
          </div>

          {/* Results Panel */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl min-h-[500px] flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-sm">
                  <Hash className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Generated Titles
                </h2>
              </div>

              {!content ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-100/50 to-pink-100/50 backdrop-blur-sm mb-6">
                    <Hash className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Enter a keyword and click "Generate Title" to get started
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto">
                  <div className="prose prose-purple max-w-none">
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

export default BlogTitles;
