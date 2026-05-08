import Welcoming from './components/landing/Welcoming';
import LandingFooter from './components/landing/LandingFooter';
import LandingHeader from './components/landing/LandingHeader';

const Landing = () => {


    return (
        <div className="min-h-screen bg-linear-to-br from-[#0A1929] via-[#0F2A3F] to-[#1A3A5F] text-white">
            {/* Header */}
            <LandingHeader />

            {/* Hero Section */}
            <Welcoming />


            {/* Footer */}
            <LandingFooter />
        </div>
    );
};

export default Landing;