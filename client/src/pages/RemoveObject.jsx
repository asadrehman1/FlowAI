import { Scissors, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (object.split(" ").length > 1) {
        return toast("Please enter only one object name");
      }

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("object", object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 p-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20">
            <Scissors className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          AI Object Remover
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Seamlessly remove unwanted objects from your images with precision AI
          technology
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 hover:shadow-3xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Object Removal Configuration
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Upload Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept="image/*"
                  className="w-full p-4 text-sm rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 backdrop-blur-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white hover:file:from-blue-600 hover:file:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Describe object name to remove
              </label>
              <textarea
                onChange={(e) => setObject(e.target.value)}
                value={object}
                rows={4}
                className="w-full p-4 text-sm rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:bg-white/70"
                placeholder="e.g., watch or spoon, Only single object name"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!selectedFile || loading}
              className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white shadow-xl transition-all duration-300 ${
                selectedFile
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Scissors className="w-5 h-5" />
              )}
              Remove Object
            </button>
          </div>
        </form>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
              <Scissors className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Processed Image
            </h2>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center min-h-96">
              <div className="text-center space-y-4">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-100/50 to-purple-100/50 backdrop-blur-sm border border-white/20 inline-block">
                  <Scissors className="w-16 h-16 text-blue-400" />
                </div>
                <p className="text-gray-500 max-w-xs">
                  Upload an image and click "Remove Object" to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src={content || "/placeholder.svg"}
                  alt="Processed image"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
