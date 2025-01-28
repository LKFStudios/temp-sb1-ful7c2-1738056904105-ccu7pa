import React, { useState, useEffect } from 'react';
import { ScanScreen } from './components/ScanScreen';
import { RatingScreen } from './components/RatingScreen';
import { NotificationScreen } from './components/NotificationScreen';
import { AccountScreen } from './components/AccountScreen';
import { PaywallScreen } from './components/PaywallScreen';
import { RatingResult } from './components/RatingResult';
import { DailyScreen } from './components/DailyScreen';
import { CoachScreen } from './components/CoachScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { LoginScreen } from './components/LoginScreen';
import { OnboardingRatingScreen } from './components/onboarding/OnboardingRatingScreen';
import { AgeVerificationScreen } from './components/onboarding/AgeVerificationScreen';
import { AppLayout } from './components/layout/AppLayout';
import { analyzeFace } from './utils/faceAnalysis';
import { AnalysisResult } from './utils/types';
import { analytics } from './services/analytics';
import { useGender } from './context/GenderContext';

export function App() {
  const { gender } = useGender();
  const [currentScreen, setCurrentScreen] = useState<string>('onboarding-rating');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState({
    stage: '画像読み込み',
    progress: 0
  });

  useEffect(() => {
    analytics.trackScreen(currentScreen);
  }, [currentScreen]);

  const handleImageUpload = async (imageData: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setSelectedImage(imageData);
      
      const result = await analyzeFace(imageData, gender, (stage, progress) => {
        setAnalysisProgress({ stage, progress });
      });
      setAnalysisResult(result);
      analytics.trackAnalysis(result);
      setCurrentScreen('paywall');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '分析に失敗しました';
      setError(errorMessage);
      analytics.trackError(new Error(errorMessage), 'image_upload');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetPro = () => {
    setCurrentScreen('result');
  };

  const handleLogin = () => {
    setCurrentScreen('age-verification');
  };

  const showNavigation = !['onboarding-rating', 'notification', 'login', 'age-verification', 'paywall', 'result'].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding-rating':
        return <OnboardingRatingScreen onContinue={() => setCurrentScreen('notification')} />;
      
      case 'notification':
        return <NotificationScreen onContinue={() => setCurrentScreen('login')} />;
      
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      
      case 'age-verification':
        return <AgeVerificationScreen onContinue={() => setCurrentScreen('scan')} />;
      
      case 'scan':
        return (
          <ScanScreen 
            onImageUpload={handleImageUpload}
            isLoading={isLoading}
            analysisProgress={analysisProgress}
          />
        );
      
      case 'paywall':
        return analysisResult && (
          <PaywallScreen
            onGetPro={handleGetPro}
            onInviteFriends={() => setCurrentScreen('result')}
            imageUrl={selectedImage}
            analysisResult={analysisResult}
          />
        );
      
      case 'result':
        return analysisResult && (
          <RatingResult
            imageUrl={selectedImage}
            onClose={() => setCurrentScreen('scan')}
            analysisResult={analysisResult}
            detailedScores={analysisResult.detailedScores}
          />
        );
      
      case 'daily':
        return <DailyScreen analysisResult={analysisResult} />;
      
      case 'coach':
        return <CoachScreen onSubscribe={handleGetPro} />;
      
      case 'settings':
        return <SettingsScreen />;
      
      default:
        return (
          <ScanScreen 
            onImageUpload={handleImageUpload}
            isLoading={isLoading}
            analysisProgress={analysisProgress}
          />
        );
    }
  };

  return (
    <AppLayout 
      showNavigation={showNavigation}
      currentScreen={currentScreen}
      onNavigate={setCurrentScreen}
    >
      {renderScreen()}
    </AppLayout>
  );
}

export default App;