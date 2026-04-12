/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SplashScreen } from './screens/SplashScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { HomeScreen } from './screens/HomeScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/insights" element={<InsightsScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

