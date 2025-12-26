import config from "@/config/config";
import {motion} from "framer-motion";
import {Copy, Gift, CheckCircle, Wallet, Building2} from "lucide-react";
import {useState, useEffect} from "react";

export default function Gifts() {
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Set animation to run once on component mount
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  const copyToClipboard = (text, bank) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(bank);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <>
      <section id="gifts" className="min-h-screen relative overflow-hidden">
        <div className="container mx-auto px-4 py-10 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={hasAnimated ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8}}
            className="text-center space-y-4 mb-8"
          >
            <motion.h2
              initial={{opacity: 0, y: 20}}
              animate={hasAnimated ? {opacity: 1, y: 0} : {}}
              transition={{delay: 0.3}}
              className="text-3xl font-serif text-gray-800"
            >
              Gửi quà mừng
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{scale: 0}}
              animate={hasAnimated ? {scale: 1} : {}}
              transition={{delay: 0.4}}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <Gift className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Bank Accounts Grid */}
          <div className="max-w-2xl mx-auto grid gap-2">
            {config.data.banks.map((account, index) => (
              <motion.div
                key={account.accountNumber}
                initial={{opacity: 0, y: 20}}
                animate={hasAnimated ? {opacity: 1, y: 0} : {}}
                transition={{delay: 0.2 * index + 0.7}}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
                <div className="relative backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-white p-2 shadow-sm">
                        <Building2 className="w-full h-full text-rose-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {account.bank}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {account.accountName}
                        </p>
                      </div>
                    </div>
                    <Wallet className="w-5 h-5 text-rose-400" />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between bg-gray-50/80 px-4 py-3 rounded-lg">
                      <p className="font-mono text-gray-700">
                        {account.accountNumber}
                      </p>
                      <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={() =>
                          copyToClipboard(
                            account.accountNumber,
                            account.accountName
                          )
                        }
                        className="flex items-center space-x-1 text-rose-500 hover:text-rose-600"
                      >
                        {copiedAccount === account.accountName ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {copiedAccount === account.accountName
                            ? "Đã sao chép!"
                            : "Sao chép"}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Container */}
          <motion.div
            initial={{opacity: 0}}
            animate={hasAnimated ? {opacity: 1} : {}}
            transition={{delay: 0.5}}
            className="space-y-4 max-w-md mx-auto content-center text-center mt-12"
          >
            {/* Vietnamese Wedding Wish */}
            <p className="italic font-serif text-gray-800">
              Cảm ơn tấm lòng của bạn!
            </p>
          </motion.div>

          {/* Message Container */}
          <motion.div
            initial={{opacity: 0}}
            animate={hasAnimated ? {opacity: 1} : {}}
            transition={{delay: 0.5}}
            className="space-y-4 max-w-md mx-auto content-center text-center mt-12"
          >
            {/* Vietnamese Wedding Wish */}
            {/* <p className="italic text-gray-800">
              Chi tiết về lịch trình và phương tiện di chuyển từ Hà Nội sẽ cập
              nhật ở đây:
              <a
                href="Excel URL"
                target="_blank"
                className="text-rose-500 underline hover:text-rose-600"
              >
                Fill URL here
              </a>
            </p> */}
          </motion.div>
        </div>
      </section>
    </>
  );
}
