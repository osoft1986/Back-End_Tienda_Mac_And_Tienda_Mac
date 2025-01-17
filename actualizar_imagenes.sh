
#!/bin/bash
# Este script hace git pull, agrega las imágenes, realiza commit y hace git push

# Muestra mensaje de inicio
echo "Iniciando actualización de imágenes..."

# Hacer pull para traer los cambios remotos antes de agregar los archivos
git pull --rebase origin main

# Añadir los cambios de la carpeta ImagesProducts
git add src/ImagesProducts

# Hacer commit con un mensaje
git commit -m "Actualización de imágenes"

# Subir los cambios al repositorio remoto
git push origin main

# Mensaje de éxito
echo "Actualización completada con éxito."
