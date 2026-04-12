import { Droplet, History, LineChart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';

export function BottomNav() {
  const location = useLocation();
  const path = location.pathname;
  const { t } = useLanguage();

  return (
    <nav className="flex-none w-full flex justify-around items-center px-2 py-2 bg-white/95 backdrop-blur-md border-t border-slate-200/60 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <Link
        to="/home"
        className={cn(
          "flex flex-col items-center justify-center px-4 py-1.5 transition-colors duration-200 rounded-xl",
          path === '/home' ? "text-blue-600" : "text-slate-500 hover:text-blue-500"
        )}
      >
        <Droplet className={cn("w-5 h-5 mb-0.5", path === '/home' && "fill-current")} />
        <span className="font-label text-[10px] font-medium">{t('home')}</span>
      </Link>
      <Link
        to="/history"
        className={cn(
          "flex flex-col items-center justify-center px-4 py-1.5 transition-colors duration-200 rounded-xl",
          path === '/history' ? "text-blue-600" : "text-slate-500 hover:text-blue-500"
        )}
      >
        <History className={cn("w-5 h-5 mb-0.5", path === '/history' && "fill-current")} />
        <span className="font-label text-[10px] font-medium">{t('history')}</span>
      </Link>
      <Link
        to="/insights"
        className={cn(
          "flex flex-col items-center justify-center px-4 py-1.5 transition-colors duration-200 rounded-xl",
          path === '/insights' ? "text-blue-600" : "text-slate-500 hover:text-blue-500"
        )}
      >
        <LineChart className={cn("w-5 h-5 mb-0.5", path === '/insights' && "fill-current")} />
        <span className="font-label text-[10px] font-medium">{t('insights')}</span>
      </Link>
      <Link
        to="/profile"
        className={cn(
          "flex flex-col items-center justify-center px-4 py-1.5 transition-colors duration-200 rounded-xl",
          path === '/profile' ? "text-blue-600" : "text-slate-500 hover:text-blue-500"
        )}
      >
        <User className={cn("w-5 h-5 mb-0.5", path === '/profile' && "fill-current")} />
        <span className="font-label text-[10px] font-medium">{t('profile')}</span>
      </Link>
    </nav>
  );
}
