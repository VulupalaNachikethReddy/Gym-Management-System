
import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AuthScreen from './components/AuthScreen';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import OwnerDashboard from './components/owner/OwnerDashboard';
import MemberDashboard from './components/member/MemberDashboard';
import { useAuth } from './hooks/useAuth';
import Spinner from './components/shared/Spinner';
import { AuthView } from './types';

enum AppState {
  SPLASH,
  ONBOARDING,
  AUTH,
  ROLE_SELECTION,
  OWNER_DASHBOARD,
  MEMBER_DASHBOARD,
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SPLASH);
  const [authView, setAuthView] = useState<AuthView>('login');
  const { user, loading, role } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (appState === AppState.SPLASH) {
      setTimeout(() => setAppState(AppState.ONBOARDING), 2000);
      return;
    }

    if (user) {
      if (!role) {
        setAppState(AppState.ROLE_SELECTION);
      } else if (role === 'owner') {
        setAppState(AppState.OWNER_DASHBOARD);
      } else if (role === 'member') {
        setAppState(AppState.MEMBER_DASHBOARD);
      }
    } else {
        if(appState !== AppState.ONBOARDING && appState !== AppState.AUTH) {
            setAppState(AppState.ONBOARDING);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, role, appState]);
  
  const handleNavigateToAuth = (view: AuthView) => {
    setAuthView(view);
    setAppState(AppState.AUTH);
  };

  const renderContent = () => {
    if (loading && appState !== AppState.SPLASH) {
      return <div className="flex items-center justify-center h-screen"><Spinner /></div>;
    }

    switch (appState) {
      case AppState.SPLASH:
        return <SplashScreen />;
      case AppState.ONBOARDING:
        return <OnboardingScreen onNavigateToAuth={handleNavigateToAuth} />;
      case AppState.AUTH:
        return <AuthScreen initialView={authView} onBack={() => setAppState(AppState.ONBOARDING)} />;
      case AppState.ROLE_SELECTION:
        return <RoleSelectionScreen />;
      case AppState.OWNER_DASHBOARD:
        return <OwnerDashboard />;
      case AppState.MEMBER_DASHBOARD:
        return <MemberDashboard />;
      default:
        return <SplashScreen />;
    }
  };

  return <div className="min-h-screen bg-background">{renderContent()}</div>;
};

export default App;
