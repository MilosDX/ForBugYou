import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, MapPin, Clock, DollarSign, User, Phone, Mail, CheckCircle, XCircle, MessageSquare, Calculator } from "lucide-react";

interface RequestReviewScreenProps {
  onNavigate: (screen: string) => void;
}

export default function RequestReviewScreen({ onNavigate }: RequestReviewScreenProps) {
  const [responseType, setResponseType] = useState<'accept' | 'counter' | null>(null);
  const [quotedPrice, setQuotedPrice] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [notes, setNotes] = useState("");

  // Datos mock de la solicitud
  const request = {
    id: 1,
    client: "María González",
    project: "Reja para ventana",
    location: "Guadalajara, JAL",
    budget: "$1,000 - $3,000",
    timeline: "2-4 semanas",
    description: "Necesito una reja de seguridad para ventana frontal de mi casa. Medidas aproximadas 1.5m x 1.2m. La casa es de estilo colonial y me gustaría que la reja tenga un diseño que combine con la arquitectura. Preferencia por hierro forjado con acabado negro mate.",
    dimensions: "1.5m x 1.2m",
    materials: "Hierro forjado",
    photos: ["foto1.jpg", "foto2.jpg"],
    clientInfo: {
      phone: "+52 33 1234 5678",
      email: "maria.gonzalez@email.com",
      address: "Av. Principal 123, Col. Centro, Guadalajara"
    },
    date: "Hace 2 horas",
    urgent: false
  };

  const handleResponse = () => {
    // Aquí se enviaría la respuesta al cliente
    onNavigate('herrero-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('herrero-dashboard')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="ml-4 text-xl text-gray-900">Revisar Solicitud</h1>
        </div>

        {/* Información del proyecto */}
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{request.project}</CardTitle>
              {request.urgent && (
                <Badge variant="destructive" className="text-xs">
                  Urgente
                </Badge>
              )}
            </div>
            <CardDescription>{request.date}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-700">{request.description}</p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{request.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span>{request.timeline}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                <span>{request.budget}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calculator className="w-4 h-4 mr-2 text-gray-400" />
                <span>{request.dimensions}</span>
              </div>
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-gray-600 mb-1">Material preferido:</p>
              <Badge variant="secondary">{request.materials}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Información del cliente */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <User className="w-4 h-4 mr-2" />
              Información del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">{request.client}</p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              <span>{request.clientInfo.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
              <span>{request.clientInfo.email}</span>
            </div>
            <div className="flex items-start text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
              <span>{request.clientInfo.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Fotos del proyecto */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Fotos del área</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {request.photos.map((photo, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">Foto {index + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Respuesta del herrero */}
        {!responseType ? (
          <div className="space-y-3">
            <h3 className="text-lg text-gray-900 mb-4">¿Cómo quieres responder?</h3>
            
            <Button 
              onClick={() => setResponseType('accept')}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Aceptar proyecto</span>
            </Button>

            <Button 
              onClick={() => setResponseType('counter')}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hacer contrapropuesta</span>
            </Button>

            <Button 
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border-red-200 text-red-700 hover:bg-red-50"
            >
              <XCircle className="w-4 h-4" />
              <span>Declinar proyecto</span>
            </Button>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {responseType === 'accept' ? 'Aceptar Proyecto' : 'Contrapropuesta'}
              </CardTitle>
              <CardDescription>
                {responseType === 'accept' 
                  ? 'Proporciona una cotización detallada'
                  : 'Sugiere modificaciones al proyecto'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="price">Precio cotizado</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="price"
                    placeholder="2,500"
                    value={quotedPrice}
                    onChange={(e) => setQuotedPrice(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="time">Tiempo estimado</Label>
                <Input
                  id="time"
                  placeholder="2-3 semanas"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="notes">
                  {responseType === 'accept' 
                    ? 'Detalles de la cotización' 
                    : 'Sugerencias y modificaciones'
                  }
                </Label>
                <Textarea
                  id="notes"
                  placeholder={responseType === 'accept'
                    ? "Incluye detalles sobre materiales, proceso de trabajo, garantías..."
                    : "Explica las modificaciones que sugieres y por qué..."
                  }
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setResponseType(null)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleResponse}
                  className="flex-1"
                  disabled={!quotedPrice || !estimatedTime}
                >
                  Enviar respuesta
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}