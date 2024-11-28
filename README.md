# Frontend EstraMyPyme

## Descripción

El proyecto desarrolla una plataforma web para que individuos y empresas realicen pruebas diagnósticas basadas en el libro *"EstraMyPyme"* de la Universidad EAFIT. Entre sus funcionalidades principales se encuentran el registro de usuarios, inicio de sesión con credenciales, pruebas diagnósticas, formularios para clasificar y obtener información de la empresa, así como un panel de administración para visualizar resultados y gráficas. Esto facilita el proceso tanto para los clientes (empresas) como para los administradores e internos de la universidad.

### Funcionalidades del Sistema
- Registrar empresas y almacenar la información suministrada por estas.
- Iniciar sesión con credenciales tanto como empresa como administrador.
- Autenticar y verificar datos desde el registro hasta el acceso a la plataforma.
- Visualizar información de las empresas registradas y sus pruebas mediante gráficas.
- Proporcionar información sobre la metodología a través de una landing page.
- Realizar pruebas diagnósticas.

---

## Tecnologías Utilizadas

![HTML](https://img.shields.io/badge/HTML-5-orange?style=for-the-badge&logo=html5)  
![CSS](https://img.shields.io/badge/CSS-3-blue?style=for-the-badge&logo=css3)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.6-38B2AC?style=for-the-badge&logo=tailwind-css)  
![Angular](https://img.shields.io/badge/Angular-18-red?style=for-the-badge&logo=angular)  
![JSON Server](https://img.shields.io/badge/JSON_Server-latest-green?style=for-the-badge&logo=json)  
![npm](https://img.shields.io/badge/npm-v10.8.0-red?style=for-the-badge&logo=npm)  

---

## Instalación y Configuración

### 1. Clonar el Repositorio
Ejecuta el siguiente comando para clonar el proyecto en tu entorno local:

```bash
git clone https://github.com/Dev4lphaS-Estramypyme/FrontEnd-EstraMyPyme.git
2. Instalar Dependencias
Dirígete a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

bash
Copiar código
npm install
3. Conectar al Backend
Para que la página funcione correctamente, es necesario tener configurado y ejecutándose el backend del proyecto. Sigue estos pasos para conectar el frontend con el backend:

Clona el repositorio del backend:

bash
Copiar código
git clone https://github.com/Dev4lphaS-Estramypyme/BackEnd-EstraMyPyme.git
Configura la base de datos y las credenciales en el archivo application.properties según las instrucciones del backend.

Ejecuta el servidor backend con el siguiente comando:

bash
Copiar código
mvn spring-boot:run
Si utilizas Visual Studio Code, también puedes instalar la extensión Code Runner y ejecutar el proyecto seleccionando la opción Run Code en el archivo principal.

Asegúrate de que el backend esté corriendo en http://localhost:8080 o la URL que configures, para que el frontend pueda consumir los endpoints.

4. Ejecutar el Proyecto Frontend
Inicia el servidor del frontend con el siguiente comando:

bash
Copiar código
ng serve
Accede al proyecto en tu navegador en la dirección: http://localhost:4200.

Contacto
Si tienes preguntas, comentarios o sugerencias sobre este proyecto, no dudes en ponerte en contacto con nosotros.

