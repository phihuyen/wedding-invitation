import {motion, AnimatePresence} from "framer-motion";
import Confetti from "react-confetti";
import Marquee from "@/components/ui/marquee";
import {
  Calendar,
  Clock,
  ChevronDown,
  User,
  MessageCircle,
  Send,
  Smile,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";
import {useState, useEffect} from "react";
import {formatEventDate} from "@/lib/formatEventDate";
import config from "@/config/config";

// Use proxy in development, full URL in production
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return "/api"; // Use proxy in development (configured in vite.config.js)
  }
  // In production, use the full Google Apps Script URL
  return `https://script.google.com/macros/s/${config.appScriptKey}/exec`;
};

const API_URL = getApiUrl();

export default function Wishes() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [newWish, setNewWish] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendance, setAttendance] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wishes, setWishes] = useState([]);

  const options = [
    {value: "ATTENDING", label: "Tham dự"},
    {value: "NOT_ATTENDING", label: "Không tham dự"},
    {value: "MAYBE", label: "Có thể"},
  ];

  // Fetch wishes from Google Sheets on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setWishes(data.reverse()))
      .catch(console.error);
  }, []);

  const handleSubmitWish = async (e) => {
    e.preventDefault();
    if (!newWish.trim() || !name.trim() || !attendance) return;
    setIsSubmitting(true);
    const wishData = {
      name,
      phone_number: phone,
      message: newWish,
      attendance,
    };
    try {
      await fetch(API_URL, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(wishData),
      });
      // Refetch wishes after submit
      const res = await fetch(API_URL);
      const data = await res.json();
      setWishes(data.reverse());
      setNewWish("");
      setName("");
      setPhone("");
      setAttendance("");
      setIsSubmitting(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (err) {
      setIsSubmitting(false);
      alert("Có lỗi xảy ra khi gửi lời chúc!");
    }
  };
  const getAttendanceIcon = (status) => {
    switch (status) {
      case "attending":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "not-attending":
        return <XCircle className="w-4 h-4 text-rose-500" />;
      case "maybe":
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      default:
        return null;
    }
  };
  return (
    <>
      <section id="wishes" className="min-h-screen relative overflow-hidden">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        <div className="container mx-auto px-4 py-10 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="text-center space-y-4 mb-8"
          >
            <motion.h2
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.3}}
              className="text-3xl font-serif text-gray-800"
            >
              Gửi lời chúc
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{scale: 0}}
              animate={{scale: 1}}
              transition={{delay: 0.4}}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <MessageCircle className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Wishes List */}
          <div className="max-w-2xl mx-auto space-y-6">
            <AnimatePresence>
              <Marquee speed={20} className="[--duration:20s] py-2">
                {wishes.map((wish, index) => (
                  <motion.div
                    key={index}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{delay: index * 0.1}}
                    className="group relative w-[280px]"
                  >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />

                    {/* Card content */}
                    <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md">
                      {/* Header */}
                      <div className="flex items-start space-x-3 mb-2">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                            {wish.name[0].toUpperCase()}
                          </div>
                        </div>

                        {/* Name, Time, and Attendance */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-800 text-sm truncate">
                              {wish.name}
                            </h4>
                            {getAttendanceIcon(wish.attending)}
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500 text-xs">
                            <Clock className="w-3 h-3" />
                            <time className="truncate">
                              {formatEventDate(wish.timestamp)}
                            </time>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3">
                        {wish.message}
                      </p>

                      {/* Optional: Time indicator for recent messages */}
                      {Date.now() - new Date(wish.timestamp).getTime() <
                        3600000 && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-medium">
                            New
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </Marquee>
            </AnimatePresence>
          </div>
          {/* Wishes Form */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.5}}
            className="max-w-2xl mx-auto mt-12"
          >
            <form onSubmit={handleSubmitWish} className="relative">
              <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                <div className="space-y-2">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <User className="w-4 h-4" />
                      <span>Tên của bạn</span>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập tên của bạn..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                      required
                    />
                  </div>
                  <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.1}}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Bạn sẽ tham dự chứ?</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {options.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setAttendance(option.value)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm
                                                    ${attendance === option.value ? "bg-rose-50 text-rose-600" : "bg-white/50 border-rose-100 text-gray-700 hover:bg-rose-50"}`}
                        >
                          <input
                            type="checkbox"
                            readOnly
                            checked={attendance === option.value}
                            className="w-4 h-4 rounded"
                          />
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                  {/* Phone Input */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <User className="w-4 h-4" />
                      <span>Số điện thoại</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Nhập số điện thoại"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  {/* Wish Textarea */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Lời chúc của bạn</span>
                    </div>
                    <textarea
                      placeholder="Gửi lời chúc và lời nhắn tới cô dâu chú rể..."
                      className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                      value={newWish}
                      onChange={(e) => setNewWish(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Smile className="w-5 h-5" />
                    <span className="text-sm">Gửi lời chúc của bạn</span>
                  </div>
                  <motion.button
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                    ${
                      isSubmitting
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-rose-500 hover:bg-rose-600"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Đang gửi..." : "Hoàn thành"}</span>
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
