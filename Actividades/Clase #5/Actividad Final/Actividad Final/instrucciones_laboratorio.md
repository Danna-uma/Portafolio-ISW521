# 🏛️ Guía de Laboratorio — ISW-521 Programación en Ambiente Web I
## Universidad Técnica Nacional · Sede San Carlos
**Docente:** Prof. Bryan Miguel Chaves Salas  
**Laboratorio N.°:** HTML5 Avanzado — Auditoría y Refactorización de Código  
**Modalidad:** Individual / Parejas (según indicación del docente)  
**Tiempo estimado:** 3 horas

---

## 📋 Descripción del Escenario

Tu empresa de desarrollo acaba de recibir una llamada de emergencia. Un cliente universitario necesita urgentemente lanzar la **Landing Page oficial del Congreso Universitario de Tecnología y Sostenibilidad**, pero el programador Junior que se asignó al proyecto usó IA de forma ingenua para generar el código y el resultado es técnicamente desastroso.

**Han sido contratados como Tech Leads.** Su misión es triple:

1. **Auditar** el código recibido y documentar todos sus problemas técnicos.
2. **Construir un prompt técnico** que obligue a una IA a refactorizar ese código correctamente.
3. **Revisar y validar** manualmente que el resultado cumple los estándares HTML5 modernos.

El archivo del código deficiente se llama **`v1_base_generado_ia.html`**. Ábralo en su editor de código y en el navegador antes de comenzar.

---

## 🔴 FASE 1 — Auditoría Técnica del Código

### Objetivo
Identificar, clasificar y documentar todos los problemas técnicos del archivo `v1_base_generado_ia.html`, redactando un **Reporte Técnico de Auditoría**.

### Instrucciones detalladas

**1.1 — Análisis del problema "Div-Soup"**

Abra el archivo en su editor (VS Code recomendado). Observe la estructura general y responda en su reporte:

- ¿Qué etiquetas HTML5 semánticas están **completamente ausentes**? Haga una lista exhaustiva. Considere: `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`, `<aside>`.
- ¿Por qué el uso excesivo de `<div>` es un problema para los **motores de búsqueda (SEO)**? ¿Y para los **lectores de pantalla (accesibilidad)**?
- Explique con sus propias palabras qué es el "Div-Soup" y cuál es su impacto real en un proyecto profesional.

**1.2 — Análisis del Formulario**

Localice la sección del formulario de registro y responda:

- ¿Se usan etiquetas `<label>` correctamente vinculadas a sus campos mediante los atributos `for` e `id`? Explique el impacto de su ausencia.
- ¿Qué elemento semántico debería agrupar los datos personales y cuál debería agrupar las preferencias del congreso? ¿Qué etiqueta describe el propósito de cada grupo?
- El campo "Carrera o Departamento" utiliza un `<select>`. ¿Por qué un `<datalist>` sería técnicamente superior para este caso? Explique la diferencia funcional entre ambos elementos.

**1.3 — Análisis de la Tabla de Horarios**

Examine la tabla del horario y responda:

- ¿Cuáles secciones estructurales de la tabla están ausentes? ¿Por qué `<thead>`, `<tbody>` y `<tfoot>` no son meramente estéticos?
- Los encabezados `<th>` no tienen atributo `scope`. ¿Qué valor debería tener cada uno (`col`, `row`, `colgroup`)? ¿Qué tecnología asistiva se ve afectada directamente?
- ¿Hay un elemento `<caption>` presente? ¿Para qué sirve y por qué es importante desde el punto de vista de accesibilidad (WCAG 2.1)?

**1.4 — Análisis del Elemento Video**

Revise la etiqueta `<video>` y responda:

- ¿Qué atributo fundamental falta para que el video muestre una imagen previa antes de que el usuario lo reproduzca? ¿Cómo impacta esto en la **Cumulative Layout Shift (CLS)** de las métricas Core Web Vitals?
- ¿Por qué es problemático tener un solo `<source>`? ¿Qué formatos alternativos debería incluir para garantizar **compatibilidad cruzada entre navegadores**?
- ¿Qué atributo debe agregarse para que el usuario pueda controlar la reproducción? ¿Cuál es la implicación de accesibilidad de su ausencia?

**1.5 — Análisis del iFrame del Mapa**

Examine el `<iframe>` de Google Maps y responda:

