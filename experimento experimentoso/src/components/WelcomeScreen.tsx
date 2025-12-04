import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Hammer, Users, CheckCircle } from "lucide-react";

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted to-accent p-4 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Hammer className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">ForYou</h1>
          <p className="text-secondary font-medium text-sm mb-1">FORJANDO PARA TI</p>
          <p className="text-muted-foreground text-sm">Gestión integral de proyectos de herrería</p>
        </div>

        {/* Características principales */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-foreground">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm">Cotizaciones automáticas</span>
          </div>
          <div className="flex items-center space-x-3 text-foreground">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm">Seguimiento en tiempo real</span>
          </div>
          <div className="flex items-center space-x-3 text-foreground">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm">Gestión de inventario</span>
          </div>
        </div>

        {/* Opciones de registro */}
        <div className="space-y-3">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-primary/20 hover:border-primary/40" onClick={() => onNavigate('register-client')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Users className="w-5 h-5 text-secondary" />
                <span>Soy Cliente</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Solicita trabajos de herrería personalizados
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-primary/20 hover:border-primary/40" onClick={() => onNavigate('register-herrero')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Hammer className="w-5 h-5 text-primary" />
                <span>Soy Herrero</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Gestiona solicitudes y proyectos
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Enlace para usuarios existentes */}
        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('login')}
            className="text-primary hover:text-primary/80 text-sm"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </div>
      </div>
    </div>
  );
}