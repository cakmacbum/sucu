import { Settings, Droplet, Coffee, Plus, X, Wine, CupSoda, Milk, Beer, Bell } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export function HomeScreen() {
  const { currentAmount, targetAmount, addWater, profile, notificationsEnabled, toggleNotifications } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const percentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[100dvh] overflow-hidden bg-background flex flex-col"
    >
      <header className="flex-none bg-white/95 backdrop-blur-md z-50 border-b border-slate-200/60 shadow-sm">
        <div className="flex justify-between items-center w-full px-6 py-3 max-w-xl mx-auto">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
            <img 
              src="/logo.png" 
              onError={(e) => { e.currentTarget.src = '/vite.svg'; }}
              alt="Fluidity Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <h1 className="font-headline text-lg font-bold tracking-tight text-blue-600">Fluidity</h1>
          <div className="hover:opacity-80 transition-opacity scale-95 duration-200 ease-out cursor-pointer" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="w-6 h-6 text-slate-600" />
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 pt-4 flex-1 min-h-0 overflow-y-auto flex flex-col justify-between w-full pb-4">
        <section className="text-center flex-none">
          <p className="text-secondary text-[10px] tracking-[0.2em] font-bold mb-1">{t('todayIntake')}</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-[3rem] font-extrabold leading-none tracking-tighter text-on-surface transition-all duration-700">
              {currentAmount.toLocaleString('tr-TR')}
            </span>
            <span className="text-base font-bold text-secondary">ml</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] font-bold text-secondary px-0.5">
            <span>%{percentage}</span>
            <span className="opacity-70">{t('target')}: {targetAmount.toLocaleString('tr-TR')} ml</span>
          </div>
        </section>

        <section className="relative flex flex-col items-center justify-center flex-1 min-h-0 py-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-primary/10 blur-[80px] rounded-full -z-10 animate-pulse"></div>
          <div className="flex flex-col items-center gap-4 h-full justify-center">
            <div className="relative w-32 h-44 sm:h-48">
              <div className="absolute inset-0 bg-surface-container-high/30 border-2 border-primary/10 rounded-2xl" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)' }}></div>
              <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-2xl transition-all duration-1000" style={{ height: `${percentage}%`, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary-container opacity-80"></div>
                <div className="absolute top-0 left-0 w-full h-2 bg-white/30 blur-sm"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/5 shadow-sm">
              <span className="text-[10px] font-bold text-on-surface/80 uppercase tracking-widest">Canlı Seviye</span>
              <Droplet className="w-3 h-3 text-primary animate-bounce fill-current" />
            </div>
          </div>
        </section>

        <section className="space-y-2 flex-none">
          <div className="flex justify-between items-end px-1">
            <h2 className="text-[10px] font-bold tracking-wide text-on-surface uppercase opacity-80">{t('quickAdd')}</h2>
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest cursor-pointer hover:underline">Özel Seçim</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => addWater(200)} className="flex flex-col items-center p-2 bg-white rounded-2xl shadow-sm shadow-primary/5 transition-all duration-200 active:scale-95 border border-surface-container">
              <div className="w-7 h-7 mb-1 flex items-center justify-center bg-primary/5 rounded-full text-primary">
                <Droplet className="w-4 h-4 fill-current" />
              </div>
              <span className="text-[10px] font-bold text-on-surface">200 ml</span>
              <span className="text-[7px] text-secondary font-medium uppercase tracking-tighter">Küçük Bardak</span>
            </button>
            <button onClick={() => addWater(300)} className="flex flex-col items-center p-2 bg-white rounded-2xl shadow-sm shadow-primary/5 transition-all duration-200 active:scale-95 border-2 border-primary/20">
              <div className="w-7 h-7 mb-1 flex items-center justify-center bg-primary/5 rounded-full text-primary">
                <Coffee className="w-4 h-4 fill-current" />
              </div>
              <span className="text-[10px] font-bold text-on-surface">300 ml</span>
              <span className="text-[7px] text-secondary font-medium uppercase tracking-tighter">Kupa</span>
            </button>
            <button onClick={() => addWater(500)} className="flex flex-col items-center p-2 bg-white rounded-2xl shadow-sm shadow-primary/5 transition-all duration-200 active:scale-95 border border-surface-container">
              <div className="w-7 h-7 mb-1 flex items-center justify-center bg-primary/5 rounded-full text-primary">
                <Droplet className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-on-surface">500 ml</span>
              <span className="text-[7px] text-secondary font-medium uppercase tracking-tighter">Şişe</span>
            </button>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="w-full py-2.5 mt-1 border border-dashed border-outline-variant rounded-2xl flex items-center justify-center gap-2 text-secondary font-bold hover:bg-surface-container-low transition-colors">
            <Plus className="w-3 h-3" />
            <span className="text-[10px]">+ {t('otherBeverages')}</span>
          </button>
        </section>
      </main>

      {/* Other Beverages Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-on-surface/20 backdrop-blur-[2px] z-40"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 w-full bg-white rounded-t-[32px] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] z-50 flex flex-col max-h-[75vh]"
            >
              <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 w-full bg-white/80 backdrop-blur-xl rounded-t-[32px]">
                <h2 className="font-headline text-lg font-extrabold tracking-tight text-on-surface">{t('otherBeverages')}</h2>
                <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors active:scale-90 duration-200">
                  <X className="w-4 h-4" />
                </button>
              </header>
              <div className="px-6 pb-8 pt-2 overflow-y-auto flex-1">
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  Su dışındaki içeceklerin hidrasyon seviyene etkisini takip et.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => { addWater(200); setIsModalOpen(false); }} className="flex flex-col items-start p-4 bg-surface-container-low rounded-2xl hover:bg-primary-fixed/30 transition-all active:scale-95 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#ffdbcd] flex items-center justify-center mb-3">
                      <Coffee className="w-5 h-5 text-[#7c2d00]" />
                    </div>
                    <span className="font-bold text-sm text-on-surface mb-0.5">{t('tea')}</span>
                    <span className="text-secondary text-[10px]">200 ml</span>
                  </button>
                  <button onClick={() => { addWater(250); setIsModalOpen(false); }} className="flex flex-col items-start p-4 bg-surface-container-low rounded-2xl hover:bg-primary-fixed/30 transition-all active:scale-95 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#e2d5c1] flex items-center justify-center mb-3">
                      <Coffee className="w-5 h-5 text-[#4a3a2a]" />
                    </div>
                    <span className="font-bold text-sm text-on-surface mb-0.5">{t('coffee')}</span>
                    <span className="text-secondary text-[10px]">250 ml</span>
                  </button>
                  <button onClick={() => { addWater(250); setIsModalOpen(false); }} className="flex flex-col items-start p-4 bg-surface-container-low rounded-2xl hover:bg-primary-fixed/30 transition-all active:scale-95 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#dbe3f0] flex items-center justify-center mb-3">
                      <Milk className="w-5 h-5 text-[#3f4752]" />
                    </div>
                    <span className="font-bold text-sm text-on-surface mb-0.5">{t('milk')}</span>
                    <span className="text-secondary text-[10px]">250 ml</span>
                  </button>
                  <button onClick={() => { addWater(330); setIsModalOpen(false); }} className="flex flex-col items-start p-4 bg-surface-container-low rounded-2xl hover:bg-primary-fixed/30 transition-all active:scale-95 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#ffe6b5] flex items-center justify-center mb-3">
                      <Wine className="w-5 h-5 text-[#a33e00]" />
                    </div>
                    <span className="font-bold text-sm text-on-surface mb-0.5">{t('juice')}</span>
                    <span className="text-secondary text-[10px]">330 ml</span>
                  </button>
                  <button onClick={() => { addWater(500); setIsModalOpen(false); }} className="flex flex-col items-start p-4 bg-surface-container-low rounded-2xl hover:bg-primary-fixed/30 transition-all active:scale-95 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#fff3d6] flex items-center justify-center mb-3">
                      <Beer className="w-5 h-5 text-[#7c2d00]" />
                    </div>
                    <span className="font-bold text-sm text-on-surface mb-0.5">{t('beer')}</span>
                    <span className="text-secondary text-[10px]">500 ml</span>
                  </button>
                  <button onClick={() => { addWater(330); setIsModalOpen(false); }} className="flex flex-col items-start p-4 bg-surface-container-low rounded-2xl hover:bg-primary-fixed/30 transition-all active:scale-95 text-left">
                    <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] flex items-center justify-center mb-3">
                      <CupSoda className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold text-sm text-on-surface mb-0.5">{t('coldDrink')}</span>
                    <span className="text-secondary text-[10px]">330 ml</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSettingsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-scrim/40 z-[60] backdrop-blur-sm"
              onClick={() => setIsSettingsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-16 right-6 w-64 bg-surface rounded-2xl shadow-xl z-[70] overflow-hidden border border-slate-200/50"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-surface-container-lowest">
                <h3 className="font-bold text-on-surface flex items-center gap-2 text-sm">
                  <Settings className="w-4 h-4 text-primary" />
                  {t('settings') || "Ayarlar"}
                </h3>
                <button onClick={() => setIsSettingsOpen(false)} className="text-secondary hover:text-on-surface">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-on-surface flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-primary" />
                      {t('enableNotifications') || "Bildirimi Aktifleştir"}
                    </span>
                    <span className="text-[10px] text-secondary mt-0.5">Her 3 saatte bir</span>
                  </div>
                  <button 
                    onClick={toggleNotifications}
                    className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out ${notificationsEnabled ? 'bg-primary' : 'bg-surface-container-highest'}`}
                  >
                    <div 
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`} 
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav />
    </motion.div>
  );
}
