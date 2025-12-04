import { ArrowLeft, Bell, CheckCircle, Clock, MessageSquare, AlertCircle } from 'lucide-react';

interface NotificationsScreenProps {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const notifications = [
    {
      id: 1,
      type: 'status',
      title: 'Proyecto Actualizado',
      message: 'Tu proyecto "Puerta Principal" ha pasado a fase de instalación',
      date: '2024-12-02 10:30',
      read: false,
      icon: CheckCircle,
      color: 'green',
    },
    {
      id: 2,
      type: 'message',
      title: 'Nuevo Comentario',
      message: 'Carlos Hernández comentó en "Puerta Principal"',
      date: '2024-12-01 14:15',
      read: false,
      icon: MessageSquare,
      color: 'blue',
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Recordatorio de Cita',
      message: 'Tienes una cita programada para el 15 de Diciembre a las 10:00',
      date: '2024-11-30 09:00',
      read: true,
      icon: Clock,
      color: 'orange',
    },
    {
      id: 4,
      type: 'alert',
      title: 'Cotización Disponible',
      message: 'Tu solicitud "Ventanas de Seguridad" tiene una nueva cotización',
      date: '2024-11-29 16:45',
      read: true,
      icon: AlertCircle,
      color: 'purple',
    },
    {
      id: 5,
      type: 'status',
      title: 'Proyecto Completado',
      message: 'El proyecto "Barandal Escalera" ha sido completado exitosamente',
      date: '2024-11-28 11:20',
      read: true,
      icon: CheckCircle,
      color: 'green',
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getColorClasses = (color: string, read: boolean) => {
    const opacity = read ? '50' : '100';
    switch (color) {
      case 'green':
        return {
          bg: `bg-green-${opacity}`,
          text: 'text-green-600',
        };
      case 'blue':
        return {
          bg: `bg-blue-${opacity}`,
          text: 'text-blue-600',
        };
      case 'orange':
        return {
          bg: `bg-orange-${opacity}`,
          text: 'text-orange-600',
        };
      case 'purple':
        return {
          bg: `bg-purple-${opacity}`,
          text: 'text-purple-600',
        };
      default:
        return {
          bg: `bg-gray-${opacity}`,
          text: 'text-gray-600',
        };
    }
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white mb-2">Notificaciones</h2>
            <p className="text-white/90 text-sm">
              {unreadCount > 0 ? `${unreadCount} notificaciones sin leer` : 'Todo al día'}
            </p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-16 pb-6">
        {/* Mark all as read button */}
        {unreadCount > 0 && (
          <div className="mb-4">
            <button className="text-sm text-blue-600 hover:text-blue-700 bg-white px-4 py-2 rounded-xl shadow">
              Marcar todas como leídas
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            const colors = getColorClasses(notification.color, notification.read);

            return (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl p-5 shadow hover:shadow-lg transition-shadow ${
                  !notification.read ? 'border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 ${
                      notification.read ? 'bg-gray-100' : colors.bg
                    } rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                    <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'} mb-2`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">{notification.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600">No tienes notificaciones</p>
          </div>
        )}
      </div>
    </div>
  );
}