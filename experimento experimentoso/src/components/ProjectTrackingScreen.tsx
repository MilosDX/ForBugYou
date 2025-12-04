import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ArrowLeft, Clock, DollarSign, User, Phone, MessageSquare, CheckCircle2, Package, Truck, Wrench } from "lucide-react";

interface ProjectTrackingScreenProps {
  onNavigate: (screen: string) => void;
}

export default function ProjectTrackingScreen({ onNavigate }: ProjectTrackingScreenProps) {
  // Datos mock del proyecto
  const project = {
    id: 1,
    title: "Reja para ventana",
    herrero: "José Martínez",
    herreroPhone: "+52 33 9876 5432",
    status: "En progreso",
    currentStage: "fabricacion",
    progress: 65,
    price: "$2,500",
    estimatedCompletion: "5 días",
    startDate: "15 Nov 2024",
    description: "Reja de seguridad para ventana frontal, hierro forjado con acabado negro mate",
    stages: [
      {
        id: 1,
        name: "Cotización aceptada",
        status: "completed",
        date: "15 Nov 2024",
        description: "El herrero aceptó el proyecto y se confirmó el precio"
      },
      {
        id: 2,
        name: "Toma de medidas",
        status: "completed",
        date: "16 Nov 2024",
        description: "Visita realizada para mediciones exactas"
      },
      {
        id: 3,
        name: "Fabricación",
        status: "in-progress",
        date: "17 Nov 2024",
        description: "En proceso de fabricación en el taller"
      },
      {
        id: 4,
        name: "Entrega",
        status: "pending",
        date: "Estimado: 22 Nov 2024",
        description: "Entrega e instalación en el domicilio"
      },
      {
        id: 5,
        name: "Instalación",
        status: "pending",
        date: "Estimado: 22 Nov 2024",
        description: "Instalación final y pruebas de funcionamiento"
      }
    ],
    updates: [
      {
        id: 1,
        date: "Hace 2 horas",
        message: "Iniciando proceso de soldadura de la estructura principal",
        type: "progress"
      },
      {
        id: 2,
        date: "Ayer",
        message: "Materiales preparados y cortados según especificaciones",
        type: "info"
      },
      {
        id: 3,
        date: "16 Nov",
        message: "Mediciones completadas. Todo está listo para iniciar fabricación",
        type: "success"
      }
    ]
  };

  const getStageIcon = (stage: string, status: string) => {
    const iconClass = status === 'completed' ? 'text-green-600' : 
                      status === 'in-progress' ? 'text-blue-600' : 'text-gray-400';
    
    switch (stage) {
      case 'Cotización aceptada':
        return <CheckCircle2 className={`w-4 h-4 ${iconClass}`} />;
      case 'Toma de medidas':
        return <Wrench className={`w-4 h-4 ${iconClass}`} />;
      case 'Fabricación':
        return <Package className={`w-4 h-4 ${iconClass}`} />;
      case 'Entrega':
        return <Truck className={`w-4 h-4 ${iconClass}`} />;
      case 'Instalación':
        return <CheckCircle2 className={`w-4 h-4 ${iconClass}`} />;
      default:
        return <Clock className={`w-4 h-4 ${iconClass}`} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted p-4">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('client-dashboard')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="ml-4 text-lg text-foreground">Seguimiento del Proyecto</h1>
        </div>

        {/* Información general del proyecto */}
        <Card className="mb-4 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{project.title}</CardTitle>
              <Badge className="bg-primary text-white">
                {project.status}
              </Badge>
            </div>
            <CardDescription className="text-sm">{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Progreso general</span>
              <span className="text-sm font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="w-full" />
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                <span>{project.price}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span>Faltan {project.estimatedCompletion}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información del herrero */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <User className="w-4 h-4 mr-2" />
              Tu Herrero
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{project.herrero}</p>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Phone className="w-3 h-3 mr-1" />
                  <span>{project.herreroPhone}</span>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => onNavigate('chat')}>
                <MessageSquare className="w-4 h-4 mr-1" />
                Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Etapas del proyecto */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Etapas del Proyecto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.stages.map((stage, index) => (
                <div key={stage.id} className="flex space-x-3">
                  <div className="flex flex-col items-center">
                    {getStageIcon(stage.name, stage.status)}
                    {index < project.stages.length - 1 && (
                      <div className={`w-px h-8 mt-2 ${
                        stage.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium ${
                        stage.status === 'completed' ? 'text-green-800' :
                        stage.status === 'in-progress' ? 'text-blue-800' : 'text-gray-600'
                      }`}>
                        {stage.name}
                      </h4>
                      {stage.status === 'in-progress' && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          En proceso
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{stage.description}</p>
                    <p className="text-xs text-gray-500">{stage.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actualizaciones recientes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Actualizaciones Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.updates.map((update) => (
                <div key={update.id} className="border-l-2 border-blue-200 pl-3">
                  <p className="text-sm text-gray-700">{update.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{update.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Acciones */}
        <div className="space-y-3">
          <Button 
            onClick={() => onNavigate('chat')}
            className="w-full flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contactar al herrero</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onNavigate('project-details')}
            className="w-full"
          >
            Ver detalles completos
          </Button>
        </div>
      </div>
    </div>
  );
}