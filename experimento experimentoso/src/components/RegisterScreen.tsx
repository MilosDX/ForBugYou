import { useState } from 'react';

interface RegisterScreenProps {
  onRegister: (userType: 'client' | 'herrero') => void;
  onNavigateToLogin: () => void;
}

export function RegisterScreen({ onRegister, onNavigateToLogin }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [userType, setUserType] = useState<'client' | 'herrero'>('client');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      onRegister(userType);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-gradient-primary">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={onNavigateToLogin}
          className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-2 p-0"
        >
          <i className="bi bi-arrow-left"></i>
          Volver
        </button>
      </div>

      {/* Register Form */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center px-4 pb-5">
        <div className="w-100" style={{ maxWidth: '450px' }}>
          <div className="bg-white rounded-4 shadow-lg p-5">
            <h2 className="text-dark text-center mb-2">Crear Cuenta</h2>
            <p className="text-secondary text-center mb-4">Regístrate para comenzar</p>

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

              {/* Name Field */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label small text-dark">
                  Nombre Completo
                </label>
                <div className="input-icon">
                  <i className="bi bi-person"></i>
                  <input
                    type="text"
                    id="name"
                    className="form-control form-control-lg"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label small text-dark">
                  Teléfono
                </label>
                <div className="input-icon">
                  <i className="bi bi-telephone"></i>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control form-control-lg"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+52 555 1234"
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
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label small text-dark">
                  Confirmar Contraseña
                </label>
                <div className="input-icon">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control form-control-lg"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mb-3 mt-3"
                style={{ 
                  background: 'linear-gradient(90deg, #0d6efd 0%, #6f42c1 100%)',
                  border: 'none'
                }}
              >
                Crear Cuenta
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-secondary small mb-0">
                ¿Ya tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="btn btn-link p-0 text-primary text-decoration-none"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
