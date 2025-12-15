import {Calendar, Heart} from "lucide-react";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import config from "@/config/config";
import {formatEventDate} from "@/lib/formatEventDate";
import {useVenue} from "@/hooks/useVenue";

export default function Hero() {
  const [guestName, setGuestName] = useState("Anh/Chị/Bạn/Em");
  // venueConfig is used in commented code below (line 224) - kept for when code is uncommented
  // eslint-disable-next-line no-unused-vars
  const venueConfig = useVenue();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("guest");

    if (guestParam && guestParam.trim() !== "") {
      try {
        setGuestName(guestParam.replaceAll("-", " "));
      } catch (error) {
        console.error("Error decoding guest name:", error);
      }
    }
  }, []);

  const CountdownTimer = ({targetDate}) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    function calculateTimeLeft() {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          Ngày: Math.floor(difference / (1000 * 60 * 60 * 24)),
          Giờ: Math.floor((difference / (1000 * 60 * 60)) % 24),
          Phút: Math.floor((difference / 1000 / 60) % 60),
          Giây: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    }
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate]);

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        {Object.keys(timeLeft).map((interval) => (
          <motion.div
            key={interval}
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
          >
            <span className="text-xl sm:text-2xl font-bold text-rose-600">
              {timeLeft[interval]}
            </span>
            <span className="text-xs text-gray-500 capitalize">{interval}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  const FloatingHearts = () => {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 1.5],
              x: Math.random() * window.innerWidth,
              y: -100,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
            className="absolute"
          >
            <Heart
              className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${
                i % 3 === 0
                  ? "text-rose-400"
                  : i % 3 === 1
                    ? "text-pink-400"
                    : "text-red-400"
              }`}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      <section
        id="home"
        className="flex flex-col items-center justify-center px-4 text-center relative overflow-hidden"
      >
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          className="relative z-10 container mx-auto px-4 py-10"
        >
          <motion.div
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{delay: 0.2}}
            className="inline-block mx-auto"
          >
            <span className="font-serif px-4 py-1 text-lg bg-rose-50 text-rose-600 rounded-full border border-rose-200">
              Save the date
            </span>
          </motion.div>

          <div className="space-y-4 pt-6 italic">
            <motion.p
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.4}}
              className="text-gray-500 italic text-base sm:text-lg"
            >
              Lễ thành hôn của (con) chúng tôi
            </motion.p>

            <motion.h2
              initial={{scale: 0.8, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              transition={{delay: 0.6}}
              className="pt-4 pb-4 text-3xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600"
            >
              {config.data.groomName} & {config.data.brideName}
            </motion.h2>

            {/* Parents Info Row */}
            <motion.div className="flex flex-row justify-between text-gray-600 font-medium text-sm italic">
              <motion.p
                initial={{opacity: 0, x: -30}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.3}}
                className="flex-1 text-center"
              >
                NHÀ TRAI <br />
                <span className="font-light">
                  Ông: {config.data.parentGroom.dad}
                </span>
                <br />
                <span className="font-light">
                  Bà: {config.data.parentGroom.mom}
                </span>
              </motion.p>

              <motion.p
                initial={{opacity: 0, x: -30}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.3}}
                className="flex-1 text-center"
              >
                NHÀ GÁI <br />
                {config.data.parentBride.dad && (
                  <span className="font-light whitespace-nowrap">
                    Ông: {config.data.parentBride.dad}
                    {config.data.parentBride.dad_more && (
                      <span className="text-xs text-gray-400">
                        &nbsp;({config.data.parentBride.dad_more})
                      </span>
                    )}
                  </span>
                )}
                <br />
                {config.data.parentBride.mom && (
                  <span className="font-light">
                    Bà: {config.data.parentBride.mom}
                  </span>
                )}
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.8}}
            className="relative mt-6 sm:mt-8 max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-white/50 backdrop-blur-md rounded-2xl" />

            <div className="relative px-4 sm:px-8 py-8 sm:py-10 rounded-2xl border border-rose-100/50">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
              </div>

              <div className="space-y-6 text-center">
                <div className="space-y-3">
                  <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.9}}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4 text-rose-400" />
                    <span className="text-gray-700 font-medium">
                      {formatEventDate(config.data.date, "full")}
                    </span>
                  </motion.div>

                  {/* <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="flex items-center justify-center space-x-2"
                                    >
                                        <Clock className="w-4 h-4 text-rose-400" />
                                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                                            {venueConfig.time}
                                        </span>
                                    </motion.div> */}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-8 sm:w-12 bg-rose-200/50" />
                  <div className="w-2 h-2 rounded-full bg-rose-200" />
                  <div className="h-px w-8 sm:w-12 bg-rose-200/50" />
                </div>

                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 1.1}}
                  className="space-y-2"
                >
                  <p className="text-gray-500 font-serif italic text-sm">
                    Thân mời
                  </p>
                  {/* <p className="text-gray-600 font-medium text-sm">
                                        Anh/Chị/Bạn/Em
                                    </p> */}
                  <p className="text-rose-500 font-serif italic text-lg">
                    {guestName ? guestName : ""}
                  </p>
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
                <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
              </div>
            </div>

            <div className="absolute -top-2 -right-2 w-16 sm:w-24 h-16 sm:h-24 bg-rose-100/20 rounded-full blur-xl" />
            <div className="absolute -bottom-2 -left-2 w-16 sm:w-24 h-16 sm:h-24 bg-rose-100/20 rounded-full blur-xl" />
          </motion.div>

          <CountdownTimer targetDate={config.data.date} />

          <div className="pt-6 relative">
            <FloatingHearts />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                className="w-10 sm:w-12 h-10 sm:h-12 text-rose-500 mx-auto"
                fill="currentColor"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
