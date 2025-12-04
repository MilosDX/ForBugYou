import { useState } from 'react';

interface LoginScreenProps {
  onLogin: (userType: 'client' | 'herrero') => void;
  onNavigateToRegister: () => void;
}

export function LoginScreen({ onLogin, onNavigateToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'client' | 'herrero'>('client');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userType);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-gradient-primary">
      {/* Header */}
      <div className="p-5 text-center">
        <h1 className="text-white mb-2">ForYou</h1>
        <p className="text-white opacity-90 small">Gestión de Proyectos de Herrería</p>
      </div>

      {/* Login Form */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center px-4 pb-5">
        <div className="w-100" style={{ maxWidth: '450px' }}>
          <div className="bg-white rounded-4 shadow-lg p-5">
            <h2 className="text-dark text-center mb-2">Bienvenido</h2>
            <p className="text-secondary text-center mb-4">Inicia sesión para continuar</p>

            <form onSubmit={handleSubmit}>
              {/* User Type Toggle */}
              <div className="btn-group w-100 mb-4" role="group" aria-label="Tipo de usuario">
                <button
                  type="button"
                  onClick={() => setUserType('client')}
                  className={`btn flex-fill ${userType === 'client' 
                    ? 'btn-primary text-white' 
                    : 'btn-outline-secondary'}`}
                >
                  Cliente
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('herrero')}
                  className={`btn flex-fill ${userType === 'herrero' 
                    ? 'btn-primary text-white' 
                    : 'btn-outline-secondary'}`}
                >
                  Herrero
                </button>
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label small text-dark">
                  Correo Electrónico
                </label>
                <div className="input-icon">
                  <i className="bi bi-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label small text-dark">
                  Contraseña
                </label>
                <div className="input-icon">
                  <i className="bi bi-lock"></i>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-end mb-4">
                <button type="button" className="btn btn-link p-0 text-primary text-decoration-none">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mb-3"
                style={{ 
                  background: 'linear-gradient(90deg, #0d6efd 0%, #6f42c1 100%)',
                  border: 'none'
                }}
              >
                Iniciar Sesión
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-secondary small mb-0">
                ¿No tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="btn btn-link p-0 text-primary text-decoration-none"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
