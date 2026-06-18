---
title: "Sobreyectividad y seguridad"
subtitle: "algunos LLMs son demostrablemente inseguros"
date: 2026-06-16
showDate: false
summary: "Algunos LLMs son demostrablemente inseguros"
draft: false
showReadingTime: false
tags: [transformers, security, surjectivity, guardrails, alignment]
math:  true
---


{{< katex >}}



## Introducción

Sí, seguimos con Borges, autor citado recurrentemente no solo en estas notas sino en la basta producción científica. 

En el célebre cuento La biblioteca de Babel, Jorge Luis Borges imaginó un vasto universo compuesto por galerías hexagonales que contienen todos los libros posibles. Si entendemos esta biblioteca como una función matemática $f$ (el sistema generativo), donde la entrada $x$ representa el intrincado trayecto por sus pasillos (el prompt o instrucción) y la salida $y$ es el tomo exacto que extraemos de un anaquel (el texto resultante), se revela una propiedad matemática ineludible y perturbadora. El diseño del universo borgiano garantiza que, para cualquier texto concebible $y$, sin importar que contenga mentiras convincentes, incoherencias o instrucciones letales, existe obligatoriamente unas instrucciones de entrada $x$, que definen un camino para llegar a dicho texto $y$, es decir, $f(x) = y$. En esta estructura monumental, la búsqueda de sentido se confunde con el caos absoluto, porque la biblioteca no es capaz de censurar o hacer imposible ningún libro; sencillamente oculta la ruta hacia él.

La arquitectura de los Modelos de Lenguaje Grandes (LLMs) modernos, basados en la topología Transformer, comparte esta inquietante similitud matemática con la visión de Borges. Durante años, la industria de la Inteligencia Artificial ha intentado "clausurar" los pasillos oscuros de esta biblioteca mediante técnicas de alineación interna como el aprendizaje por refuerzo a partir de retroalimentación humana (RLHF) o el ajuste fino de instrucciones (system prompts). El objetivo era enseñar al modelo a comportarse éticamente, asumiendo que sus pesos internos podrían reconfigurarse para hacer imposible la generación de contenido malicioso.

Sin embargo, investigaciones recientes en la teoría de redes neuronales, destacando el trabajo de Jiang y Haghtalab: **On Surjectivity of Neural Networks: Can you elicit any behavior from your model?** (2024), demuestran una realidad topológica ineludible: para las configuraciones estándar de Transformers, el modelo es matemáticamente sobreyectivo.

Esta propiedad destroza la ilusión de la seguridad por diseño interno. La sobreyectividad implica que el modelo es capaz de producir absolutamente cualquier comportamiento o salida que resida en su espacio funcional. No importa cuánta censura se intente inculcar en sus parámetros durante el entrenamiento; el camino hacia el texto prohibido no desaparece, simplemente se oculta. Siempre existirá un prompt capaz de evocar la respuesta más indeseada. Por lo tanto, confiar la seguridad a la "buena conducta" del modelo es una falacia arquitectónica: la protección real solo puede construirse desde fuera, mediante capas de seguridad perimetrales (guardrails).

## Formalización del problema


Para comprender la magnitud de este problema, debemos formalizar el comportamiento del Transformer como una aplicación entre espacios.

Sea $X$ el espacio de todas las secuencias de entrada posibles (los prompts) e $Y$ el espacio continuo de representaciones de salida (del cual se decodifica el texto final). Una función $f: X \to Y$ se dice sobreyectiva si y solo si la imagen de la función abarca la totalidad del codominio. Es decir:

$$\forall y \in Y, \exists x \in X : f(x) = y$$


El trabajo de Jiang y Haghtalab demuestra que las arquitecturas Transformer tradicionales, particularmente aquellas que emplean la configuración Pre-LayerNorm (donde la normalización se aplica antes de los bloques de Atención y Perceptrón Multicapa), operan como funciones sobreyectivas en el dominio continuo.

Esto significa que no hay "puntos ciegos" en el espacio de salida del modelo. Si definimos un subconjunto $\widetilde{Y}\subset Y$ que contiene instrucciones para fabricar armas, código malware o contenido tóxico, la sobreyectividad garantiza que este subconjunto está en la imagen de la función. Consecuentemente, debe existir inexorablemente un conjunto de entradas $\widetilde{X}\subset X$ tal que $f(\widetilde{X}) = \widetilde{Y}$.


