import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

type UserProfile = {
  name: string;
  weight: number;
  height: number;
};

export type HistoryRecord = {
  id: string;
  dateString: string;
  totalAmount: number;
  targetAmount: number;
};

type AppContextType = {
  currentAmount: number;
  targetAmount: number;
  profile: UserProfile | null;
  history: HistoryRecord[];
  notificationsEnabled: boolean;
  addWater: (amount: number) => void;
  resetStats: () => void;
  setProfile: (profile: UserProfile) => void;
  resetProfile: () => void;
  toggleNotifications: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('fluidity_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentAmount, setCurrentAmount] = useState<number>(() => {
    const saved = localStorage.getItem('fluidity_current_amount');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    const saved = localStorage.getItem('fluidity_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [lastActiveDate, setLastActiveDate] = useState<string>(() => {
    const saved = localStorage.getItem('fluidity_last_active_date');
    return saved ? saved : new Date().toLocaleDateString('tr-TR');
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    return localStorage.getItem('fluidity_notifications') === 'true';
  });

  const { t } = useLanguage();

  // Calculate target: Weight (kg) * 35 ml
  const targetAmount = profile ? profile.weight * 35 : 2800;

  useEffect(() => {
    // Register Service Worker for Notifications
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW register failed', err));
    }
  }, []);

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        localStorage.setItem('fluidity_notifications', 'true');
        scheduleWebNotification();
      } else {
        alert(t('settings') ? 'Permission denied' : 'Bildirim izni verilmedi');
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem('fluidity_notifications', 'false');
    }
  };

  const scheduleWebNotification = () => {
    if (Notification.permission === 'granted' && navigator.serviceWorker.controller) {
       navigator.serviceWorker.controller.postMessage({
         type: 'TEST_NOTIFICATION',
         title: 'Fluidity',
         body: t('notificationMessage') || 'Su içme vakti geldi!'
       });
    }
  };

  useEffect(() => {
    let interval: number | null = null;
    if (notificationsEnabled && Notification.permission === 'granted') {
      // Send notification every 3 hours 
      const THREE_HOURS = 3 * 60 * 60 * 1000;
      interval = window.setInterval(() => {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('Fluidity', {
              body: t('notificationMessage') || 'Su içme vakti geldi!',
              icon: '/vite.svg',
              vibrate: [200, 100, 200]
            }).catch(() => {
              new Notification('Fluidity', { body: t('notificationMessage') || 'Su içme vakti geldi!' });
            });
          });
        } else {
          new Notification('Fluidity', {
            body: t('notificationMessage') || 'Su içme vakti geldi!',
            icon: '/vite.svg'
          });
        }
      }, THREE_HOURS);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [notificationsEnabled, t]);

  useEffect(() => {
    // Check for day change
    const checkDayChange = () => {
      const today = new Date().toLocaleDateString('tr-TR');
      if (today !== lastActiveDate) {
        if (currentAmount > 0) {
          const newRecord: HistoryRecord = {
            id: new Date().toISOString(),
            dateString: lastActiveDate,
            totalAmount: currentAmount,
            targetAmount: targetAmount
          };
          setHistory(prev => [newRecord, ...prev]);
        }
        setCurrentAmount(0);
        setLastActiveDate(today);
      }
    };

    checkDayChange();
    
    // Also set up an interval to check periodically if app is left open
    const interval = setInterval(checkDayChange, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentAmount, lastActiveDate, targetAmount]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('fluidity_profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('fluidity_profile');
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('fluidity_current_amount', currentAmount.toString());
  }, [currentAmount]);

  useEffect(() => {
    localStorage.setItem('fluidity_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('fluidity_last_active_date', lastActiveDate);
  }, [lastActiveDate]);

  const addWater = (amount: number) => {
    setCurrentAmount((prev) => Math.min(prev + amount, targetAmount));
  };

  const resetStats = () => {
    setCurrentAmount(0);
  };

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
  };

  const resetProfile = () => {
    setProfileState(null);
    setCurrentAmount(0);
  };

  return (
    <AppContext.Provider value={{ currentAmount, targetAmount, profile, history, notificationsEnabled, toggleNotifications, addWater, resetStats, setProfile, resetProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
