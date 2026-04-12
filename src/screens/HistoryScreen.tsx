import { ArrowLeft, Droplet, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export function HistoryScreen() {
  const navigate = useNavigate();
  const { currentAmount, targetAmount } = useApp();
  const { t } = useLanguage();
  const percentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-[100dvh] overflow-hidden bg-surface flex flex-col"
    >
      <header className="flex-none w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 flex items-center px-6 h-14">
        <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:bg-slate-100 transition-colors scale-95 active:scale-90 rounded-full p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-headline text-xl font-bold tracking-tight text-blue-600">{t('history')}</h1>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto px-6 max-w-screen-md mx-auto w-full pb-6 pt-4 space-y-6">
        <section className="relative overflow-hidden bg-primary-container rounded-xl p-6 text-on-primary shadow-lg">
          <div className="relative z-10">
            <p className="text-on-primary/80 font-medium text-xs mb-1 uppercase tracking-wider">{t('today')}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight">{currentAmount.toLocaleString('tr-TR')}</span>
              <span className="text-lg font-medium opacity-80">ml</span>
            </div>
            <div className="mt-3 flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md">
              <span className="text-[10px] font-bold">{t('targetCompleted', { percent: percentage })}</span>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-2 right-2 opacity-20">
            <Droplet className="w-24 h-24 fill-current" />
          </div>
        </section>

        <div className="space-y-6">
          <div className="group">
            <div className="flex justify-between items-end mb-3 px-1">
              <div>
                <h2 className="text-on-surface font-bold text-base">24 Mart Pazartesi</h2>
                <p className="text-secondary text-xs">Dün</p>
              </div>
              <div className="text-right">
                <span className="text-primary font-extrabold text-lg">2.100</span>
                <span className="text-secondary text-xs ml-0.5">ml</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl overflow-hidden p-1 space-y-1">
              <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
                    <Droplet className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">{t('water')}</p>
                    <p className="text-[10px] text-secondary">08:30</p>
                  </div>
                </div>
                <span className="font-bold text-sm text-on-surface">500 ml</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <Coffee className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">{t('juice')}</p>
                    <p className="text-[10px] text-secondary">12:15</p>
                  </div>
                </div>
                <span className="font-bold text-sm text-on-surface">330 ml</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
                    <Droplet className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">{t('water')}</p>
                    <p className="text-[10px] text-secondary">15:45</p>
                  </div>
                </div>
                <span className="font-bold text-sm text-on-surface">500 ml</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </motion.div>
  );
}
