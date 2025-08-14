import { FileTextIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", selectedFile);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 p-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
          AI Resume Reviewer
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get professional insights and recommendations to enhance your resume
          with AI-powered analysis
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 h-fit"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Resume Configuration
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Upload Resume
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept="application/pdf"
                  className="w-full p-4 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-emerald-300/50 hover:border-emerald-400/70 transition-all duration-300 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-emerald-500 file:to-teal-500 file:text-white hover:file:from-emerald-600 hover:file:to-teal-600 file:cursor-pointer file:transition-all file:duration-300"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <FileTextIcon className="w-3 h-3" />
                Supports PDF resume only
              </p>
            </div>

            <button
              type="submit"
              disabled={!selectedFile || loading}
              className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white shadow-xl transition-all duration-300 ${
                selectedFile
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-2xl hover:shadow-emerald-500/25 active:scale-[0.98] transform"
                  : "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <FileTextIcon className="w-5 h-5" />
              )}
              <span className="text-lg">Review Resume</span>
            </button>
          </div>
        </form>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 flex flex-col min-h-[500px] max-h-[700px]">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm">
              <FileTextIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Analysis Results
            </h2>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-center space-y-4">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-100/50 to-teal-100/50 backdrop-blur-sm border border-emerald-200/30 inline-block">
                  <FileTextIcon className="w-12 h-12 text-emerald-400 mx-auto" />
                </div>
                <p className="text-gray-500 max-w-xs">
                  Upload a resume and click "Review Resume" to get professional
                  insights and recommendations
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
