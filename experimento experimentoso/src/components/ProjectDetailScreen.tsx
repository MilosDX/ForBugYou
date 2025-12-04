import { ArrowLeft, Calendar, DollarSign, User, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ProjectDetailScreenProps {
  projectId: string;
  userType: 'client' | 'herrero';
  onBack: () => void;
}

export function ProjectDetailScreen({ projectId, userType, onBack }: ProjectDetailScreenProps) {
  const [newComment, setNewComment] = useState('');

  // Mock data
  const projectData = {
    'P-001': {
      name: 'Puerta Principal',
      description: 'Puerta de hierro forjado para entrada principal',
      status: 'progress',
      date: '2024-12-05',
      budget: '$2,500',
      clientName: 'Juan Pérez',
      herreroName: 'Carlos Hernández',
      appointmentDate: '2024-12-15',
      appointmentTime: '10:00',
      progress: [
        { step: 'Solicitud Enviada', completed: true, date: '2024-12-05' },
        { step: 'Cita Agendada', completed: true, date: '2024-12-06' },
        { step: 'En Fabricación', completed: true, date: '2024-12-08' },
        { step: 'Instalación', completed: false, date: null },
        { step: 'Completado', completed: false, date: null },
      ],
      comments: [
        {
          id: 1,
          author: 'Carlos Hernández',
          message: 'He comenzado con la fabricación de la puerta.',
          date: '2024-12-08 14:30',
          isHerrero: true,
        },
        {
          id: 2,
          author: 'Juan Pérez',
          message: '¿Cuándo estará lista para instalación?',
          date: '2024-12-09 09:15',
          isHerrero: false,
        },
        {
          id: 3,
          author: 'Carlos Hernández',
          message: 'Estará lista el próximo lunes para instalación.',
          date: '2024-12-09 11:45',
          isHerrero: true,
        },
      ],
    },
    'P-002': {
      name: 'Ventanas de Seguridad',
      description: 'Set de 4 ventanas con rejas de seguridad',
      status: 'pending',
      date: '2024-12-03',
      budget: '$1,800',
      clientName: 'María García',
      herreroName: 'Pendiente de asignación',
      appointmentDate: '2024-12-12',
      appointmentTime: '11:00',
      progress: [
        { step: 'Solicitud Enviada', completed: true, date: '2024-12-03' },
        { step: 'Cita Agendada', completed: true, date: '2024-12-03' },
        { step: 'En Fabricación', completed: false, date: null },
        { step: 'Instalación', completed: false, date: null },
        { step: 'Completado', completed: false, date: null },
      ],
      comments: [],
    },
  };

  const project = projectData[projectId as keyof typeof projectData] || projectData['P-001'];

  const handleSendComment = () => {
    if (newComment.trim()) {
      // Logic to send comment
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 pt-6 pb-24 rounded-b-3xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-white/90 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
        <h2 className="text-white mb-2">{project.name}</h2>
        <p className="text-white/90 text-sm">{project.description}</p>
      </div>

      {/* Content */}
      <div className="px-6 -mt-16 space-y-4">
        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <p className="text-xs text-gray-600">Fecha</p>
            </div>
            <p className="text-sm text-gray-900">{project.date}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <p className="text-xs text-gray-600">Presupuesto</p>
            </div>
            <p className="text-sm text-gray-900">{project.budget}</p>
          </div>
        </div>

        {/* Client/Herrero Info */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">
                {userType === 'client' ? 'Herrero Asignado' : 'Cliente'}
              </p>
              <p className="text-sm text-gray-900">
                {userType === 'client' ? project.herreroName : project.clientName}
              </p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-3">
            <p className="text-xs text-blue-700 mb-1">Cita Programada</p>
            <p className="text-sm text-blue-900">
              {project.appointmentDate} - {project.appointmentTime}
            </p>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-gray-900 mb-4">Progreso del Proyecto</h3>
          <div className="space-y-4">
            {project.progress.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Clock className="w-5 h-5 text-white" />
                    )}
                  </div>
                  {index < project.progress.length - 1 && (
                    <div
                      className={`w-0.5 h-12 ${
                        item.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    ></div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p className={`text-sm ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {item.step}
                  </p>
                  {item.date && (
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-900">Comentarios</h3>
          </div>

          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {project.comments.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay comentarios aún
              </p>
            ) : (
              project.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-3 rounded-xl ${
                    comment.isHerrero
                      ? 'bg-blue-50 ml-8'
                      : 'bg-gray-50 mr-8'
                  }`}
                >
                  <p className="text-xs text-gray-600 mb-1">{comment.author}</p>
                  <p className="text-sm text-gray-900 mb-1">{comment.message}</p>
                  <p className="text-xs text-gray-500">{comment.date}</p>
                </div>
              ))
            )}
          </div>

          {/* Comment Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
            />
            <button
              onClick={handleSendComment}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}