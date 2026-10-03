import React, { createContext, useContext } from 'react';
import type { UserSession, UserStats, UserRole } from '../types/auth';
import type { GoldTickerItem } from '../data/mockData';

export interface AuthContextType {
  session: UserSession | null;
  stats: UserStats;
  consent: import('../types/auth').ConsentRecord | null;
  hasConsent: boolean;
  isConsentBannerVisible: boolean;
  acceptConsent: () => void;
  declineConsent: () => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  incrementStat: (key: keyof Omit<UserStats, 'sessionStartTime'>) => void;
  login: (name: string, role: UserRole) => void;
  logout: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  dismissToast: () => void;
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (open: boolean) => void;
  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (open: boolean) => void;
  isCommandOpen: boolean;
  setIsCommandOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tickers: GoldTickerItem[];
  flashingSymbol: { symbol: string; direction: 'up' | 'down' } | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
