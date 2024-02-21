# Sistema de Tickets y Consultas - README

Este proyecto es un sistema de tickets y consultas que permite a los clientes autenticados crear tickets para recibir ayuda o hacer consultas, y al personal gestionar estos tickets desde un dashboard.

## Endpoints y Rutas

### 1. Creación de Tickets
- Método: POST
- Endpoint: `/tickets`
- Controlador: Crear un nuevo ticket en la base de datos.

### 2. Visualización de Tickets Anteriores
- Método: GET
- Endpoint: `/tickets`
- Controlador: Obtener todos los tickets relacionados con el cliente autenticado.

### 3. Sistema de Prioridades
- Método: GET
- Endpoint: `/priorities`
- Controlador: Obtener la lista de prioridades disponibles.

### 4. Cierre de Tickets por Parte de los Clientes
- Método: PUT
- Endpoint: `/tickets/:ticketId/close`
- Controlador: Cambiar el estado del ticket especificado a "cerrado".

### 5. Dashboard de Tickets - Lista de Tickets
- Método: GET
- Endpoint: `/dashboard/tickets`
- Controlador: Obtener todos los tickets creados por los clientes para el dashboard del personal.

### 6. Cambiar el Estado de los Tickets
- Método: PUT
- Endpoint: `/dashboard/tickets/:ticketId/update-status`
- Controlador: Actualizar el estado de un ticket específico por parte del personal.

### 7. Inicio de Sesión (Login)
- Método: POST
- Endpoint: `/login`
- Controlador: Validar las credenciales del usuario y proporcionar un token de acceso.

### 8. Creación de Consultas
- Método: POST
- Endpoint: `/consultas`
- Controlador: Crear una nueva consulta en la base de datos.

### 9. Lista de Consultas para Clientes
- Método: GET
- Endpoint: `/consultas`
- Controlador: Obtener todas las consultas creadas por el cliente autenticado.

## Instalación y Uso

1. Clona este repositorio: `git clone https://github.com/tuusuario/tu-proyecto.git`
2. Instala las dependencias: `npm install`
3. Configura la base de datos y el entorno si es necesario.
4. Ejecuta el servidor: `npm start`