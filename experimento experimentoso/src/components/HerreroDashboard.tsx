import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Bell, User, Clock, DollarSign, MapPin, Eye, CheckCircle, XCircle, MessageSquare, Package } from "lucide-react";

interface HerreroDashboardProps {
  onNavigate: (screen: string) => void;
}

// Datos mock de solicitudes
const mockRequests = [
  {
    id: 1,
    client: "María González",
    project: "Reja para ventana",
    location: "Guadalajara, JAL",
    budget: "$1,000 - $3,000",
    timeline: "2-4 semanas",
    description: "Necesito una reja de seguridad para ventana frontal de mi casa. Medidas aproximadas 1.5m x 1.2m.",
    status: "nueva",
    date: "Hace 2 horas",
    urgent: false
  },
  {
    id: 2,
    client: "Carlos Mendoza",
    project: "Portón principal",
    location: "Zapopan, JAL",
    budget: "$5,000 - $10,000",
    timeline: "Urgente (1-2 semanas)",
    description: "Portón automático para entrada principal. Debe combinar con el diseño moderno de la casa.",
    status: "nueva",
    date: "Hace 4 horas",
    urgent: true
  },
  {
    id: 3,
    client: "Ana Ruiz",
    project: "Escalera exterior",
    location: "Tlaquepaque, JAL",
    budget: "$3,000 - $5,000",
    timeline: "1-2 meses",
    description: "Escalera de caracol para acceso a segundo piso exterior. Material preferido: hierro forjado.",
    status: "en-negociacion",
    date: "Ayer",
    urgent: false
  }
];

const mockActiveProjects = [
  {
    id: 1,
    client: "Roberto Silva",
    project: "Barandales para balcón",
    status: "fabricacion",
    progress: 65,
    estimatedCompletion: "5 días"
  },
  {
    id: 2,
    client: "Lucia Torres",
    project: "Puerta de entrada",
    status: "instalacion",
    progress: 90,
    estimatedCompletion: "2 días"
  }
];

export default function HerreroDashboard({ onNavigate }: HerreroDashboardProps) {
  return (
    <div className="min-h-screen bg-muted p-4">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl text-foreground">Hola, José</h1>
            <p className="text-muted-foreground text-sm">Tienes 3 solicitudes nuevas</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onNavigate('notifications')}
              className="relative"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onNavigate('inventory')}
            >
              <Package className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onNavigate('profile')}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="border-primary/20">
            <CardContent className="p-3 text-center">
              <div className="text-xl text-primary mb-1">5</div>
              <div className="text-xs text-muted-foreground">Solicitudes</div>
            </CardContent>
          </Card>
          <Card className="border-secondary/20">
            <CardContent className="p-3 text-center">
              <div className="text-xl text-secondary mb-1">2</div>
              <div className="text-xs text-muted-foreground">En progreso</div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="p-3 text-center">
              <div className="text-xl text-primary mb-1">$15K</div>
              <div className="text-xs text-muted-foreground">Este mes</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principales */}
        <Tabs defaultValue="solicitudes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="solicitudes">Solicitudes</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
          </TabsList>

          <TabsContent value="solicitudes" className="mt-4 space-y-3">
            {mockRequests.map((request) => (
              <Card 
                key={request.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate('request-review')}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-base">{request.project}</h3>
                        {request.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgente
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{request.client}</p>
                    </div>
                    <Badge 
                      variant={request.status === 'nueva' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {request.status === 'nueva' ? 'Nueva' : 'En negociación'}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {request.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="w-3 h-3 mr-1" />
                        <span>{request.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{request.timeline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t">
                    <span className="text-xs text-gray-500">{request.date}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                        <Eye className="w-3 h-3 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" className="text-xs px-2 py-1">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Responder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="proyectos" className="mt-4 space-y-3">
            {mockActiveProjects.map((project) => (
              <Card 
                key={project.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate('project-management')}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base">{project.project}</h3>
                      <p className="text-sm text-gray-600">{project.client}</p>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={`text-xs ${
                        project.status === 'fabricacion' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {project.status === 'fabricacion' ? 'Fabricación' : 'Instalación'}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progreso</span>
                      <span className="text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Completar en {project.estimatedCompletion}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}