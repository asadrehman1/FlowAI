import { useEffect, useState, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import {
  Heart,
  Users,
  Sparkles,
  Download,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Pagination from "../components/Pagination";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getToken } = useAuth();

  const fetchCreations = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get(
        `/api/user/get-published-creations?page=${page}&limit=8`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setCreations(data.creations);
        setTotalPages(data.totalPages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [getToken, page]);

  const checkPremiumStatus = useCallback(async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/check-premium-status", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setIsPremium(data.isPremium);
      }
    } catch (error) {
      console.error("Failed to check premium status:", error);
      setIsPremium(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (user) {
      fetchCreations();
      checkPremiumStatus();
    }
  }, [user, fetchCreations, checkPremiumStatus, page]);

  const imageLikeToggle = async (id) => {
    const prevCreations = [...creations];
    setCreations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.likes.includes(user.id)
                ? c.likes.filter((uid) => uid !== user.id)
                : [...c.likes, user.id],
            }
          : c
      )
    );

    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (!data.success) {
        setCreations(prevCreations);
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      setCreations(prevCreations);
      toast.error(error.message);
    }
  };

  const handleDownload = async (imageUrl, prompt) => {
    if (!isPremium) {
      toast.error("Requires Premium plan.");
      return;
    }

    try {
      const response = await fetch(imageUrl, {
        mode: "cors",
        credentials: "omit",
      });

      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const cleanPrompt = prompt
        ? prompt
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, "-")
            .substring(0, 50)
        : "ai-creation";

      const timestamp = new Date().toISOString().split("T")[0];
      const extension = blob.type.split("/")[1] || "png";
      link.download = `${cleanPrompt}-${timestamp}.${extension}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download image. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Community Gallery
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing AI-generated creations from our talented community
        </p>
      </div>

      {!loading ? (
        <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col min-h-[600px] relative">
          <div className="flex-grow">
            {creations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center p-6 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 shadow-lg">
                    <Sparkles className="w-16 h-16 text-blue-600" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      No Creations Yet
                    </h3>
                    <p className="text-gray-600 text-lg font-medium">
                      Be the first to share your amazing AI creations!
                    </p>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                      Create something incredible and make it public to appear
                      in the community gallery.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {creations.map((creation, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={creation.content || "/placeholder.svg"}
                        alt="creation content"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm mb-3 line-clamp-2 font-medium">
                          {creation.prompt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-white/80 text-sm">
                            <Users className="w-4 h-4" />
                            <span>Community</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(
                                  creation.content,
                                  creation.prompt
                                );
                              }}
                              className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => imageLikeToggle(creation.id)}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
                            >
                              <span className="text-sm font-medium">
                                {creation.likes.length}
                              </span>
                              <Heart
                                className={`w-4 h-4 transition-all duration-200 ${
                                  creation.likes.includes(user.id)
                                    ? "fill-red-500 text-red-500 scale-110"
                                    : "text-white hover:text-red-300"
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {creation.likes.includes(user.id) && (
                      <div className="absolute top-3 right-3 p-2 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-300/30">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
            <p className="text-gray-600 font-medium">
              Loading community creations...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
