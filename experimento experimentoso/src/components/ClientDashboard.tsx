import { Plus, FolderOpen, Bell, User, LogOut, Clock, Wrench } from 'lucide-react';

interface ClientDashboardProps {
  onNavigateToCreateRequest: () => void;
  onNavigateToProjects: () => void;
  onNavigateToProfile: () => void;
  onNavigateToNotifications: () => void;
  onLogout: () => void;
}

export function ClientDashboard({
  onNavigateToCreateRequest,
  onNavigateToProjects,
  onNavigateToProfile,
  onNavigateToNotifications,
  onLogout,
}: ClientDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 pt-6 pb-32 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white mb-1">Hola, Juan</h2>
            <p className="text-white/90 text-sm">¿Qué vamos a crear hoy?</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToNotifications}
              className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={onNavigateToProfile}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-24">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={onNavigateToCreateRequest}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-gray-900 mb-1">Nueva Solicitud</h3>
            <p className="text-sm text-gray-600">Crea un nuevo proyecto</p>
          </button>

          <button
            onClick={onNavigateToProjects}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-gray-900 mb-1">Mis Proyectos</h3>
            <p className="text-sm text-gray-600">Ver todos tus proyectos</p>
          </button>
        </div>

        {/* Último Proyecto Visitado */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 px-1">Último Proyecto Visitado</h3>
          <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-white mb-1">Puerta Principal</h4>
                <p className="text-white/90 text-sm mb-2">En Progreso</p>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <p className="text-white text-sm">
                Fabricación de puerta de hierro forjado para entrada principal
              </p>
            </div>
          </div>
        </div>

        {/* Última Acción Realizada */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 px-1">Última Acción Realizada</h3>
          <div className="bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-2">Cita Agendada</h4>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <p className="text-white text-sm mb-1">
                    Proyecto: Ventanas de Seguridad
                  </p>
                  <p className="text-white/90 text-xs">
                    15 de Diciembre, 2024 - 10:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <p className="text-2xl text-gray-900 mb-1">5</p>
            <p className="text-xs text-gray-600">Activos</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <p className="text-2xl text-gray-900 mb-1">12</p>
            <p className="text-xs text-gray-600">Completados</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <p className="text-2xl text-gray-900 mb-1">3</p>
            <p className="text-xs text-gray-600">Pendientes</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mb-6"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}