Bajo la luz de esta propiedad matemática, la vulnerabilidad inherente a los jailbreaks (hackeos de instrucciones) deja de ser un fallo de ingeniería para convertirse en una certeza teórica.



Cuando aplicamos RLHF, lo que hacemos formalmente es perturbar los parámetros $\theta$ que selecciona una función $f$ de entre una familia,  para modificar la distribución de probabilidad condicional $P(\mathtt{Y}=y|\mathtt{X}=x)$. Alteramos el "relieve" del espacio para que los caminos hacia $\widetilde{Y}$ sean poco probables frente a entradas estocásticas o cotidianas.

No obstante, cambiar la probabilidad no altera la sobreyectividad fundamental de la arquitectura. El laberinto sigue intacto. Un atacante provisto de técnicas de optimización adversaria automatizada (como el ataque Greedy Coordinate Gradient - GCG) no explora el modelo probabilísticamente, sino que desciende por el gradiente buscando de manera determinista la combinación exacta de tokens que fuerza el paso hacia la zona prohibida. Al existir garantizadamente un $x$ para cada $y$, el optimizador adversario, con suficiente tiempo y cómputo, terminará por encontrarlo. El modelo no puede negarse a responder; su propia matemática lo obliga a obedecer.

## Recomendaciones de seguridad

Asumir que el Transformer es inherentemente vulnerable desde su núcleo exige un cambio de mentalidad en el diseño de sistemas basados en LLMs. Si el motor no puede evitar producir toxicidad por sí solo, debemos encapsularlo en un sistema de tuberías deterministas. Propongo una arquitectura de defensa en profundidad basada en Guardrails:


### Filtros de entrada

Interceptación perimetral: Implementar modelos clasificadores ligeros y deterministas antes del LLM principal. Toda $x \in X$ debe pasar por una función de validación $V(x)$ que devuelva un valor booleano. Si se detectan firmas de ataques adversarios (cadenas de caracteres sin sentido aparente producto de GCG) o intenciones maliciosas, la petición se bloquea y nunca llega al espacio latente del Transformer.

Saneamiento del contexto: Eliminación estricta de variables inyectadas por usuarios en entornos donde el LLM procesa documentos de terceros, evitando el Prompt Injection indirecto.

### Filtros de salida

Cuarentena de respuestas: Dado que la entrada puede sortear el filtro inicial, la salida $y$ jamás debe fluir directamente al usuario o al entorno de ejecución. Debe atravesar un escáner de salida $S(y)$ independiente.

Aserciones estructurales: Validación rigurosa de formatos (JSON, código) y filtrado de Expresiones Regulares para evitar fuga de Información Personal Identificable (PII) o violaciones explícitas de políticas corporativas.

### Separación de entornos

Principio de Mínimos Privilegios: Si el Transformer actúa como un agente (Agentic AI) con acceso a herramientas (APIs, ejecución de código), se debe asumir que eventualmente generará llamadas maliciosas. Todo código generado debe ejecutarse en sandboxes aislados y efímeros, sin acceso a red ni a los sistemas centrales.

## Conclusiones

La sobreyectividad demostrada en las redes neuronales modernas desmitifica la idea del LLM como un ente que puede ser "domesticado" únicamente mediante entrenamiento moral o alineación. En su estado más puro, un Transformer es un motor de mapeo universal; forzarlo a "no saber" o "no poder" generar ciertas secuencias va en contra de la geometría de sus propias capas.

Volviendo a Borges, pretender que la Biblioteca omita los libros prohibidos reorganizando sus anaqueles es inútil, pues el espacio arquitectónico los contiene naturalmente. Una solución viable para la inteligencia artificial generativa es aceptar la inmensidad incontrolable del modelo y construir puertas robustas, externas e independientes. El Transformer siempre podrá dar en su salida todo lo que esté permitido en el conjunto $Y$; es responsabilidad de los sistemas periféricos asegurarse de controlar y/o restringir el contenido generado.

### Referencias

* Borges, J. L. (1941). "La biblioteca de Babel", El jardín de senderos que se bifurcan.

* Jiang, H., & Haghtalab, N. (2024). "On Surjectivity of Neural Networks: Can you elicit any behavior from your model?". $\mathtt{arXiv:2508.19445}$.

* Zou, A., et al. (2023). "Universal and Transferable Adversarial Attacks on Aligned Language Models". $\mathtt{arXiv:2307.15043}$.

* Ouyang, L., et al. (2022). "Training language models to follow instructions with human feedback". NeurIPS.

