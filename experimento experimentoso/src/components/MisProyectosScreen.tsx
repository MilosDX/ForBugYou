import { ArrowLeft, Search, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface MisProyectosScreenProps {
  onProjectClick: (projectId: string) => void;
  onBack: () => void;
}

export function MisProyectosScreen({ onProjectClick, onBack }: MisProyectosScreenProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'progress' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      id: 'P-001',
      name: 'Puerta Principal',
      description: 'Puerta de hierro forjado para entrada principal',
      status: 'progress',
      date: '2024-12-05',
      budget: '$2,500',
    },
    {
      id: 'P-002',
      name: 'Ventanas de Seguridad',
      description: 'Set de 4 ventanas con rejas de seguridad',
      status: 'pending',
      date: '2024-12-03',
      budget: '$1,800',
    },
    {
      id: 'P-003',
      name: 'Portón Automático',
      description: 'Portón corredizo con sistema automático',
      status: 'completed',
      date: '2024-11-20',
      budget: '$3,200',
    },
    {
      id: 'P-004',
      name: 'Barandal Escalera',
      description: 'Barandal de hierro para escalera interior',
      status: 'progress',
      date: '2024-11-28',
      budget: '$1,200',
    },
    {
      id: 'P-005',
      name: 'Reja Perimetral',
      description: 'Reja de seguridad perimetral',
      status: 'cancelled',
      date: '2024-11-15',
      budget: '$4,500',
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pendiente',
          icon: Clock,
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-700',
          iconColor: 'text-orange-600',
        };
      case 'progress':
        return {
          label: 'En Progreso',
          icon: AlertCircle,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-600',
        };
      case 'completed':
        return {
          label: 'Completado',
          icon: CheckCircle,
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          iconColor: 'text-green-600',
        };
      case 'cancelled':
        return {
          label: 'Cancelado',
          icon: XCircle,
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          iconColor: 'text-red-600',
        };
      default:
        return {
          label: 'Desconocido',
          icon: Clock,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          iconColor: 'text-gray-600',
        };
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    pending: projects.filter((p) => p.status === 'pending').length,
    progress: projects.filter((p) => p.status === 'progress').length,
    completed: projects.filter((p) => p.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 pt-6 pb-24 rounded-b-3xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-white/90 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
        <h2 className="text-white mb-2">Mis Proyectos</h2>
        <p className="text-white/90 text-sm">Gestiona todos tus proyectos</p>
      </div>

      {/* Content */}
      <div className="px-6 -mt-16">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <p className="text-2xl text-orange-600 mb-1">{stats.pending}</p>
            <p className="text-xs text-gray-600">Pendientes</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <p className="text-2xl text-blue-600 mb-1">{stats.progress}</p>
            <p className="text-xs text-gray-600">En Progreso</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <p className="text-2xl text-green-600 mb-1">{stats.completed}</p>
            <p className="text-xs text-gray-600">Completados</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar proyectos..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filter === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filter === 'pending'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('progress')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filter === 'progress'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            En Progreso
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Completados
          </button>
        </div>

        {/* Projects List */}
        <div className="space-y-3 pb-6">
          {filteredProjects.map((project) => {
            const statusInfo = getStatusInfo(project.status);
            const StatusIcon = statusInfo.icon;

            return (
              <button
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className="w-full bg-white rounded-2xl p-5 shadow hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{project.name}</h4>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                  <div className={`w-10 h-10 ${statusInfo.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 ml-3`}>
                    <StatusIcon className={`w-5 h-5 ${statusInfo.iconColor}`} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{project.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-900">{project.budget}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No se encontraron proyectos</p>
          </div>
        )}
      </div>
    </div>
  );
}