# GestorTareas

## 📋 Introducción

GestorTareas es una aplicación web moderna de gestión de tareas diseñada para ayudar a usuarios y equipos a organizar, seguir y completar sus actividades de manera eficiente. La aplicación proporciona una interfaz intuitiva y herramientas poderosas para la administración de tareas personales y colaborativas.

## 🎯 Propósito

El objetivo principal de GestorTareas es simplificar la gestión de tareas mediante una plataforma que combine funcionalidad robusta con una experiencia de usuario excepcional. La aplicación está diseñada para:

- Facilitar la creación, edición y seguimiento de tareas
- Proporcionar un sistema de autenticación seguro
- Ofrecer una interfaz responsiva accesible desde cualquier dispositivo
- Mantener un historial completo de actividades
- Permitir escalabilidad para futuras funcionalidades colaborativas

## ✨ Características

### Gestión de Tareas
- **Creación y edición** de tareas con título y descripción detallada
- **Estados de tarea**: Pendiente, En Progreso, Completada
- **Fechas de vencimiento** para mejor planificación
- **Ordenamiento automático** por fecha de creación
- **Historial de cambios** con timestamps automáticos

### Autenticación y Seguridad
- **Sistema de usuarios** con autenticación JWT
- **Registro e inicio de sesión** seguros
- **Gestión de sesiones** con NextAuth.js
- **Autorización basada en roles** para futuras extensiones

### Interfaz de Usuario
- **Diseño responsivo** optimizado para móviles y escritorio
- **Interfaz moderna** construida con NextUI y Tailwind CSS
- **Tema oscuro/claro** adaptable a preferencias del usuario
- **Navegación intuitiva** con componentes de React

## 🛠️ Tecnologías

### Backend
- **Django 5.0+** - Framework web robusto de Python
- **Django REST Framework** - API RESTful poderosa y flexible
- **PostgreSQL** - Base de datos relacional avanzada
- **JWT (JSON Web Tokens)** - Autenticación stateless segura
- **uWSGI** - Servidor de aplicaciones Python de alto rendimiento

### Frontend
- **Next.js 14** - Framework de React con renderizado híbrido
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - JavaScript tipado para mayor robustez
- **NextUI** - Librería de componentes moderna
- **Tailwind CSS** - Framework de CSS utilitario
- **Framer Motion** - Animaciones fluidas
- **NextAuth.js** - Autenticación para Next.js
- **Zustand** - Gestión de estado ligera
- **React Hook Form** - Manejo de formularios eficiente

### DevOps e Infraestructura
- **Docker & Docker Compose** - Containerización y orquestación
- **Nginx** - Proxy reverso y servidor web
- **Pipenv** - Gestión de dependencias Python
- **ESLint & Prettier** - Linting y formateo de código
- **Jest** - Testing framework para JavaScript

### Herramientas de Desarrollo
- **Black** - Formateador de código Python
- **Flake8** - Linter para Python
- **Pytest** - Framework de testing para Python
- **Git** - Control de versiones

## 🏗️ Arquitectura

### Arquitectura General
La aplicación sigue una arquitectura de microservicios containerizada con separación clara entre frontend y backend:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Nginx       │    │    Backend      │
│   (Next.js)     │◄──►│  Proxy Reverso  │◄──►│    (Django)     │
│   Port: 3000    │    │   Port: 8080    │    │   Port: 8000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │   PostgreSQL    │
                                              │   Base de Datos │
                                              └─────────────────┘
```

### Backend (API RESTful)
- **Arquitectura en capas** con separación de responsabilidades
- **Modelos Django** para User y Task con relaciones bien definidas
- **Serializers DRF** para validación y transformación de datos
- **Vistas basadas en clases** para operaciones CRUD
- **Autenticación JWT** para seguridad stateless
- **Configuración modular** con settings separados por ambiente

### Frontend (SPA - Single Page Application)
- **Arquitectura de componentes** reutilizables con React
- **Páginas dinámicas** con Next.js App Router
- **Estado global** gestionado con Zustand
- **Comunicación HTTP** mediante Axios con interceptors
- **Formularios controlados** con React Hook Form y validación Zod
- **Routing del lado del cliente** para navegación fluida

### Infraestructura
- **Contenedores Docker** para cada servicio garantizando consistencia
- **Nginx como proxy reverso** para balanceo de carga y servir archivos estáticos
- **Volúmenes persistentes** para datos de base de datos y archivos media
- **Redes Docker** para comunicación segura entre servicios
- **Variables de entorno** para configuración flexible por ambiente

## 🚀 Ejecución Local

### Prerrequisitos
- **Docker** (versión 20.0+) y **Docker Compose** (versión 2.0+)
- **Git** para clonar el repositorio
- **4GB RAM mínimo** para ejecutar todos los servicios

### Pasos para ejecutar localmente

#### 1. Clonar el repositorio
```bash
git clone https://github.com/jdds97/GestorTareas.git
cd GestorTareas
```

#### 2. Configurar variables de entorno
```bash
# Copiar archivos de configuración de ejemplo
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Editar variables según sea necesario
# backend/.env - configuración de base de datos, JWT, etc.
# frontend/.env - URLs de API, configuración de NextAuth
```

#### 3. Iniciar servicios con Docker Compose
```bash
# Dar permisos de ejecución al script (si es necesario)
sudo chmod +x ./docker/start.sh

# Iniciar todos los servicios
./docker/start.sh
```

#### 4. Configurar el backend
```bash
# Acceder al contenedor del backend
docker compose exec backend bash

# Ejecutar migraciones de base de datos
make migrations
make migrate

# Crear usuario administrador (opcional)
make superuser
```

#### 5. Iniciar servidor de desarrollo del backend
```bash
# Dentro del contenedor backend
make uwsgi
```

#### 6. Configurar el frontend
```bash
# Acceder al contenedor del frontend
docker compose exec -u node frontend bash

# Iniciar servidor de desarrollo
make dev
```

### 🌐 Acceso a la aplicación

Una vez iniciados todos los servicios, la aplicación estará disponible en:

- **Frontend (Usuario final)**: http://localhost:3000
- **Backend API (Desarrollo)**: http://localhost:8000
- **Aplicación completa (Producción)**: http://localhost:8080
- **Admin Django**: http://localhost:8000/admin

### 🔧 Comandos útiles

```bash
# Ver logs de todos los servicios
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f frontend
docker compose logs -f backend

# Reconstruir servicios después de cambios
docker compose build

# Detener todos los servicios
docker compose down

# Detener y eliminar volúmenes (⚠️ elimina datos)
docker compose down -v
```

## 📝 Desarrollo

### Estructura del proyecto
```
GestorTareas/
├── backend/              # Aplicación Django
│   ├── apps/            # Aplicaciones Django
│   ├── config/          # Configuración del proyecto
│   └── docker/          # Scripts Docker específicos
├── frontend/            # Aplicación Next.js
│   ├── src/            # Código fuente
│   ├── public/         # Archivos estáticos
│   └── package.json    # Dependencias Node.js
├── docker/             # Configuración Docker
└── docker-compose.yml # Orquestación de servicios
```

### Próximas funcionalidades
- Colaboración en tareas entre usuarios
- Notificaciones en tiempo real
- Categorías y etiquetas para tareas
- Dashboard de productividad
- API REST pública con documentación Swagger
- Aplicación móvil nativa