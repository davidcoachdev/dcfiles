# Design Theme: Email Design

Patrones de diseño para emails transaccionales y marketing.

## Profile

- **Vibe**: Funcional, compatible, responsivo
- **Uso**: Email templates, newsletters, transactional emails
- **Inspiración**: Litmus, Email on Acid, MJML

## ⚠️ Email CSS Constraints

Los clients de email NO soportan CSS moderno. Reglas de oro:

- **No flexbox/grid** (usa tables)
- **No CSS custom properties**
- **No media queries** (casi ningún cliente)
- **No background-images** (algunos sí, otros no)
- **No web fonts** (usa system fonts)
- **No JavaScript**
- **Inline styles** obligatorios

## Baseline Template

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
    <!-- Header -->
    <tr>
      <td style="padding: 40px 20px; background: #ffffff;">
        <img src="logo.png" alt="Logo" style="display: block; max-width: 150px;">
      </td>
    </tr>
    <!-- Content -->
    <tr>
      <td style="padding: 40px 20px; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h1 style="font-size: 24px; color: #1a1a1a; margin: 0 0 16px 0;">Hello!</h1>
        <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin: 0 0 24px 0;">
          This is your email content.
        </p>
        <!-- Button (bulletproof) -->
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="background: #2563eb; border-radius: 8px; text-align: center;">
              <a href="https://..." style="display: inline-block; padding: 14px 32px; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: 600;">Action Button</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding: 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: #9e9e9e;">
        <p style="margin: 0 0 8px 0;">Company Name · Address Line</p>
        <p style="margin: 0;">
          <a href="{{unsubscribe_url}}" style="color: #9e9e9e; text-decoration: underline;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
```

## Bulletproof Buttons

```html
<!-- Funciona en Outlook, Gmail, Apple Mail -->
<table cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="background: #2563eb; border-radius: 8px;">
      <a href="https://..." target="_blank"
         style="display: inline-block; padding: 14px 32px;
                font-family: -apple-system, sans-serif;
                font-size: 16px; font-weight: 600;
                color: #ffffff; text-decoration: none;
                mso-hide: all;">
        Get started
      </a>
    </td>
  </tr>
</table>
```

## Responsive (Media Queries Limitadas)

```html
<style>
  @media only screen and (max-width: 600px) {
    .mobile-full { width: 100% !important; display: block !important; }
    .mobile-padding { padding: 20px !important; }
    .mobile-hide { display: none !important; }
    .mobile-center { text-align: center !important; }
    .mobile-stack td { display: block !important; width: 100% !important; }
  }
</style>
```

## Dos & Don'ts

| Do | Don't |
|----|-------|
| Testear en Litmus/Email on Acid | Asumir que se ve como en browser |
| Usar inline styles | Depender de `<style>` tags |
| Bulletproof buttons con VML | Botones con imágenes |
| max-width 600px | Diseños más anchos |
| Dark mode con meta tag | Ignorar dark mode |
| Alt text en imágenes | Imágenes sin texto alternativo |
| Plain text version | Solo HTML |
