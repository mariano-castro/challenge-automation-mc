# Proyecto de Pruebas Automatizadas

## Instalación
1. Clonar el repositorio con:
    git clone https://github.com/mariano-castro/challenge-automation-mc.git
2. Instalar dependencias:
   npm install

### Ejecución
1. Asegúrate de que `Datos-pruebas.xlsx` esté en la raíz del proyecto.
2. Ejecuta las pruebas con:
   npx playwright test
   ### Con reporte
   npx playwright test --reporter=html

### Abrir Reportes
npx playwright show-report