import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Droplet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export function OnboardingScreen() {
  const navigate = useNavigate();
  const { setProfile } = useApp();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleComplete = () => {
    if (name && weight && height) {
      setProfile({
        name,
        weight: parseInt(weight, 10),
        height: parseInt(height, 10)
      });
      navigate('/home');
    }
  };

  const isFormValid = name.trim() !== '' && weight !== '' && height !== '';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] bg-background flex flex-col px-6 py-12"
    >
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
            <Droplet className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">{t('welcome')}</h1>
          <p className="text-secondary text-sm">{t('onboardingDesc')}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-label text-xs font-medium text-secondary px-1">{t('nameLabel')}</label>
            <input 
              className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-fixed text-on-surface transition-all placeholder:text-outline-variant" 
              placeholder={t('namePlaceholder')}
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-label text-xs font-medium text-secondary px-1">{t('weightLabel')}</label>
              <input 
                className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-fixed text-on-surface transition-all placeholder:text-outline-variant" 
                placeholder={t('weightPlaceholder')}
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-label text-xs font-medium text-secondary px-1">{t('heightLabel')}</label>
              <input 
                className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary-fixed text-on-surface transition-all placeholder:text-outline-variant" 
                placeholder={t('heightPlaceholder')}
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleComplete}
          disabled={!isFormValid}
          className="w-full py-4 px-8 bg-primary text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          <span className="tracking-wide">{t('continueBtn')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
