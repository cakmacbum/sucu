import { ArrowLeft, Calendar, TrendingUp, Timer, Flame, Droplet, Coffee, Apple, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export function InsightsScreen() {
  const navigate = useNavigate();
  const { currentAmount } = useApp();
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-[100dvh] overflow-hidden bg-background flex flex-col"
    >
      {/* TopAppBar */}
      <nav className="flex-none w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="hover:opacity-80 transition-opacity active:scale-95 duration-200 ease-in-out">
            <ArrowLeft className="w-6 h-6 text-slate-500" />
          </button>
          <h1 className="font-headline text-xl tracking-tight text-blue-600 font-bold">{t('insights')}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-full hover:bg-slate-100 transition-colors">
            <Calendar className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </nav>

      <main className="flex-1 min-h-0 overflow-y-auto px-4 w-full max-w-2xl mx-auto flex flex-col gap-3 pb-4 pt-2">
        {/* Segmented Filter */}
        <section className="flex-none">
          <div className="bg-surface-container-low p-1 rounded-full flex items-center">
            <button className="flex-1 py-1.5 text-xs font-bold rounded-full bg-surface-container-lowest text-primary shadow-sm">{t('day1')}</button>
            <button className="flex-1 py-1.5 text-xs font-semibold text-secondary hover:text-on-surface transition-colors">{t('week1')}</button>
            <button className="flex-1 py-1.5 text-xs font-semibold text-secondary hover:text-on-surface transition-colors">{t('month1')}</button>
            <button className="flex-1 py-1.5 text-xs font-semibold text-secondary hover:text-on-surface transition-colors">{t('year1')}</button>
          </div>
        </section>

        {/* Insights Hero (Bento Style) */}
        <div className="grid grid-cols-2 gap-2 flex-none">
          {/* Main Chart Card */}
          <section className="col-span-2 bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_24px_rgba(0,81,224,0.04)] relative overflow-hidden">
            <div className="flex justify-between items-end mb-4 relative z-10">
              <div>
                <p className="font-label text-[10px] font-semibold text-secondary uppercase tracking-widest mb-0.5">{t('totalIntake')}</p>
                <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">{(currentAmount / 1000).toFixed(1)} <span className="text-sm font-medium text-secondary">{t('liter')}</span></h2>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                  <TrendingUp className="w-3 h-3 mr-1" /> 12% {t('increase')}
                </span>
              </div>
            </div>

            {/* Abstract Liquid Chart Representation */}
            <div className="h-24 w-full flex items-end gap-2 relative">
              {[40, 65, 50, 85, 95, 60, 45].map((height, i) => (
                <div key={i} className={`flex-1 rounded-t-xl relative group cursor-pointer ${i === 4 ? 'bg-primary-container' : 'bg-primary-fixed/30'}`} style={{ height: `${height}%` }}>
                  {i !== 4 && <div className="absolute inset-0 bg-primary-container rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                  {i === 4 && <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-on-primary-container text-white text-[8px] py-0.5 px-1.5 rounded font-bold whitespace-nowrap">{t('today')}</div>}
                </div>
              ))}
            </div>

            {/* Fluid Background Ornament */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary-container/5 rounded-full blur-2xl"></div>
          </section>

          {/* Small Detail Card 1 */}
          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col justify-between h-20 border border-transparent hover:border-primary/10 transition-colors">
            <div className="flex justify-between items-start">
              <Timer className="w-4 h-4 text-primary" />
              <Timer className="w-8 h-8 text-primary fill-current opacity-10 absolute right-2 bottom-2" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-secondary">En Aktif Saat</p>
              <p className="text-sm font-bold">14:00 - 16:00</p>
            </div>
          </div>

          {/* Small Detail Card 2 */}
          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col justify-between h-20 border border-transparent hover:border-primary/10 transition-colors relative overflow-hidden">
            <Flame className="w-4 h-4 text-tertiary-container" />
            <Flame className="w-8 h-8 text-tertiary-container fill-current opacity-10 absolute right-2 bottom-2" />
            <div>
              <p className="text-[10px] font-semibold text-secondary">Metabolizma</p>
              <p className="text-sm font-bold">+5% Optimum</p>
            </div>
          </div>
        </div>

        {/* Consumption Breakdown Section */}
        <section className="space-y-2 flex-none">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-on-surface">{t('beverageBreakdown')}</h3>
            <button className="text-primary text-[10px] font-bold">Tümünü Gör</button>
          </div>
          <div className="space-y-2">
            {/* Drink Item: Water */}
            <div className="bg-surface-container-lowest p-2.5 rounded-xl flex items-center gap-3 transition-transform active:scale-[0.98]">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center">
                <Droplet className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-xs">{t('water')}</p>
                  <p className="font-extrabold text-primary text-xs">15.5L</p>
                </div>
                <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[78%] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Drink Item: Coffee */}
            <div className="bg-surface-container-lowest p-2.5 rounded-xl flex items-center gap-3 transition-transform active:scale-[0.98]">
              <div className="w-8 h-8 rounded-full bg-[#fceee8] flex items-center justify-center">
                <Coffee className="w-4 h-4 text-tertiary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-xs">{t('coffee')}</p>
                  <p className="font-extrabold text-tertiary text-xs">2.1L</p>
                </div>
                <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[20%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hydration Tip Glass Card */}
        <section className="bg-primary-container text-white p-4 rounded-xl relative overflow-hidden flex-none">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-1">
              <Lightbulb className="w-3 h-3" />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Günün İpucu</p>
            </div>
            <h4 className="text-sm font-bold mb-1">Sirkadiyen Ritminiz</h4>
            <p className="text-[10px] opacity-90 leading-relaxed">Uyandıktan sonraki ilk 30 dakika içinde içilen bir bardak su, sindirim sisteminizi uyandırır.</p>
          </div>
          {/* Decorative fluid shape */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-xl"></div>
        </section>
      </main>

      <BottomNav />
    </motion.div>
  );
}