- ¿Qué atributo de rendimiento falta y que haría que el mapa **no cargue hasta que el usuario se desplace** hacia él? ¿Cuál es su valor correcto?
- ¿Qué atributo de seguridad falta que permite al contenido embebido ejecutar scripts con los mismos permisos que la página padre? Nombre el atributo y al menos **tres restricciones** que debería activar.
- ¿Falta el atributo `title` en el iframe? ¿Para qué lo necesitan los lectores de pantalla?

**1.6 — Análisis del Anidamiento Incorrecto**

Busque en el código los errores de modelo de contenido HTML5 y responda:

- Identifique todas las instancias donde un **elemento de bloque** está anidado dentro de un **elemento de línea**. Cite las líneas exactas del código.
- Explique por qué el navegador intenta "corregir" este error automáticamente y cómo ese proceso puede **romper el layout** de maneras impredecibles.
- ¿Cómo puede verificar este tipo de error usando las **DevTools del navegador**? Describa el procedimiento.

---

### 📄 Entregable de la Fase 1
Redacte un **Reporte Técnico de Auditoría** en formato Markdown o PDF con secciones claramente numeradas que respondan todos los puntos anteriores. El reporte debe incluir fragmentos del código original que evidencien cada problema identificado.

---

## 🟡 FASE 2 — Ingeniería de Prompts para Refactorización

### Objetivo
Construir un **prompt técnico de alta precisión** que, al ser enviado a una IA (ChatGPT, Claude, Gemini, etc.), produzca una refactorización completa y correcta del código HTML5.

### ¿Por qué esta fase importa?

Un prompt genérico como `"Arregla este HTML"` producirá un resultado mediocre. La **ingeniería de prompts** es una habilidad técnica que los desarrolladores modernos deben dominar. Un prompt bien construido es como un pliego de especificaciones técnicas: define el problema, las restricciones, los criterios de éxito y el formato del resultado.

### Instrucciones para construir el prompt

Su prompt DEBE incluir las siguientes secciones claramente diferenciadas:

**Sección A — Rol y Contexto**  
Asigne a la IA el rol de un especialista técnico específico. No use "actúa como un programador". Sea más preciso: ej. *"Actúa como un Desarrollador Frontend Senior certificado en estándares W3C con 10 años de experiencia en accesibilidad web WCAG 2.1"*.

**Sección B — Descripción del Problema**  
Explique en términos técnicos qué recibe la IA (el código deficiente) y cuál es el problema principal (Div-Soup, formulario sin estructura, etc.).

**Sección C — Restricciones Técnicas Explícitas (mínimo 8)**  
Liste en viñetas las reglas que la IA DEBE cumplir. Ejemplos del nivel de especificidad requerido:
- "DEBES reemplazar todos los `<div>` estructurales por las etiquetas semánticas HTML5 correctas (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`)."
- "DEBES agrupar los campos del formulario usando `<fieldset>` y `<legend>`, creando al menos dos grupos lógicos distintos."
- "DEBES cambiar el `<select>` de Carrera por un `<input>` vinculado a un `<datalist>` con las mismas opciones."
- "DEBES añadir al `<video>`: atributo `poster` con ruta de imagen, atributo `controls`, y al menos dos `<source>` con tipos `video/mp4` y `video/webm`."
- "DEBES añadir al `<iframe>`: `loading='lazy'`, `sandbox='allow-scripts allow-same-origin'` y un atributo `title` descriptivo."
- "DEBES corregir todo anidamiento de elementos de bloque dentro de elementos de línea."

**Sección D — Criterios de Validación**  
Indique a la IA cómo verificar su propio trabajo antes de entregar el resultado. Ej: *"Antes de responder, verifica que: (1) no existe ningún `<div>` donde corresponde una etiqueta semántica, (2) todos los `<label>` tienen atributos `for` coincidentes con el `id` de su campo, (3) la tabla tiene `<thead>`, `<tbody>` y todos los `<th>` tienen `scope`."*

**Sección E — Formato del Resultado**  
Especifique exactamente cómo quiere que la IA entregue el resultado (solo el bloque de código, con o sin explicaciones, etc.).

---

### 📄 Entregable de la Fase 2
Entregue el **texto completo del prompt** que construyó, en un archivo de texto o Markdown. Seguidamente entregue el **código HTML resultante** que la IA generó con ese prompt. Si el resultado no fue satisfactorio en el primer intento, documente las iteraciones y correcciones que realizó al prompt.

---

## 🟢 FASE 3 — Revisión Final del DOM

### Objetivo
Verificar manualmente que la versión refactorizada no contiene errores residuales, especialmente el anidamiento incorrecto que la IA pudo haber omitido.

### Instrucciones paso a paso

**3.1 — Validación con el Validador W3C**

