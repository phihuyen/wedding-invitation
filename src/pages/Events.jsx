import EventCards from '@/components/EventsCard'
import config from '@/config/config'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Events() {
    const [eventsToShow, setEventsToShow] = useState([]);

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const event_idx = params.get('event');
            let item = [];
            if (event_idx === 'hanhphuc'|| event_idx === 'chieu')
                item = [config.data.agenda[0]];
            else if (event_idx === 'vuimung' || event_idx === 'tatca')
                item = [config.data.agenda[1], config.data.agenda[2]];
            else 
                item = [config.data.agenda[2]];
            setEventsToShow(item);
            return;
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <>
            {/* Event Section */}
            <section id="event" className="relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 container mx-auto px-4 py-10"
                >
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-4 mb-8"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-block text-rose-500 font-medium mb-2"
                        >
                            Trân trọng kính mời tới dự
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-serif text-gray-800 leading-tight"
                        >
                            Bữa tiệc thân mật
                        </motion.h2>

                        {/* Decorative Line */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center gap-4 mt-6"
                        >
                            <div className="h-[1px] w-12 bg-rose-200" />
                            <div className="text-rose-400">
                                <Heart className="w-4 h-4" fill="currentColor" />
                            </div>
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </motion.div>
                    </motion.div>

                    {/* Events Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="max-w-2xl mx-auto"
                    >
                        <EventCards events={eventsToShow} />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-500 max-w-md mx-auto cntent-center text-center mt-8 italic"
                    >
                        Chúng tôi rất hân hạnh được đón tiếp bạn trong ngày vui trọng đại của chúng tôi.
                    </motion.p>
                </motion.div>
            </section>
        </>
    )
}