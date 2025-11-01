# Configuración para Android TV

Esta aplicación está optimizada para Android TV con dimensiones fijas garantizadas (1920x1080).

## Dimensiones Garantizadas

La aplicación mantiene dimensiones consistentes en todas las pantallas de Android TV:

- **Resolución fija**: 1920x1080 píxeles
- **Viewport fijo**: No se ajusta al tamaño de la pantalla
- **Sin scroll**: Diseño optimizado para una sola pantalla
- **Imágenes con dimensiones explícitas**: Previene layout shift al cargar

## Despliegue en Android TV

### Paso 1: Transferir a GitHub
1. Haz clic en el botón "Export to Github" en Lovable
2. Clona tu repositorio en tu máquina local

### Paso 2: Instalar Dependencias
```bash
npm install
```

### Paso 3: Agregar Plataforma Android
```bash
npx cap add android
```

### Paso 4: Actualizar Dependencias Nativas
```bash
npx cap update android
```

### Paso 5: Construir el Proyecto
```bash
npm run build
```

### Paso 6: Sincronizar con Android
```bash
npx cap sync
```

### Paso 7: Abrir en Android Studio
```bash
npx cap open android
```

### Paso 8: Configurar para Android TV en Android Studio

1. Abre `AndroidManifest.xml`
2. Agrega dentro de la etiqueta `<application>`:

```xml
<uses-feature
    android:name="android.software.leanback"
    android:required="true" />

<uses-feature
    android:name="android.hardware.touchscreen"
    android:required="false" />
```

3. Agrega a la actividad principal un intent filter para leanback:

```xml
<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
</intent-filter>
```

### Paso 9: Ejecutar en Android TV
```bash
npx cap run android
```

## Características Específicas de TV

- **Navegación con teclado**: Usa las flechas ← → para navegar y Enter para seleccionar
- **Pantalla completa**: La app ocupa toda la pantalla sin barras de navegación
- **Sin zoom**: El contenido mantiene su tamaño fijo
- **Optimizado para 10 pies**: Textos y elementos grandes para visualización a distancia

## Soporte de Resoluciones

La aplicación está optimizada para:
- ✅ 1920x1080 (Full HD) - Resolución principal
- ✅ Escalado automático para 4K TVs
- ✅ Compatible con Android TV 5.0+

## Troubleshooting

Si los elementos se mueven al cargar:
- Verifica que todas las imágenes tengan atributos `width` y `height`
- Asegúrate de que `index.css` tenga las reglas de dimensiones fijas
- Confirma que el viewport en `index.html` esté configurado correctamente

## Recursos Adicionales

- [Documentación de Capacitor](https://capacitorjs.com/docs)
- [Guía de Android TV](https://developer.android.com/training/tv)
- [Blog de Lovable sobre Apps Nativas](https://lovable.dev/blog)
