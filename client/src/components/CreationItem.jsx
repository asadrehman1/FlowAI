import { useState } from "react";
import Markdown from "react-markdown";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Tag,
  Download,
  CheckCircle,
  Copy,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useCopyToClipboard } from "usehooks-ts";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, copy] = useCopyToClipboard();

  const codeReviewData =
    item.type === "code-review" && typeof item.content === "string"
      ? JSON.parse(item.content)
      : item.content;

  const handleDownload = async () => {
    try {
      const response = await fetch(item.content);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;

      const cleanPrompt = item.prompt
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50);

      const timestamp = new Date().toISOString().slice(0, 10);
      const extension = blob.type.split("/")[1] || "png";
      const filename = `${cleanPrompt}-${timestamp}.${extension}`;

      link.download = filename;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(item.content, "_blank");
    }
  };

  return (
    <div className="group relative overflow-hidden max-w-5xl bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div
        onClick={() => setExpanded(!expanded)}
        className="relative p-6 cursor-pointer"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h2 className="font-semibold text-lg text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-200">
              {item.prompt}
            </h2>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 rounded-full text-xs font-medium">
                  {item.type}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {item.type === "image" && expanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                className="p-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-emerald-200/50 hover:shadow-md transition-all duration-200"
                title="Download image"
              >
                <Download className="w-5 h-5 text-emerald-600" />
              </button>
            )}
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-white/50 group-hover:shadow-md transition-all duration-200">
              {expanded ? (
                <ChevronUp className="w-5 h-5 text-blue-600 transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-600 transition-transform duration-200" />
              )}
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            expanded ? "max-h-[1000px] opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          {item.type === "image" ? (
            <div className="p-4 bg-gradient-to-br from-gray-50/50 to-blue-50/30 rounded-xl border border-white/30">
              <img
                src={item.content || "/placeholder.svg"}
                alt="Generated content"
                className="w-full max-w-md rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          ) : item.type === "code-review" ? (
            <div className="space-y-6">
              {/* Fixed Code */}
              {codeReviewData?.fixedCode && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h3 className="font-semibold text-lg text-gray-800">
                        Fixed Code
                      </h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copy(codeReviewData.fixedCode);
                      }}
                      className="flex items-center cursor-pointer gap-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <SyntaxHighlighter
                    language={codeReviewData.language || "python"}
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
                    {codeReviewData.fixedCode}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-gradient-to-br from-gray-50/50 to-purple-50/30 rounded-xl border border-white/30">
              <div className="text-sm text-slate-700 prose prose-sm max-w-none">
                <div className="reset-tw">
                  <Markdown>{item.content}</Markdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreationItem;
