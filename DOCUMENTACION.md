# Documentación del sitio web

## 1. Descripción general

Este proyecto es un currículum y portafolio personal de José Israel Olvera Bucio. Presenta información académica, experiencia, logros, habilidades y proyectos en una página web de una sola página.

El sitio está implementado con HTML y estilos escritos en `styles.scss`, usando reglas CSS sencillas. La página no requiere JavaScript.

## 2. Estructura de la página

El archivo `index.html` contiene las secciones principales en este orden:

1. **Navegación:** enlaces para ir a cada sección de la página.
2. **Inicio:** nombre completo, presentación, enlaces de navegación, datos personales y fotografía.
3. **Sobre mí:** biografía, datos rápidos, valores, pasatiempos y libros.
4. **Formación académica:** estudios y cursos presentados como una línea de tiempo.
5. **Experiencia:** trabajos, responsabilidades y actividades realizadas.
6. **Logros y habilidades:** reconocimientos, resultados académicos, lenguajes y tecnologías.
7. **Portafolio:** tarjetas con proyectos y trabajos realizados.
8. **Contacto:** correo, ubicación y disponibilidad.

La página usa elementos HTML con significado claro, como `header`, `nav`, `main`, `section`, `article`, `figure` y `footer`. Los títulos (`h1`, `h2` y `h3`) organizan el contenido, y las listas (`ul` y `li`) agrupan habilidades y datos relacionados.

## 3. Lenguajes y herramientas

La sección de habilidades muestra las tecnologías y cursos indicados para el perfil:

- Java y JavaFX.
- C++ para programación competitiva.
- HTML y SCSS.
- React, curso tomado.
- Django para perfeccionistas, curso tomado.
- SQL y PostgreSQL.

El proyecto usa `index.html` para el contenido y `styles.scss` para los estilos. `styles.css` es la hoja que carga el navegador. No hay un archivo JavaScript asociado al sitio.

## 4. Diseño visual

El diseño usa un fondo oscuro, tarjetas en tonos azul grisáceo, texto claro y detalles dorados. Los títulos usan una tipografía serif y los textos una tipografía sans serif. Las tarjetas tienen bordes discretos y espacio interior para separar su contenido.

La portada se organiza en dos columnas en pantallas anchas: presentación a la izquierda y fotografía a la derecha. La fotografía está en `retrato.jpeg`, que mide 959 × 1280 píxeles. Su marco mantiene una proporción 4:5, tiene un ancho máximo de 425 píxeles y recorta la imagen con `object-fit: cover`.

## 5. Adaptación a pantallas pequeñas

Los estilos incluyen reglas `@media` para reorganizar el contenido cuando la pantalla es estrecha:

- La navegación puede ocupar varias líneas.
- La portada y las secciones con columnas pasan a una sola columna.
- Las tarjetas de logros, habilidades y proyectos se apilan.
- Se reducen el tamaño de los títulos y el espacio vertical para ajustarse al móvil.

## 6. Archivos principales

- `index.html`: texto, secciones, enlaces e imagen de la página.
- `styles.scss`: estilos sencillos del sitio y reglas de adaptación a móvil.
- `styles.css`: estilos que utiliza directamente el navegador.
- `retrato.jpeg`: fotografía del perfil.
- `script.js`: se eliminó para que el sitio no dependa de JavaScript.

## 7. Rama de trabajo

Los cambios se realizaron en la rama local `developer`, creada a partir de `main`. Los cambios actuales todavía no están guardados en un commit.

## 8. Fuente de información

El enlace de NotebookLM proporcionado redirige al acceso de una cuenta de Google. Por ese motivo, no fue posible consultar el PDF del cuaderno y esta documentación describe únicamente el sitio y los cambios hechos en el proyecto. Para incorporar definiciones o requisitos específicos del PDF, hace falta compartir el archivo o un enlace que permita leerlo sin iniciar sesión.
