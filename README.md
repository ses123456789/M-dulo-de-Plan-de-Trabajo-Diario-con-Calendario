# Plan de trabajo diario con calendario
Aplicación web creada con **Django + FullCalendar.js** para gestionar las visitas diarias mediante una interfaz de calendario interactiva.

El sistema permite crear, editar, eliminar y visualizar las visitas con una clara diferenciación visual por **type** y **status**.
## Instrucciones de ejecución
1. Clonar el repositorio.
2. Crear y activar entorno virtual.  
 Desde el bash dentro de la carpeta del proyecto usar el siguiente comando el cual crea el entrono virtual con python 3.11: python -m venv venv  
  Seguidamente se debe activar el entrono virtual con el siguiente comando:  
windows: venv\Scripts\activate  
  Linux/ MacOS: source venv/bin/activate
Si se activo correctamente el entrono la consola debera verse así:
<img width="1086" height="36" alt="image" src="https://github.com/user-attachments/assets/534266bb-c614-4d22-b2d8-de8b5d6904fc" />

  3. Instalar dependencias.        
   Con el siguiente comando se instalaran todas las dependencias usadas en el proyecto: pip install -r requirements.txt  
 4. Aplicar migraciones  
Para ejecutar las migraciones se hace uso del siguiente comando: python manage.py migrate  
 5. Crear superadmin
Para crear el super usuario se ejecuta el comando: python manage.py createsuperuser  
 6. Levantar el servidor
El ultimo paso es levantar el servidor con el comando: python manage.py runserver  
Seguidamente el proyecto esta disponible ne la URL: http://127.0.0.1:8000/  
## 🔐 Acceso al panel de administración
° URL: http://127.0.0.1:8000/admin  
° Usuario: el creado con createsuperuser  
Desde el admin se pueden gestionar:  
°Gestores  
°Estados (Programada, Realizada, Cancelada, etc.)  
°Visitas  
## 📅 Uso del calendario

° Acceso: http://127.0.0.1:8000/work-plan/  
° Click en un día → crear visita  
° Click en una visita → editar / eliminar  
Selección de:  
  ° Título  
  ° Tipo (Médico / Institución)  
  ° Gestor  
  ° Estado  
  ° Hora inicio / fin  
  °Iconos distinguen tipo de visita  
  °Punto de color indica estado  
### 🎨 Convenciones visuales
° Tipo de visita:   
    🩺: Médico  
    🏢 : Institución  
° Estado  
° Colores configurables desde el modelo Status  
° Representados por el punto junto al evento  
# Daily work plan with calendar
Web application built with **Django + FullCalendar.js** to manage daily visits using an interactive calendar interface.

The system allows creating, editing, deleting, and visualizing visits with clear visual differentiation by **type** and **status**.

## Implementation instructions
1. Clone the repository.
2. Create and activate the virtual environment.  
 From the bash inside the project folder, use the following command, which creates the virtual environment with Python 3.11: python -m venv venv  
  Next, activate the virtual environment with the following command:  
Windows: venv\Scripts\activate  
  Linux/MacOS: source venv/bin/activate
If the environment is activated correctly, the console should look like this:
<img width="1086" height="36" alt="image" src="https://github.com/user-attachments/assets/633e245e-39e5-477a-8b1b-49bf427dc0d0" />

  3. Install dependencies.        
The following command will install all the dependencies used in the project: pip install -r requirements.txt  
 4. Apply migrations  
To execute the migrations, use the following command: python manage.py migrate  
 5. Create superadmin
To create the superuser, run the command: python manage.py createsuperuser  
 6. Start the server
The last step is to start the server with the command: python manage.py runserver  
The project is then available at the URL: http://127.0.0.1:8000/  
## 🔐 Access to the admin panel
° URL: http://127.0.0.1:8000/admin  
° Username: the one created with createsuperuser  
From the admin panel, you can manage:  
  ° Managers  
  ° Statuses (Scheduled, Completed, Cancelled, etc.)    
  ° Visits
## 📅 Using the calendar  
° Access: http://127.0.0.1:8000/work-plan/  
° Click on a day → create visit  
° Click on a visit → edit / delete  
Select:  
  ° Title  
  ° Type (Doctor / Institution)  
  ° Manager  
  ° Status  
  ° Start/end time  
° Icons distinguish visit type   
° Colored dot indicates status

### 🎨 Visual conventions
° Visit type:  
  🩺: Doctor  
  🏢 : Institution

° Status:  
  Colors configurable from the Status template  
  Represented by the dot next to the event  
## 🧱 Technologies Used | Tecnologías Usadas

### Backend
- **Python 3.11** (Lenguaje de programación / Programming language)
- **Django 4.2** (Framework web / Web framework)
- **SQLite** (Base de datos local / Local database)
- **Django ORM** (Mapeo objeto-relacional / Object-Relational Mapping)

### Frontend
- **JavaScript (ES6)** (Lenguaje de scripting / Scripting language)
- **FullCalendar.js** (Calendario interactivo / Interactive calendar library)
- **Bootstrap 5** (Framework CSS / CSS framework)
- **Bootstrap Icons** (Iconografía / Icons)
- **HTML5 & CSS3**

### Other
- **Fetch API** (Comunicación cliente-servidor / Client-server communication)
- **Virtualenv** (Entorno virtual / Virtual environment)
- **Git & GitHub** (Control de versiones / Version control)






