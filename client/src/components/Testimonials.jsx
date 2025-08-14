import { assets, dummyTestimonialData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24 my-30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-blue-50/30 to-pink-50/50"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <h2 className="text-[42px] font-semibold bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 bg-clip-text text-transparent">
          Loved by Creators
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>

      <div className="flex flex-wrap mt-10 justify-center relative z-10">
        {dummyTestimonialData.map((testimonial, index) => (
          <div
            key={index}
            className="group p-8 m-4 max-w-xs rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl border border-white/30 hover:border-white/50 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden relative"
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          >
            {/* Glassy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Animated background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-1 transform transition-transform duration-300 group-hover:scale-105">
                {Array(5)
                  .fill(0)
                  .map((_, starIndex) => (
                    <img
                      key={starIndex}
                      src={
                        starIndex < testimonial.rating
                          ? assets.star_icon
                          : assets.star_dull_icon
                      }
                      className="w-4 h-4 transform transition-transform duration-300 hover:scale-125"
                      alt="star"
                    />
                  ))}
              </div>
              <p className="text-gray-500 text-sm my-5 group-hover:text-gray-600 transition-colors duration-300">
                "{testimonial.content}"
              </p>
              <hr className="mb-5 border-gray-300 group-hover:border-gray-400 transition-colors duration-300" />
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    className="w-12 object-contain rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    alt=""
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
