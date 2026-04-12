import { ArrowLeft, Pencil, User, Droplet, RotateCcw, Trash2, CheckCircle2, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

export function ProfileScreen() {
  const navigate = useNavigate();
  const { profile, targetAmount, resetStats, resetProfile } = useApp();
  const { t, language, setLanguage } = useLanguage();
  const [showToast, setShowToast] = useState(false);

  const handleResetStats = () => {
    resetStats();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleResetProfile = () => {
    resetProfile();
    navigate('/onboarding');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-[100dvh] overflow-hidden bg-background flex flex-col relative"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold">{t('statsResetMsg')}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TopAppBar */}
      <header className="flex-none w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="hover:opacity-80 transition-opacity scale-95 duration-200 ease-out text-slate-500">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-headline text-xl font-bold tracking-tight text-blue-600">{t('profile')}</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto px-6 max-w-2xl mx-auto w-full flex flex-col justify-start pt-4 gap-4 pb-4">
        {/* Profile Header/Avatar Section */}
        <section className="flex flex-col items-center justify-center space-y-2">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-primary-fixed flex items-center justify-center text-primary">
              <img 
                className="w-full h-full object-cover" 
                alt="Profile" 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" 
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-on-primary p-1.5 rounded-full shadow-lg scale-95 hover:scale-100 transition-transform">
              <Pencil className="w-3 h-3" />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold tracking-tight text-on-surface">{t('welcomeUser', { name: profile?.name || '' })}</h2>
            <p className="text-secondary font-label text-[10px] uppercase tracking-widest mt-0.5">Sıvı Takip Profiliniz</p>
          </div>
        </section>

        {/* User Info Section */}
        <section className="bg-surface-container-low rounded-xl p-4 space-y-4">
          <h3 className="text-on-surface font-semibold text-base mb-1 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            {t('personalInfo')}
          </h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="font-label text-[10px] font-medium text-secondary px-1">{t('nameLabel')}</label>
              <input 
                className="w-full bg-surface-container-lowest border-none rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-fixed text-on-surface transition-all placeholder:text-outline-variant text-sm" 
                placeholder={t('namePlaceholder')}
                type="text" 
                defaultValue={profile?.name || ''}
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-label text-[10px] font-medium text-secondary px-1">{t('heightLabel')}</label>
                <input 
                  className="w-full bg-surface-container-lowest border-none rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-fixed text-on-surface transition-all placeholder:text-outline-variant text-sm" 
                  placeholder={t('heightPlaceholder')}
                  type="number" 
                  defaultValue={profile?.height || ''}
                  readOnly
                />
              </div>
              <div className="space-y-1">
                <label className="font-label text-[10px] font-medium text-secondary px-1">{t('weightLabel')}</label>
                <input 
                  className="w-full bg-surface-container-lowest border-none rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-fixed text-on-surface transition-all placeholder:text-outline-variant text-sm" 
                  placeholder={t('weightPlaceholder')}
                  type="number" 
                  defaultValue={profile?.weight || ''}
                  readOnly
                />
              </div>
            </div>
          </div>
        </section>

        {/* Language Selection Section */}
        <section className="bg-surface-container-low rounded-xl p-4 space-y-4">
          <h3 className="text-on-surface font-semibold text-base mb-1 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            {t('language')}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => setLanguage('en')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${language === 'en' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('tr')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${language === 'tr' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'}`}
            >
              Türkçe
            </button>
            <button 
              onClick={() => setLanguage('es')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${language === 'es' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'}`}
            >
              Español
            </button>
          </div>
        </section>

        {/* Stats Visualization */}
        <section className="relative overflow-hidden bg-primary p-4 rounded-xl text-on-primary">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/30 rounded-full -mr-12 -mt-12 blur-2xl"></div>
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <p className="font-label text-[10px] font-medium opacity-80 uppercase tracking-wider">{t('dailyTarget')}</p>
              <p className="text-2xl font-extrabold tracking-tighter mt-0.5">{targetAmount.toLocaleString('tr-TR')} ml</p>
            </div>
            <div className="text-right">
              <Droplet className="w-8 h-8 opacity-50 fill-current" />
            </div>
          </div>
        </section>

        {/* Actions Section */}
        <section className="space-y-2">
          <button onClick={handleResetStats} className="w-full bg-primary-fixed text-on-primary-fixed-variant font-bold py-3 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.96] hover:bg-primary-fixed/80 text-sm">
            <RotateCcw className="w-4 h-4" />
            {t('resetStats')}
          </button>
          <button onClick={handleResetProfile} className="w-full bg-error-container text-on-error-container font-bold py-3 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.96] hover:bg-error-container/80 text-sm">
            <Trash2 className="w-4 h-4" />
            {t('resetProfile')}
          </button>
        </section>
      </main>

      <BottomNav />
    </motion.div>
  );
}
