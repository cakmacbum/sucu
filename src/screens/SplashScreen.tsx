import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export function SplashScreen() {
  const navigate = useNavigate();
  const { profile } = useApp();
  const { t } = useLanguage();

  const handleStart = () => {
    if (profile) {
      navigate('/home');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-[100dvh] w-full flex flex-col items-center justify-between py-12 sm:py-20 bg-gradient-to-b from-surface-container-low to-surface-container-lowest overflow-hidden"
    >
      {/* App Identity */}
      <header className="flex flex-col items-center space-y-2 z-10">
        <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tighter">Fluidity</h1>
        <p className="font-label text-secondary text-xs uppercase tracking-[0.3em]">Pure Hydration</p>
      </header>

      {/* Center: Realistic Glass Component */}
      <div className="relative w-40 h-60 sm:w-48 sm:h-72 z-10">
        {/* Glass Vessel */}
        <div className="absolute inset-0 border-4 border-white/40 glass-blur bg-white/10 rounded-b-3xl rounded-t-lg shadow-xl overflow-hidden">
          {/* Liquid Filling Effect */}
          <motion.div 
            initial={{ height: "0%" }}
            animate={{ height: "80%" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary to-primary-container"
          >
            {/* Wave surface */}
            <div className="absolute -top-4 left-0 w-full h-8 bg-primary-container rounded-[50%] blur-sm opacity-60"></div>
          </motion.div>
        </div>

        {/* Splash Visual */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 flex justify-around items-end">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-4 bg-primary-container rounded-full opacity-40 translate-y-4"></motion.div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.2 }} className="w-3 h-6 bg-primary rounded-full -translate-y-4"></motion.div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.4 }} className="w-2 h-4 bg-primary-container rounded-full translate-y-2"></motion.div>
        </div>

        {/* Reflections on Glass */}
        <div className="absolute top-4 left-4 w-2 h-24 sm:h-32 bg-white/20 rounded-full blur-[1px]"></div>
      </div>

      {/* Progress/Instruction */}
      <footer className="w-full max-w-xs flex flex-col items-center space-y-6 sm:space-y-8 z-10">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-primary-fixed"></div>
            <div className="w-2 h-2 rounded-full bg-primary-fixed"></div>
          </div>
          <p className="text-secondary font-medium text-center px-4 leading-relaxed text-xs sm:text-sm">
            Calculating your daily water goals based on your local climate and activity.
          </p>
        </div>

        <button 
          onClick={handleStart}
          className="w-full py-3 sm:py-4 px-8 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 transition-transform active:scale-95 group"
        >
          <span className="tracking-wide text-sm sm:text-base">{t('getStarted')}</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>

      {/* Atmospheric Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[5%] left-[-20%] w-[500px] h-[500px] bg-tertiary-container/5 rounded-full blur-[120px] -z-10"></div>
    </motion.main>
  );
}