1. Abra [https://validator.w3.org/#validate_by_input](https://validator.w3.org/#validate_by_input) en su navegador.
2. Pegue el código HTML refactorizado generado por la IA.
3. Haga clic en **"Check"**.
4. Capture una pantalla del resultado.
5. Si hay errores: corrija cada uno, explique qué era, y vuelva a validar hasta obtener resultado limpio.

**3.2 — Inspección del DOM con DevTools**

1. Abra el archivo refactorizado en **Google Chrome** o **Microsoft Edge**.
2. Presione `F12` para abrir las DevTools.
3. Vaya a la pestaña **"Elements"**.
4. Revise la estructura del árbol del DOM y confirme:
   - ¿El `<header>`, `<nav>`, `<main>` y `<footer>` están presentes como hijos directos del `<body>`?
   - ¿Los `<section>` y `<article>` contienen únicamente elementos de bloque?
   - ¿No hay ningún `<div>` o `<p>` que sea hijo directo de un `<span>` o `<a>`?
5. Use la herramienta de accesibilidad: en DevTools → pestaña **"Accessibility"** → revise el árbol de accesibilidad (Accessibility Tree) y confirme que los roles semánticos aparecen correctamente.

**3.3 — Prueba con Lector de Pantalla (Opcional con valor extra)**

Si tiene acceso a un lector de pantalla (NVDA en Windows, VoiceOver en macOS/iOS, TalkBack en Android), navegue por la página refactorizada y documente cómo anuncia la estructura de la página comparado con el documento original.

**3.4 — Checklist de Verificación Final**

Antes de entregar, confirme cada item de esta lista:

- [ ] La página usa `<header>`, `<nav>`, `<main>`, `<footer>` en lugar de `<div>` estructural
- [ ] El contenido principal se divide en `<section>` o `<article>` con semántica apropiada
- [ ] El formulario tiene al menos dos grupos `<fieldset>` con `<legend>` descriptivos
- [ ] Todos los `<label>` usan `for` vinculado al `id` de su campo correspondiente
- [ ] El campo de carrera usa `<input list="...">` + `<datalist>` (NO un `<select>`)
- [ ] El `<video>` tiene: `poster`, `controls`, y mínimo dos `<source>` con distintos `type`
- [ ] El `<iframe>` tiene: `loading="lazy"`, `sandbox` con valores apropiados, y `title`
- [ ] NO hay elementos de bloque (`<div>`, `<p>`, `<h1>`-`<h6>`) dentro de `<span>` o `<a>`
- [ ] La tabla tiene `<caption>`, `<thead>`, `<tbody>` y los `<th>` tienen atributo `scope`
- [ ] La validación W3C no reporta errores (solo advertencias menores son aceptables)

---

### 📄 Entregable de la Fase 3
- Captura de pantalla del resultado del Validador W3C (debe estar limpio o con explicación de advertencias restantes).
- El archivo **`v2_refactorizado_final.html`** con el código corregido y validado.
- Un párrafo de reflexión (mínimo 100 palabras) comparando la experiencia de codificar con IA vs. revisar el output de IA críticamente.

---

## 📦 Resumen de Entregables

| # | Entregable | Formato |
|---|------------|---------|
| 1 | Reporte Técnico de Auditoría | `.md` o `.pdf` |
| 2 | Prompt técnico de refactorización | `.txt` o `.md` |
| 3 | Código HTML generado por la IA (sin modificar) | `.html` |
| 4 | Archivo `v2_refactorizado_final.html` validado | `.html` |
| 5 | Captura de pantalla del Validador W3C | `.png` o `.jpg` |
| 6 | Párrafo de reflexión final | Incluido en el reporte |

Todos los archivos deben entregarse comprimidos en un `.zip` con la nomenclatura:  
**`LAB_HTML5_[APELLIDO]_[NOMBRE].zip`**

---

## 📌 Notas y Criterios de Evaluación

- El trabajo se evalúa con una **rúbrica de 100 puntos** disponible en el documento `rubrica_evaluacion.md`.
- El código entregado debe ser **trabajo propio de ingeniería de prompts**; simplemente pegar el código inicial y pedir "arréglalo" sin criterios técnicos obtendrá puntaje mínimo en la Fase 2.
- Se valorará la **profundidad del análisis** en el reporte de auditoría; respuestas superficiales serán penalizadas.
- La validación W3C es **obligatoria**. No se aceptará código con errores de sintaxis HTML.

---

*ISW-521 Programación en Ambiente Web I · UTN Sede San Carlos · Prof. Bryan Miguel Chaves Salas*
