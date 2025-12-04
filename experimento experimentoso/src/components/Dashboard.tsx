import { Users, FileText, TrendingUp, Clock } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Clients',
      value: '48',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Active Quotes',
      value: '23',
      change: '+8%',
      icon: FileText,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Total Revenue',
      value: '$45,230',
      change: '+23%',
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Pending',
      value: '7',
      change: '-3%',
      icon: Clock,
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  const recentQuotes = [
    {
      id: 'Q-001',
      client: 'Juan Pérez',
      amount: '$2,500',
      status: 'Aceptado',
      date: '2024-11-28',
    },
    {
      id: 'Q-002',
      client: 'María García',
      amount: '$1,800',
      status: 'Enviado',
      date: '2024-11-27',
    },
    {
      id: 'Q-003',
      client: 'Carlos López',
      amount: '$3,200',
      status: 'Borrador',
      date: '2024-11-26',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Quotes */}
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
                  Client
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
              {recentQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.client}
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
  );
}