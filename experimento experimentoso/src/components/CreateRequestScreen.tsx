import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Calendar, FileText, Eye } from 'lucide-react';

interface CreateRequestScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function CreateRequestScreen({ onComplete, onBack }: CreateRequestScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    description: '',
    materials: '',
    dimensions: '',
    budget: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  const availableDates = [
    { date: '2024-12-10', available: true },
    { date: '2024-12-11', available: false },
    { date: '2024-12-12', available: true },
    { date: '2024-12-13', available: true },
    { date: '2024-12-14', available: false },
    { date: '2024-12-15', available: true },
  ];

  const projectTypes = [
    'Puerta',
    'Ventana',
    'Portón',
    'Barandal',
    'Reja',
    'Escalera',
    'Otro',
  ];

  const timeSlots = ['09:00', '11:00', '14:00', '16:00', '18:00'];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={step === 1 ? onBack : handlePrevious}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            {step === 1 ? 'Cancelar' : 'Anterior'}
          </button>
          <h3 className="text-gray-900">Nueva Solicitud</h3>
          <div className="w-20"></div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <div className={`flex-1 h-1 ${step > 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <div className={`flex-1 h-1 ${step > 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            3
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Step 1: Detalles y Especificaciones */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Detalles del Proyecto</h3>
                <p className="text-sm text-gray-600">Cuéntanos sobre tu proyecto</p>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Nombre del Proyecto</label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="Ej: Puerta Principal"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-3">Tipo de Proyecto</label>
              <div className="grid grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, projectType: type })}
                    className={`py-3 px-4 border-2 rounded-xl transition-all ${
                      formData.projectType === type
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe los detalles de tu proyecto..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Dimensiones (opcional)</label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                placeholder="Ej: 2m x 1.5m"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Presupuesto Estimado (opcional)</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="$0.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Step 2: Agendar Cita */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Agendar Cita</h3>
                <p className="text-sm text-gray-600">Elige fecha y hora para la visita</p>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-3">Selecciona una Fecha</label>
              <div className="grid grid-cols-2 gap-3">
                {availableDates.map((item) => (
                  <button
                    key={item.date}
                    onClick={() =>
                      item.available &&
                      setFormData({ ...formData, appointmentDate: item.date })
                    }
                    disabled={!item.available}
                    className={`py-3 px-4 border-2 rounded-xl transition-all ${
                      formData.appointmentDate === item.date
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : item.available
                        ? 'border-gray-300 text-gray-700 hover:border-gray-400'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <p className="text-sm mb-1">
                      {new Date(item.date).toLocaleDateString('es-MX', {
                        weekday: 'short',
                      })}
                    </p>
                    <p className="text-xs">
                      {new Date(item.date).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                    {!item.available && (
                      <p className="text-xs text-red-500 mt-1">No disponible</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {formData.appointmentDate && (
              <div>
                <label className="block text-sm text-gray-700 mb-3">Selecciona una Hora</label>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, appointmentTime: time })}
                      className={`py-3 px-4 border-2 rounded-xl transition-all ${
                        formData.appointmentTime === time
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Revisar */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Revisar Solicitud</h3>
                <p className="text-sm text-gray-600">Verifica que todo esté correcto</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-gray-900 mb-4">Detalles del Proyecto</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Nombre</p>
                  <p className="text-sm text-gray-900">{formData.projectName || 'No especificado'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Tipo</p>
                  <p className="text-sm text-gray-900">{formData.projectType || 'No especificado'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Descripción</p>
                  <p className="text-sm text-gray-900">{formData.description || 'No especificado'}</p>
                </div>
                {formData.dimensions && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Dimensiones</p>
                    <p className="text-sm text-gray-900">{formData.dimensions}</p>
                  </div>
                )}
                {formData.budget && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Presupuesto</p>
                    <p className="text-sm text-gray-900">{formData.budget}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-gray-900 mb-4">Cita Programada</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Fecha</p>
                  <p className="text-sm text-gray-900">
                    {formData.appointmentDate
                      ? new Date(formData.appointmentDate).toLocaleDateString('es-MX', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'No especificado'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Hora</p>
                  <p className="text-sm text-gray-900">{formData.appointmentTime || 'No especificado'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        {step < 3 ? (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
          >
            <Check className="w-5 h-5" />
            Enviar Solicitud
          </button>
        )}
      </div>
      <div className="h-24"></div>
    </div>
  );
}