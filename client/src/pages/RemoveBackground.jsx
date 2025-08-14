import { Eraser, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/40 p-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
          AI Background Remover
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Remove backgrounds from your images instantly with AI-powered
          precision
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Upload Form Panel */}
        <div className="group">
          <form
            onSubmit={onSubmitHandler}
            className="backdrop-blur-xl bg-white/70 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/80"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-white/20">
                <Sparkles className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Upload Configuration
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    accept="image/*"
                    className="w-full p-4 rounded-2xl border-2 border-dashed border-orange-200 bg-gradient-to-r from-orange-50/50 to-red-50/50 backdrop-blur-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-orange-500 file:to-red-500 file:text-white file:font-medium hover:border-orange-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">
                  Supports JPG, PNG, and other image formats
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!selectedFile || loading}
                  className={`w-full group relative overflow-hidden rounded-2xl px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-300 ${
                    selectedFile && !loading
                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Eraser className="w-5 h-5 transition-transform group-hover:scale-110" />
                    )}
                    <span className="text-lg">
                      {loading ? "Processing..." : "Remove Background"}
                    </span>
                  </div>
                  {selectedFile && !loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results Panel */}
        <div className="group">
          <div className="backdrop-blur-xl bg-white/70 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/80 min-h-[500px] flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-white/20">
                <Eraser className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Processed Image
              </h2>
            </div>

            {!content ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="p-6 rounded-full bg-gradient-to-r from-orange-100 to-red-100 w-fit mx-auto">
                    <Eraser className="w-12 h-12 text-orange-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 font-medium">
                      Ready to process
                    </p>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                      Upload an image and click "Remove Background" to get
                      started
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="relative group/image">
                  <img
                    src={content || "/placeholder.svg"}
                    alt="Processed image"
                    className="max-w-full max-h-96 rounded-2xl shadow-xl transition-transform duration-300 group-hover/image:scale-105"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
