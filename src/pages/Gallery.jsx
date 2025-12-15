import {motion} from "framer-motion";
import {Heart} from "lucide-react";
import {useState, useEffect, useRef} from "react";

function CardSlider({images = [], width = 640, height = 480}) {
  const [index, setIndex] = useState(0);
  const total = images.length || 0;
  const timer = useRef(null);

  useEffect(() => {
    if (total <= 1) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % total), 2000);
    return () => clearInterval(timer.current);
  }, [total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // compute indices for prev, current, next (safe for small arrays)
  const current = index % total;
  const prevIndex = (current - 1 + total) % total;
  const nextIndex = (current + 1) % total;
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-[720px]">
        <div
          className="relative h-0"
          style={{paddingBottom: `${(height / width) * 130}%`}}
        >
          {/* Left sub (prev) - positioned at ~15% */}
          {total > 1 && (
            <img
              src={images[prevIndex]}
              alt={`prev-${prevIndex}`}
              className="absolute top-1/4 object-cover rounded-lg shadow-md transition-all duration-500 -translate-y-1/2"
              style={{
                left: "15%",
                width: "32%",
                transform: "translateX(-50%) scale(0.82)",
                zIndex: 10,
                opacity: 0.95,
              }}
            />
          )}

          {/* Center main */}
          {total > 0 && (
            <img
              src={images[current]}
              alt={`current-${current}`}
              className="absolute object-cover rounded-xl shadow-xl transition-all duration-500 -translate-y-1/2"
              style={{
                left: "50%",
                width: "58%",
                transform: "translateX(-50%) scale(1)",
                zIndex: 20,
                opacity: 1,
              }}
            />
          )}

          {/* Right sub (next) - positioned at ~85% */}
          {total > 1 && (
            <img
              src={images[nextIndex]}
              alt={`next-${nextIndex}`}
              className="absolute top-1/4 object-cover rounded-lg shadow-md transition-all duration-500 -translate-y-1/2"
              style={{
                left: "85%",
                width: "32%",
                transform: "translateX(-50%) scale(0.82)",
                zIndex: 10,
                opacity: 0.95,
              }}
            />
          )}
        </div>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}

const section1Images = ["./images/anh-1.jpg"];
const section2Images = ["./images/anh-2.jpg"];
const section3Images = [
  "./images/anh-3.jpg",
  "./images/anh-4.jpg",
  "./images/anh-6.jpg",
  "./images/anh-7.jpg",
  "./images/anh-8.jpg",
  "./images/anh-9.jpg",
];

export default function Gallery() {
  return (
    <section id="image" className="min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-10 relative z-10 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
          className="text-center space-y-4 mb-8"
        >
          <motion.span
            initial={{opacity: 0, y: 10}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.2}}
            className="text-3xl font-serif text-gray-800"
          >
            Hành trình bên nhau
          </motion.span>

          {/* Decorative Line */}
          <motion.div
            initial={{scale: 0}}
            whileInView={{scale: 1}}
            viewport={{once: true}}
            transition={{delay: 0.5}}
            className="flex items-center justify-center gap-4 mt-6"
          >
            <div className="h-[1px] w-12 bg-rose-200" />
            <div className="text-rose-400">
              <Heart className="w-4 h-4" fill="currentColor" />
            </div>
            <div className="h-[1px] w-12 bg-rose-200" />
          </motion.div>
        </motion.div>

        {/* Section 1: image left, text right (responsive) - static */}
        <div className="flex flex-col items-center w-full mb-8 pl-2 pr-2 gap-6">
          <div className="w-full max-w-2xl">
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <img
                src={section1Images[0]}
                alt="Section 1"
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          <div className="w-full">
            <div className="text-left  content-center text-center">
              <h2 className="text-lg font-serif text-rose-600">
                Bắt đầu từ nơi làm việc ...
              </h2>
              {/* <p className="text-gray-600">Những kỷ niệm nhỏ, những lần đưa nhau đi làm, cà phê, và những buổi tối trên ban công chung cư đã dần chắp cánh cho chúng tớ.</p> */}
            </div>
          </div>
        </div>

        {/* Section 2: static grid */}
        {/* Section 2: image left, text right (same layout as section 1) */}
        <div className="flex flex-col items-center w-full pl-2 pr-2 gap-6">
          <div className="max-w-2xl">
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <img
                src={section2Images[0]}
                alt="Section 2"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="">
            <div className="text-left content-center text-center">
              <h2 className="text-lg italic font-serif text-rose-600">
                ... đến những ngày tháng và cuộc sống bên nhau tại Nhật Bản xa
                xôi
              </h2>
              {/* <p className="text-gray-600">Chúng tớ đã khám phá nhiều nơi cùng nhau — từ những chuyến đi cuối tuần đến những kỷ niệm nhỏ trên đường.</p> */}
            </div>
          </div>
        </div>

        {/* Section 3: heart mosaic from multiple images */}
        <div className="w-full mb-12">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-serif text-rose-600 mb-2 italic">
              Và cuối cùng là lễ đuờng
            </h2>
          </div>
          <div className="mx-auto w-full max-w-4xl">
            {/* Card slider layer for Section 3 */}
            <CardSlider images={section3Images} width={720} height={480} />
          </div>
        </div>
      </div>
    </section>
  );
}
