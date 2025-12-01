# Configuración de EmailJS para Envío de Reportes

Este proyecto utiliza [EmailJS](https://www.emailjs.com/) para enviar reportes de anomalías por correo electrónico.

## Pasos para Configurar EmailJS

### 1. Crear una Cuenta en EmailJS
- Visita [https://www.emailjs.com/](https://www.emailjs.com/)
- Regístrate gratuitamente (incluye 200 correos/mes)

### 2. Configurar un Servicio de Correo Email
1. Ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona tu proveedor de correo (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. Copia el **Service ID** generado

### 3. Crear una Plantilla de Correo
1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Usa la siguiente configuración:

**Template Name:** `anomaly_report_template`

**Subject:** `Reporte de Anomalía {{anomaly_id}} - IMDADIC`

**Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #003876 0%, #0066CC 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>IGAC - Instituto Geográfico Agustín Codazzi</h1>
        <p>Sistema de Monitoreo de Dinámica Inmobiliaria</p>
    </div>
    
    <div class="content">
        <h2>Reporte de Anomalía: {{anomaly_id}}</h2>
        <p>Estimado usuario,</p>
        <p>Adjunto encontrarás el reporte detallado de la anomalía <strong>{{anomaly_id}}</strong> detectada por el sistema IMDADIC.</p>
        <p>El documento PDF contiene toda la información relevante sobre esta anomalía inmobiliaria.</p>
        <p><strong>Nota:</strong> Este es un reporte automatizado generado por el sistema de monitoreo.</p>
    </div>
    
    <div class="footer">
        <p>IMDADIC - Inteligencia para el Monitoreo y Detección Avanzada de Dinámicas Inmobiliarias en Colombia</p>
        <p>© 2024 IGAC. Todos los derechos reservados.</p>
    </div>
</body>
</html>
```

**IMPORTANTE:** Para adjuntar el PDF, agrega este campo en la plantilla:
- Ve a la sección de **Attachments**
- Agrega un attachment con:
  - Name: `{{pdf_name}}`
  - Content: `{{pdf_content}}`
  - Encoding: `base64`

4. Guarda la plantilla y copia el **Template ID**

### 4. Obtener la Clave Pública (Public Key)
1. Ve a **Account** → **General**
2. Encuentra tu **Public Key**
3. Cópiala

### 5. Configurar las Credenciales en el Código

Edita el archivo `src/app/anomaly/[id]/page.tsx` y reemplaza estos valores:

```typescript
// Configuración de EmailJS (línea ~86)
const serviceId = 'YOUR_SERVICE_ID';      // Reemplazar con tu Service ID
const templateId = 'YOUR_TEMPLATE_ID';    // Reemplazar con tu Template ID  
const publicKey = 'YOUR_PUBLIC_KEY';      // Reemplazar con tu Public Key
```

### 6. Variables de Entorno (Recomendado)

Para mayor seguridad, crea un archivo `.env.local` en la raíz de `frontend/`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```

Luego actualiza el código para usar variables de entorno:

```typescript
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
```

## Uso

Una vez configurado, el usuario puede:
1. Ir a la página de detalle de una anomalía
2. Hacer clic en **"Enviar por Correo"**
3. Ingresar el correo electrónico del destinatario
4. El sistema generará el PDF y lo enviará automáticamente

## Límites del Plan Gratuito

- **200 correos/mes** en el plan gratuito
- Para más correos, considera actualizar a un plan de pago
- Alternativas: SendGrid, AWS SES, Mailgun

## Solución de Problemas

### Error: "Service ID not found"
- Verifica que el Service ID esté correcto
- Asegúrate de haber conectado un servicio de correo

### Error: "Template ID not found"  
- Verifica que el Template ID esté correcto
- Asegúrate de haber guardado la plantilla

### El correo no llega
- Revisa la carpeta de spam
- Verifica que el correo del destinatario sea válido
- Revisa los logs de EmailJS en el dashboard

### PDF no se adjunta
- Asegúrate de haber configurado el attachment en la plantilla
- Verifica que el encoding sea `base64`
- Los PDFs muy grandes pueden fallar (límite ~10MB)

## Alternativas

Si prefieres no usar EmailJS, puedes:
1. Implementar un endpoint en el backend con Nodemailer
2. Usar AWS SES directamente
3. Integrar con SendGrid API
4. Usar `mailto:` para abrir el cliente de correo del usuario (sin PDF adjunto)
