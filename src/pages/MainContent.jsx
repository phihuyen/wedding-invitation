import Hero from '@/pages/Home'
import Events from '@/pages/Events'
import Location from '@/pages/Location';
import Wishes from '@/pages/Wishes';
import Gifts from '@/pages/Gifts';
import Gallery from '@/pages/Gallery';

// Main Invitation Content
export default function MainContent() {
    return (
        <>
            <Hero />
            <Events />
            {/* <Location /> */}
            <Gallery />
            <Wishes />
            <Gifts />
        </>
    )
}