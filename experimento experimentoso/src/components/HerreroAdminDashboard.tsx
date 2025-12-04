import { Bell, User, LogOut, Clock, CheckCircle, AlertCircle, Package } from 'lucide-react';

interface HerreroAdminDashboardProps {
  onNavigateToProfile: () => void;
  onNavigateToNotifications: () => void;
  onProjectClick: (projectId: string) => void;
  onLogout: () => void;
}

export function HerreroAdminDashboard({
  onNavigateToProfile,
  onNavigateToNotifications,
  onProjectClick,
  onLogout,
}: HerreroAdminDashboardProps) {
  const pendingProjects = [
    {
      id: 'P-001',
      clientName: 'Juan Pérez',
      projectName: 'Puerta Principal',
      status: 'Pendiente',
      date: '2024-12-05',
      priority: 'high',
    },
    {
      id: 'P-002',
      clientName: 'María García',
      projectName: 'Ventanas de Seguridad',
      status: 'En Progreso',
      date: '2024-12-03',
      priority: 'medium',
    },
    {
      id: 'P-003',
      clientName: 'Carlos López',
      projectName: 'Portón Automático',
      status: 'Pendiente',
      date: '2024-12-02',
      priority: 'low',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 pt-6 pb-24 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white mb-1">Panel Herrero</h2>
            <p className="text-white/90 text-sm">Gestiona tus proyectos</p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl text-white mb-1">8</p>
            <p className="text-xs text-white/90">Nuevas</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl text-white mb-1">5</p>
            <p className="text-xs text-white/90">Proceso</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl text-white mb-1">23</p>
            <p className="text-xs text-white/90">Completadas</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-2xl text-white mb-1">3</p>
            <p className="text-xs text-white/90">Urgentes</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-16">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs text-gray-900 text-center">Pendientes</p>
          </button>

          <button className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xs text-gray-900 text-center">Completados</p>
          </button>

          <button className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xs text-gray-900 text-center">Inventario</p>
          </button>
        </div>

        {/* Solicitudes Pendientes */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 px-1">Solicitudes Pendientes</h3>
          <div className="space-y-3">
            {pendingProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className="w-full bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{project.projectName}</h4>
                    <p className="text-sm text-gray-600">{project.clientName}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      project.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : project.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {project.priority === 'high' ? 'Alta' : project.priority === 'medium' ? 'Media' : 'Baja'}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">{project.date}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'En Progreso'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Alertas de Inventario */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3 px-1">Alertas de Inventario</h3>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Stock Bajo</h4>
                <p className="text-sm text-gray-600">
                  3 materiales necesitan reabastecimiento
                </p>
              </div>
            </div>
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