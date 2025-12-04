import { useState } from 'react';
import { Plus, Eye, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

interface Quote {
  id: string;
  clientName: string;
  amount: number;
  status: 'Borrador' | 'Enviado' | 'Aceptado';
  date: string;
}

interface QuotesProps {
  onQuoteClick: (id: string) => void;
}

export function Quotes({ onQuoteClick }: QuotesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 10;

  // Mock data - simulating API response
  const allQuotes: Quote[] = [
    {
      id: 'Q-001',
      clientName: 'Juan Pérez',
      amount: 2500,
      status: 'Aceptado',
      date: '2024-11-28',
    },
    {
      id: 'Q-002',
      clientName: 'María García',
      amount: 1800,
      status: 'Enviado',
      date: '2024-11-27',
    },
    {
      id: 'Q-003',
      clientName: 'Carlos López',
      amount: 3200,
      status: 'Borrador',
      date: '2024-11-26',
    },
    {
      id: 'Q-004',
      clientName: 'Ana Martínez',
      amount: 1500,
      status: 'Aceptado',
      date: '2024-11-25',
    },
    {
      id: 'Q-005',
      clientName: 'Roberto Sánchez',
      amount: 2800,
      status: 'Enviado',
      date: '2024-11-24',
    },
    {
      id: 'Q-006',
      clientName: 'Laura Hernández',
      amount: 2200,
      status: 'Aceptado',
      date: '2024-11-23',
    },
    {
      id: 'Q-007',
      clientName: 'Diego Ramírez',
      amount: 1900,
      status: 'Borrador',
      date: '2024-11-22',
    },
    {
      id: 'Q-008',
      clientName: 'Juan Pérez',
      amount: 1200,
      status: 'Enviado',
      date: '2024-11-15',
    },
    {
      id: 'Q-009',
      clientName: 'Carlos López',
      amount: 2800,
      status: 'Aceptado',
      date: '2024-11-10',
    },
    {
      id: 'Q-010',
      clientName: 'María García',
      amount: 2100,
      status: 'Aceptado',
      date: '2024-11-05',
    },
  ];

  const handleSort = (field: 'date' | 'status') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedQuotes = [...allQuotes].sort((a, b) => {
    if (sortBy === 'date') {
      const comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortOrder === 'asc' ? comparison : -comparison;
    } else {
      const statusOrder = { Borrador: 1, Enviado: 2, Aceptado: 3 };
      const comparison = statusOrder[a.status] - statusOrder[b.status];
      return sortOrder === 'asc' ? comparison : -comparison;
    }
  });

  const totalPages = Math.ceil(sortedQuotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuotes = sortedQuotes.slice(startIndex, endIndex);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 mb-2">Quotes</h2>
          <p className="text-gray-600">Manage all your quotes and proposals</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          New Quote
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Quote ID
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                  >
                    Status
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                  >
                    Date
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(quote.amount)}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onQuoteClick(quote.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Quote"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedQuotes.length)} of{' '}
            {sortedQuotes.length} quotes
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