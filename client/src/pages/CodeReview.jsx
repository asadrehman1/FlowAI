import { Code2, Sparkles, CheckCircle, Bug, Copy } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useCopyToClipboard } from "usehooks-ts";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const CodeReview = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const { getToken } = useAuth();
  const [copied, copy] = useCopyToClipboard();

  const cleanedExplanation = reviewResult?.explanation
    .replace(/^of Changes Made.*\n?/, "")
    .trim(); 

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "typescript", label: "TypeScript" },
  ];

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setReviewResult(null);

      const { data } = await axios.post(
        "/api/ai/code-review",
        { code, language },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setReviewResult(data);
        toast.success("Code review completed!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (reviewResult?.fixedCode) {
      copy(reviewResult.fixedCode);
      toast.success("Copied fixed code!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 p-6 relative overflow-hidden">
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-gray-300">
            <Code2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          AI Code Reviewer
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get expert feedback on your code with AI-powered analysis and
          automatic fixes
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 relative z-10">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-300 shadow-2xl p-8 h-fit"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
              <Code2 className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Code Input
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-300 outline-none text-gray-700
             focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20
             hover:border-blue-400 hover:ring-0 shadow-none transition-none"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Your Code
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-300 outline-none text-gray-700 font-mono text-sm
             focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20
             hover:border-blue-400 hover:ring-0 shadow-none resize-none transition-none"
                placeholder="Paste your code here..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={!code || loading}
              className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white shadow-xl ${
                code
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 active:scale-[0.98]"
                  : "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              <span className="text-lg">
                {loading ? "Analyzing..." : "Review Code"}
              </span>
            </button>
          </div>
        </form>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-300 shadow-2xl p-8 flex flex-col min-h-[500px] max-h-[700px]">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Review Results
            </h2>
          </div>

          {!reviewResult ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-center space-y-4">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-100/50 to-purple-100/50 backdrop-blur-sm border border-gray-300 inline-block">
                  <Code2 className="w-12 h-12 text-blue-400" />
                </div>
                <p className="text-gray-500 max-w-xs">
                  Submit your code to get detailed feedback and suggested
                  improvements
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Bug className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-lg text-gray-800">
                    Identified Issues
                  </h3>
                </div>
                <div className="bg-red-50/50 border border-red-100 rounded-xl p-4">
                  <ul className="space-y-3 list-disc pl-5">
                    {reviewResult?.issues?.map((issue, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        <span className="font-medium">{issue.type}:</span>{" "}
                        {issue.description}
                        {issue.line && (
                          <span className="text-xs text-gray-500 ml-2">
                            (Line {issue.line})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h3 className="font-semibold text-lg text-gray-800">
                      Fixed Code
                    </h3>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-sm text-blue-600 px-3 py-1 rounded-lg"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div>
                  <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    customStyle={{
                      background: "rgba(255, 255, 255, 0.5)",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                    }}
                    showLineNumbers
                  >
                    {reviewResult?.fixedCode}
                  </SyntaxHighlighter>
                </div>
              </div>

              {reviewResult?.explanation && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-lg text-gray-800">
                      Explanation
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <div className="reset-tw">
                      <Markdown>{cleanedExplanation}</Markdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeReview;
