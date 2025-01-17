# GestorTareas
## Ejecución Local

### Prerrequisitos
- Docker y Docker Compose
- Git

### Pasos para ejecutar localmente
1. Clonar el repositorio
```bash
git clone https://github.com/jdds97/GestorTareas.git
cd GestorTareas
```

2. Configurar variables de entorno
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Iniciar servicios con Docker Compose
```bash
./docker/start.sh
```
4. Si hiciera falta cambiar los permisos para iniciar el entorno docker
```bash
sudo chmod +x ./docker/start.sh
```
#### Pasos para iniciar backend
1. Ejecutar comandos en el contenedor de backend
```bash
docker compose exec backend bash
```
2. Ejecutar migraciones y crear superusuario
```bash
make migrations
make migrate
make superuser
```
3. Iniciar servidor de desarrollo
```bash
make uwsgi  
```

#### Pasos para iniciar frontend
1. Ejecutar comandos en el contenedor de frontend
```bash
docker compose exec -u node frontend bash
```
2. Iniciar servidor de desarrollo
```bash
make dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Nginx: http://localhost:8080

## Arquitectura

### Backend (Django + Django REST Framework)
- API RESTful
- Autenticación JWT
- Base de datos PostgreSQL
- Modelos:
    - User (autenticación)
    - Task (gestión de tareas)

### Frontend (Next.js)
- Autenticación con NextAuth.js
- Interfaz de usuario moderna y responsiva
- Comunicación con backend mediante API REST

### Infraestructura
- Nginx como proxy reverso
- Contenedores Docker para cada servicio
- Volúmenes persistentes para datos y archivos estáticos