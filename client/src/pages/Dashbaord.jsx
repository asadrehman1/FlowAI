import { useEffect, useState, useCallback } from "react";
import {
  Gem,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import Pagination from "../components/Pagination";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [creationsCount, setCreationsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const { getToken } = useAuth();

  const getDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get(
        `/api/user/get-user-creations?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setCreations(data.creations);
        setTotalPages(data.totalPages);
        setCreationsCount(data.total);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [getToken, page]);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="h-full overflow-y-scroll p-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your AI creations and monitor your creative journey
          </p>
        </div>

        <div className="flex justify-center gap-6 flex-wrap mb-8">
          {/* Total Creations Card */}
          <div className="group relative overflow-hidden w-80 p-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <div className="relative flex justify-between items-center">
              <div className="text-slate-700">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Creations
                </p>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {creationsCount}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex justify-center items-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Active Plan Card */}
          <div className="group relative overflow-hidden w-80 p-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
            <div className="relative flex justify-between items-center">
              <div className="text-slate-700">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Active Plan
                </p>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  <Protect plan="premium" fallback="Free">
                    Premium
                  </Protect>
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex justify-center items-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <Gem className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-800">
              Recent Creations
            </h3>
          </div>
          {loading ? (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                <p className="text-gray-600 font-medium">
                  Loading creations...
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {creations?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    No Creations Yet
                  </h3>
                  <p className="text-gray-600 text-center max-w-md mb-6 leading-relaxed">
                    Start your creative journey! Generate your first AI creation
                    to see it appear here.
                  </p>
                  <div className="text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    💡 Tip: Try generating articles, images, or other AI content
                    to populate your dashboard
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  {creations?.map((item) => (
                    <div key={item.id} className="w-full max-w-4xl">
                      <CreationItem item={item} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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
      </div>
    </div>
  );
};

export default Dashboard;
