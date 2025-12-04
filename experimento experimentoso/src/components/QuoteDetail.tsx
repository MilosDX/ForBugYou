import { ArrowLeft, Download, User, Calendar, Hash } from 'lucide-react';

interface QuoteDetailProps {
  quoteId: string;
  onBack: () => void;
}

export function QuoteDetail({ quoteId, onBack }: QuoteDetailProps) {
  // Mock data - simulating API response for get-cotizacion-by-id & detalles-solicitud
  const quoteData = {
    'Q-001': {
      id: 'Q-001',
      clientName: 'Juan Pérez',
      clientEmail: 'juan.perez@email.com',
      date: '2024-11-28',
      status: 'Aceptado',
      items: [
        {
          id: 1,
          product: 'Puerta de Hierro Forjado',
          quantity: 2,
          unitPrice: 850.0,
          subtotal: 1700.0,
        },
        {
          id: 2,
          product: 'Ventana de Seguridad',
          quantity: 4,
          unitPrice: 450.0,
          subtotal: 1800.0,
        },
        {
          id: 3,
          product: 'Instalación y Acabado',
          quantity: 1,
          unitPrice: 500.0,
          subtotal: 500.0,
        },
      ],
      subtotal: 4000.0,
      tax: 640.0,
      total: 4640.0,
    },
    'Q-002': {
      id: 'Q-002',
      clientName: 'María García',
      clientEmail: 'maria.garcia@email.com',
      date: '2024-11-27',
      status: 'Enviado',
      items: [
        {
          id: 1,
          product: 'Reja para Ventana',
          quantity: 3,
          unitPrice: 380.0,
          subtotal: 1140.0,
        },
        {
          id: 2,
          product: 'Barandal de Escalera',
          quantity: 1,
          unitPrice: 1200.0,
          subtotal: 1200.0,
        },
      ],
      subtotal: 2340.0,
      tax: 374.4,
      total: 2714.4,
    },
    'Q-003': {
      id: 'Q-003',
      clientName: 'Carlos López',
      clientEmail: 'carlos.lopez@email.com',
      date: '2024-11-26',
      status: 'Borrador',
      items: [
        {
          id: 1,
          product: 'Portón Automático',
          quantity: 1,
          unitPrice: 2500.0,
          subtotal: 2500.0,
        },
        {
          id: 2,
          product: 'Sistema de Apertura',
          quantity: 1,
          unitPrice: 800.0,
          subtotal: 800.0,
        },
        {
          id: 3,
          product: 'Instalación Completa',
          quantity: 1,
          unitPrice: 600.0,
          subtotal: 600.0,
        },
      ],
      subtotal: 3900.0,
      tax: 624.0,
      total: 4524.0,
    },
  };

  const quote = quoteData[quoteId as keyof typeof quoteData] || quoteData['Q-001'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors print:hidden"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Quotes
        </button>
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900">Quote Details</h2>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors print:hidden"
          >
            <Download className="w-5 h-5" />
            Print / PDF
          </button>
        </div>
      </div>

      {/* Quote Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Header Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Hash className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Quote ID</p>
              <p className="text-sm text-gray-900">{quote.id}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Date</p>
              <p className="text-sm text-gray-900">{quote.date}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Client</p>
              <p className="text-sm text-gray-900">{quote.clientName}</p>
              <p className="text-xs text-gray-600">{quote.clientEmail}</p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span
            className={`px-3 py-1 inline-flex text-sm rounded-full ${
              quote.status === 'Aceptado'
                ? 'bg-green-100 text-green-800'
                : quote.status === 'Enviado'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            {quote.status}
          </span>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <h3 className="text-gray-900 mb-4">Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quote.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.product}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">
                      {formatCurrency(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-96 space-y-3">
            <div className="flex items-center justify-between py-2 border-t border-gray-200">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-sm text-gray-900">{formatCurrency(quote.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Tax (16%)</span>
              <span className="text-sm text-gray-900">{formatCurrency(quote.tax)}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-t-2 border-gray-900">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">{formatCurrency(quote.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}