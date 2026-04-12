import React, { createContext, useContext, useState, useEffect } from 'react';

type UserProfile = {
  name: string;
  weight: number;
  height: number;
};

type AppContextType = {
  currentAmount: number;
  targetAmount: number;
  profile: UserProfile | null;
  addWater: (amount: number) => void;
  resetStats: () => void;
  setProfile: (profile: UserProfile) => void;
  resetProfile: () => void;
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

  // Calculate target: Weight (kg) * 35 ml
  const targetAmount = profile ? profile.weight * 35 : 2800;

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
    <AppContext.Provider value={{ currentAmount, targetAmount, profile, addWater, resetStats, setProfile, resetProfile }}>
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
