import { ArrowLeft, Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface ClientDetailProps {
  clientId: string;
  onBack: () => void;
}

export function ClientDetail({ clientId, onBack }: ClientDetailProps) {
  // Mock data - simulating API response for get-cliente-by-id
  const clientData = {
    '1a2b3c4d': {
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+52 555 1234',
      address: 'Calle Principal 123, CDMX',
      joinDate: '2023-06-15',
      status: 'Activo',
      recentQuotes: [
        { id: 'Q-001', amount: '$2,500', status: 'Aceptado', date: '2024-11-28' },
        { id: 'Q-008', amount: '$1,200', status: 'Enviado', date: '2024-11-15' },
        { id: 'Q-015', amount: '$3,500', status: 'Aceptado', date: '2024-10-22' },
      ],
    },
    '2b3c4d5e': {
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+52 555 5678',
      address: 'Av. Reforma 456, CDMX',
      joinDate: '2023-08-20',
      status: 'Activo',
      recentQuotes: [
        { id: 'Q-002', amount: '$1,800', status: 'Enviado', date: '2024-11-27' },
        { id: 'Q-012', amount: '$2,100', status: 'Aceptado', date: '2024-11-05' },
      ],
    },
    '3c4d5e6f': {
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+52 555 9012',
      address: 'Colonia Centro 789, CDMX',
      joinDate: '2023-05-10',
      status: 'Activo',
      recentQuotes: [
        { id: 'Q-003', amount: '$3,200', status: 'Borrador', date: '2024-11-26' },
        { id: 'Q-009', amount: '$2,800', status: 'Aceptado', date: '2024-11-10' },
        { id: 'Q-018', amount: '$1,500', status: 'Aceptado', date: '2024-10-18' },
      ],
    },
  };

  const client = clientData[clientId as keyof typeof clientData] || clientData['1a2b3c4d'];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Clients
        </button>
        <h2 className="text-gray-900">Client Details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Contact Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
              <span className="text-2xl">{client.name.charAt(0)}</span>
            </div>
            <h3 className="text-center text-gray-900 mb-1">{client.name}</h3>
            <p className="text-center text-sm text-gray-600 mb-6">
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 rounded-full ${
                  client.status === 'Activo'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {client.status}
              </span>
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600 mb-1">Email</p>
                  <p className="text-sm text-gray-900">{client.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600 mb-1">Phone</p>
                  <p className="text-sm text-gray-900">{client.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600 mb-1">Address</p>
                  <p className="text-sm text-gray-900">{client.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600 mb-1">Client Since</p>
                  <p className="text-sm text-gray-900">{client.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Recent Quotes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-gray-900">Recent Quotes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Quote ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {client.recentQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quote.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quote.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 rounded-full ${
                            quote.status === 'Aceptado'
                              ? 'bg-green-100 text-green-800'
                              : quote.status === 'Enviado'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {quote.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}