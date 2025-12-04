import { useState } from 'react';
import { Plus, Eye, Edit, ChevronLeft, ChevronRight } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Activo' | 'Inactivo';
}

interface ClientsProps {
  onClientClick: (id: string) => void;
}

export function Clients({ onClientClick }: ClientsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data - simulating API response
  const allClients: Client[] = [
    {
      id: '1a2b3c4d',
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+52 555 1234',
      status: 'Activo',
    },
    {
      id: '2b3c4d5e',
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+52 555 5678',
      status: 'Activo',
    },
    {
      id: '3c4d5e6f',
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+52 555 9012',
      status: 'Activo',
    },
    {
      id: '4d5e6f7g',
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+52 555 3456',
      status: 'Inactivo',
    },
    {
      id: '5e6f7g8h',
      name: 'Roberto Sánchez',
      email: 'roberto.sanchez@email.com',
      phone: '+52 555 7890',
      status: 'Activo',
    },
    {
      id: '6f7g8h9i',
      name: 'Laura Hernández',
      email: 'laura.hernandez@email.com',
      phone: '+52 555 2345',
      status: 'Activo',
    },
    {
      id: '7g8h9i0j',
      name: 'Diego Ramírez',
      email: 'diego.ramirez@email.com',
      phone: '+52 555 6789',
      status: 'Activo',
    },
    {
      id: '8h9i0j1k',
      name: 'Carmen Torres',
      email: 'carmen.torres@email.com',
      phone: '+52 555 0123',
      status: 'Inactivo',
    },
  ];

  const totalPages = Math.ceil(allClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = allClients.slice(startIndex, endIndex);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 mb-2">Clients</h2>
          <p className="text-gray-600">Manage your client database</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          New Client
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 rounded-full ${
                        client.status === 'Activo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onClientClick(client.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, allClients.length)} of{' '}
            {allClients.length} clients
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}