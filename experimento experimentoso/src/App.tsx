import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ClientDashboard } from './components/ClientDashboard';
import { HerreroAdminDashboard } from './components/HerreroAdminDashboard';
import { CreateRequestScreen } from './components/CreateRequestScreen';
import { MisProyectosScreen } from './components/MisProyectosScreen';
import { ProjectDetailScreen } from './components/ProjectDetailScreen';
import { EditProfileScreen } from './components/EditProfileScreen';
import { NotificationsScreen } from './components/NotificationsScreen';

type Screen = 
  | 'login' 
  | 'register' 
  | 'client-dashboard' 
  | 'herrero-dashboard'
  | 'create-request'
  | 'mis-proyectos'
  | 'project-detail'
  | 'edit-profile'
  | 'notifications';

type UserType = 'client' | 'herrero' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleLogin = (type: UserType) => {
    setUserType(type);
    if (type === 'client') {
      setCurrentScreen('client-dashboard');
    } else {
      setCurrentScreen('herrero-dashboard');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentScreen('login');
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentScreen('project-detail');
  };

  const handleBackToDashboard = () => {
    if (userType === 'client') {
      setCurrentScreen('client-dashboard');
    } else {
      setCurrentScreen('herrero-dashboard');
    }
    setSelectedProjectId(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen 
            onLogin={handleLogin} 
            onNavigateToRegister={() => setCurrentScreen('register')} 
          />
        );
      case 'register':
        return (
          <RegisterScreen 
            onRegister={handleLogin}
            onNavigateToLogin={() => setCurrentScreen('login')} 
          />
        );
      case 'client-dashboard':
        return (
          <ClientDashboard
            onNavigateToCreateRequest={() => setCurrentScreen('create-request')}
            onNavigateToProjects={() => setCurrentScreen('mis-proyectos')}
            onNavigateToProfile={() => setCurrentScreen('edit-profile')}
            onNavigateToNotifications={() => setCurrentScreen('notifications')}
            onLogout={handleLogout}
          />
        );
      case 'herrero-dashboard':
        return (
          <HerreroAdminDashboard
            onNavigateToProfile={() => setCurrentScreen('edit-profile')}
            onNavigateToNotifications={() => setCurrentScreen('notifications')}
            onProjectClick={handleProjectClick}
            onLogout={handleLogout}
          />
        );
      case 'create-request':
        return (
          <CreateRequestScreen
            onComplete={handleBackToDashboard}
            onBack={handleBackToDashboard}
          />
        );
      case 'mis-proyectos':
        return (
          <MisProyectosScreen
            onProjectClick={handleProjectClick}
            onBack={handleBackToDashboard}
          />
        );
      case 'project-detail':
        return selectedProjectId ? (
          <ProjectDetailScreen
            projectId={selectedProjectId}
            userType={userType || 'client'}
            onBack={() => setCurrentScreen(userType === 'client' ? 'mis-proyectos' : 'herrero-dashboard')}
          />
        ) : null;
      case 'edit-profile':
        return (
          <EditProfileScreen
            userType={userType || 'client'}
            onBack={handleBackToDashboard}
          />
        );
      case 'notifications':
        return (
          <NotificationsScreen
            onBack={handleBackToDashboard}
          />
        );
      default:
        return <LoginScreen onLogin={handleLogin} onNavigateToRegister={() => setCurrentScreen('register')} />;
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {renderScreen()}
    </div>
  );
}
