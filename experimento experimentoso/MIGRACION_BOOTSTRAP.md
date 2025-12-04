# Guía de Migración de Tailwind CSS a Bootstrap

## ✅ Cambios Completados

1. **package.json**: Se agregó Bootstrap 5.3.3 y react-bootstrap
2. **index.html**: Se incluyó Bootstrap CSS y JS vía CDN, además de Bootstrap Icons
3. **src/index.css**: Se simplificó para usar solo estilos básicos personalizados
4. **src/App.tsx**: Migrado a clases Bootstrap
5. **src/components/LoginScreen.tsx**: Completamente migrado a Bootstrap
6. **src/components/RegisterScreen.tsx**: Completamente migrado a Bootstrap

## 🔄 Equivalencias de Clases Comunes

### Layout y Espaciado
- `min-h-screen` → `min-vh-100`
- `flex` → `d-flex`
- `flex-col` → `flex-column`
- `items-center` → `align-items-center`
- `justify-center` → `justify-content-center`
- `gap-3` → `gap-3` (Bootstrap 5 tiene gap utilities)
- `p-6` → `p-4` o `p-5`
- `px-6` → `px-4` o `px-5`
- `mb-8` → `mb-4` o `mb-5`
- `w-full` → `w-100`
- `max-w-md` → usar `style={{ maxWidth: '450px' }}` o crear clase personalizada

### Colores y Fondos
- `bg-gray-50` → `bg-light`
- `bg-white` → `bg-white`
- `bg-blue-500` → `bg-primary`
- `text-gray-600` → `text-secondary`
- `text-white` → `text-white`
- `text-blue-600` → `text-primary`

### Botones
- Botones personalizados → usar clases `btn`, `btn-primary`, `btn-secondary`, etc.
- Toggle buttons → usar `btn-group` con `btn-outline-secondary` y `btn-primary`

### Formularios
- Inputs → usar `form-control`, `form-control-lg`
- Labels → usar `form-label`
- Input con icono → usar la clase personalizada `.input-icon` definida en `index.css`

### Bordes y Sombras
- `rounded-xl` → `rounded-3` o `rounded-4`
- `rounded-full` → `rounded-circle`
- `shadow-lg` → `shadow-lg`
- `border` → `border`

### Iconos
- Lucide React icons → Bootstrap Icons (`<i className="bi bi-icon-name"></i>`)
- Ejemplo: `<Mail />` → `<i className="bi bi-envelope"></i>`

## 📝 Componentes Pendientes de Migrar

Los siguientes componentes aún usan Tailwind CSS y necesitan ser migrados:

- `src/components/ClientDashboard.tsx`
- `src/components/HerreroDashboard.tsx`
- `src/components/HerreroAdminDashboard.tsx`
- `src/components/CreateRequestScreen.tsx`
- `src/components/MisProyectosScreen.tsx`
- `src/components/ProjectDetailScreen.tsx`
- `src/components/EditProfileScreen.tsx`
- `src/components/NotificationsScreen.tsx`
- `src/components/Dashboard.tsx`
- `src/components/Clients.tsx`
- `src/components/ClientDetail.tsx`
- `src/components/Quotes.tsx`
- `src/components/QuoteDetail.tsx`
- `src/components/ProjectTrackingScreen.tsx`
- `src/components/RequestReviewScreen.tsx`
- `src/components/WelcomeScreen.tsx`

## 🎨 Componentes UI Personalizados (src/components/ui/)

La carpeta `src/components/ui/` contiene componentes de shadcn/ui basados en Radix UI. 
Estos pueden:
1. **Eliminarse** si no se usan
2. **Reemplazarse** con componentes de Bootstrap o react-bootstrap
3. **Mantenerse** si se necesitan, pero actualizar los estilos para usar Bootstrap

## 🚀 Próximos Pasos

1. Instalar dependencias: `npm install`
2. Migrar componentes uno por uno siguiendo las equivalencias
3. Probar cada componente después de migrarlo
4. Opcionalmente, instalar `react-bootstrap` si se quieren usar componentes React de Bootstrap:
   ```bash
   npm install react-bootstrap
   ```

## 📚 Recursos

- [Bootstrap 5.3 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/) (opcional)

