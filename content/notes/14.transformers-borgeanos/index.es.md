---
title: "Transfomers borgeanos"
subtitle: "algunos LLMs no olvidan"
date: 2026-02-02
showDate: false
summary: "Algunos LLMs no olvidan"
draft: false
showReadingTime: false
tags: [transformers, privacy, injectivity, sipit]
math:  true
-----------

{{< katex >}}

## Inyectividad y confidencialidad en modelos de lenguaje

### Introducción 

El mecanismo mediante el cual un Modelo de Lenguaje Grande (LLM) procesa un *prompt* y lo transforma en una representación interna que condiciona la salida se articula en una secuencia bien definida de operaciones: segmentación en tokens, proyección al espacio de *embeddings*, incorporación de información posicional, paso por una pila de capas que alternan entre bloques de atención multicabezal y transformaciones feedforward, acopladas mediante conexiones residuales y normalización. Esta arquitectura, introducida de manera sistemática en el trabajo fundacional de Vaswani et al. (Attention is all you need, NeurIPS 2017), constituye el núcleo de lo que hoy se conoce como Transformer.

Puede pensarse este proceso de codificación como una exploración progresiva de un espacio desconocido. El punto de partida es un texto explícito —el *prompt*— y el destino es un estado oculto cuya geometría y localización no resultan intuitivas. El trayecto no se recorre de una sola vez, sino que en cada capa, se reorganiza la información recibida a partir de reglas internas que, vistas desde fuera, parecen opacas o incluso arbitrarias. El conjunto de todos estos recorridos posibles configura una estructura laberíntica, con tantas entradas como secuencias distintas puedan formarse a partir de un vocabulario y una ventana de contexto finitos.

Durante mucho tiempo se asumió que este laberinto tenía una topología convergente. Bajo esa hipótesis, caminos distintos acabarían confluyendo en regiones comunes del espacio latente, del mismo modo que un sistema de ríos desemboca en un delta compartido. En ese tránsito, los detalles accidentales del texto de partida se perderían, mientras que su contenido semántico esencial sobreviviría. Desde esta perspectiva, los *hidden states* se interpretaban como representaciones comprimidas: versiones empobrecidas pero significativas del *prompt* original.

Sin embargo, resultados recientes cuestionan de raíz esta interpretación. Prueba de esto es el trabajo de Nikolaou et al. (Language Models are Injective and Hence Invertible, arXiv:2510.15511, 2025) donde se demuestra que, para una amplia clase de modelos Transformer de uso extendido, la función que asocia una entrada textual a su estado interno final es, con probabilidad uno, inyectiva y por ende invertible. Esta propiedad invalida la idea de que la codificación latente actúa como un mecanismo de compresión irreversible. Lejos de eliminar información, el proceso conserva lo suficiente como para permitir, al menos en principio, la reconstrucción del texto original. Los estados ocultos no serían destilados semánticos, obtenidos por  transformaciones fieles, operaciones que reorganizan sin olvidar.

Esta constatación obliga a reinterpretar la arquitectura desde una clave más próxima a la literatura de Borges que a la metáfora del embudo informacional. El mapa que replica exactamente el territorio (Borges, Del rigor en la ciencia), el laberinto que puede recorrerse en sentido inverso (Borges, La casa de Asterión) y la memoria patológica que no admite el olvido (Borges, Funes el memorioso) ofrecen imágenes precisas para describir estos comportamientos. En términos formales, se trata de aplicaciones uno a uno, con la posibilidad de volver a la salida y carentes de pérdida informacional, cuya complejidad no reside en la desaparición de datos, sino en su reordenamiento.

Bajo esta luz, considerar los estados ocultos como entidades transitorias e inofensivas resulta profundamente problemático. Su carácter casi perfectamente reconstructivo implica que cualquier información sensible introducida en un *prompt* —datos personales, información médica, secretos industriales o asesoramiento jurídico— permanece latente en una forma potencialmente recuperable. Las consecuencias para la confidencialidad, el cumplimiento normativo y la evaluación real de lo que un sistema recuerda u olvida son inmediatas. Todo ello apunta a la necesidad de repensar las arquitecturas actuales: introducir mecanismos explícitos de olvido, ofuscación deliberada de representaciones, cifrado en el espacio latente o restricciones estrictas al acceso a estados intermedios. En última instancia, el reto no es solo proteger los datos que entran y salen del sistema, sino diseñar a estos últimos para que sean seguros por construcción, incluso cuando su memoria resulta, en esencia, demasiado perfecta.

Este artículo analiza las propiedades funcionales de las arquitecturas Transformer de tipo *decoder-only* autorregresivas que, dada su integración ubicua, presentan implicaciones críticas para la privacidad. Investigaciones recientes muestran que, bajo hipótesis muy generales, la aplicación que mapea una secuencia finita de *tokens* a su estado oculto en la última capa es, casi siempre, inyectiva. Esto implica que las representaciones internas no son una reducción semántica del *prompt*, sino un rastro invertible que permite reconstruir el texto original mediante algoritmos eficientes. Desde una lente borgiana: los modelos no olvidan.

El flujo arquitectónico clásico de un LLM —tokenización, proyección a *embeddings*, codificación posicional y un stack de capas que combinan atención multi-cabeza y redes feedforward con residuales y normalización— define un mapeo complejo desde una secuencia discreta hacia un espacio latente continuo. Tradicionalmente se pensó que este proceso actuaba como un embudo compresor: distintos *prompts* podían confluir en estados internos similares que retenían solo la esencia semántica.

Recientemente se ha demostrado que, para una amplia clase de modelos decoder-only, la función $x \longmapsto \rho(x;\theta)$ (donde $\rho$ es la representación oculta del último token y $\theta$ los parámetros del modelo) es casi siempre inyectiva (Nikolaou et al.). En términos prácticos, esto obliga a replantear la intuición de que los estados internos constituyen representaciones empobrecidas: en muchos casos contienen suficiente información para reconstruir el *prompt* completo.

Esa constatación tiene consecuencias directas para la privacidad: si la representación interna es (casi) invertible, quien acceda a ella y disponga de un algoritmo de inversión viable puede recuperar texto sensible y PII que se suponía “olvidado”.

### Propiedades funcionales

Sea $X$ el conjunto discreto de *prompts* posibles (vocabulario finito y ventana de contexto finita) y $Y\subset\mathbb{R}^d$ el espacio de estados ocultos. Recordemos conceptos clave:

* **Inyectividad.** $f:X\to Y$ es inyectiva si $x_1\ne x_2 \implies f(x_1)\ne f(x_2)$. En nuestro contexto, dos *prompts* distintos no colapsan en la misma representación.
* **Inversa por la izquierda.** Si existe $g:Y\to X$ tal que $g\circ f=\mathrm{id}_X$, decimos que $f$ tiene inversa por la izquierda.
* **Implicación práctica.** La inyectividad garantiza existencia (y unicidad) de preimagen sobre la imagen de $f$, pero no garantiza que dicha inversa sea fácil de computar. Sin embargo, el resultado teórico viene acompañado de un algoritmo constructivo que demuestra recuperabilidad práctica, ver sección siguiente.

La razón por la que la inyectividad es “casi segura” en estos modelos se apoya en observaciones sobre la regularidad de los componentes (productos escalares, softmax, activaciones analíticas tipo GELU, LayerNorm, etc.) y en teoremas sobre ceros de funciones reales analíticas: para un par fijo $x\ne x'$, la ecuación $\rho(x;\theta)=\rho(x';\theta)$ define, salvo degeneración, un conjunto de parámetros de medida nula. Con inicializaciones continuas y entrenamiento “suave” (SGD y variantes), la probabilidad de caer exactamente en dichas superficies de colisión es nula y se preserva durante el flujo de entrenamiento salvo contramedidas radicales.

### Localización del problema: pipeline que importa

Descomponemos el mapping $x\longmapsto\rho(x;\theta)$ en etapas:

1. **Tokenización** ($\tau$): mapea texto a índices discretos.
2. **Embeddings** ($\mathrm{Emb}$): $\{1,\dots,|V|\}^T\to\mathbb{R}^{T\times d}$.
3. **Transformación** ($\mathcal{T}$): pila de $L$ bloques Transformer que actúan sobre $\mathbb{R}^{T\times d}$.
4. **Proyección de salida**: afin + softmax (no es el foco aquí).

La representación que nos ocupa es la fila asociada al último token $\rho_T(x;\theta)$, que ha tenido la posibilidad de atender a todos los tokens previos. Si $x\longmapsto\rho(x;\theta)$ es inyectiva, entonces toda la historia del *prompt* queda codificada en ese único punto del espacio latente.

Formalmente, para $x\ne x'$ definimos
$$h_{x,x'}(\theta) = \|\rho(x;\theta)-\rho(x';\theta)\|^2.$$
Si $h_{x,x'}$ no es identicamente nula como función analítica de $\theta$, su conjunto de ceros tiene medida nula; extendiendo a todos los pares posibles, las colisiones son excepciones.



### Algoritmo constructivo de inversión

Más allá del argumento de existencia, existe una estrategia práctica denominada SipIt (Search-based Iterative Prompt Inversion Transformer) que explota dos propiedades estructurales de los modelos decoder-only:

* la causalidad autorregresiva (la representación en la posición $k$ depende solo de los valores en las $k-1$ posiciones anteriores);
* la discreción del vocabulario (el espacio de candidatos por posición es finito).

Idea central: reconstruir la secuencia token a token comparando representaciones parciales con la representación objetivo y utilizando **KV-caching** para evitar recomputaciones. 

El algoritmo tiene una complejidad ingenua: $O(T\cdot|V|)$, pero mejoras prácticas (utilizando búsqueda jerárquica con ANN, filtrado por proximidad en embeddings, beam/adaptative pruning) reducen el coste efectivo, llegando a variantes $O(T\cdot\log|V|)$ en la práctica. A diferencia de optimizaciones continuas por gradiente y proyección al vocabulario, SipIt trabaja en el dominio discreto y evita no convexidades y discretizaciones fallidas.

Crucialmente, SipIt no requiere acceso a gradientes ni reentrenamiento: basta con capacidad de evaluación (*forward pass*) y acceso a activaciones—esto lo hace potencialmente factible en escenarios de *caja gris* (APIs que devuelvan *embeddings*).

### Problemas de confidencialidad

La combinación de inyectividad (casi segura) y la viabilidad del algoritmo de inversión genera nuevos vectores de amenaza:

* **Interceptación de activaciones internas.** Ataques MITM, fugas en arquitecturas *split inference*, side-channels y defectos de aislamiento (rowhammer, etc.) pueden exponer activaciones desde donde el *prompt* es recuperable.
* **Entornos multi-tenant.** Fallos en aislamiento de GPU o caches compartidos convierten a activaciones y KV-caches en repositorios de texto sensible.
* **Bases vectoriales y logs.** RAG, VDB y logs de depuración que almacenan *embeddings* sin cifrado fuerte son ahora fuentes reversibles de datos personales.

Además, desde el punto de vista regulatorio, las activaciones dejan de ser “datos anonimizados”: si pueden invertirse a texto identificable, deben tratarse como datos personales y protegidos (GDPR, AI Act, HIPAA, etc.). Paradójicamente, la misma invertibilidad facilita auditoría forense: una vez entendida la relación, podemos mapear con precisión qué fragmento del contexto activó cierta salida.

### Recomendaciones

Dado el riesgo, propongo medidas en tres niveles:

**Arquitectura y entrenamiento**

* Inyectar ofuscación controlada: ruido gaussiano/Laplaciano en embeddings o en estados latentes para introducir aleatoriedad (privacidad diferencial) que rompa la inyectividad estricta pero preserve utilidad.
* Diseñar cuellos de botella informacionales explícitos que obliguen a pérdida irreversible de detalles superficiales (compresión estructural).

**Infraestructura y despliegue**

* Clasificar activaciones, embeddings y caches con la misma sensibilidad que texto en claro.
* Cifrado obligatorio en reposo y en tránsito; uso de entornos de computación confidencial cuando proceda.
* Aislamiento estricto de memoria en entornos multi-tenant y borrado criptográfico de residuos.
* Prohibir exposición de activaciones completas por API en entornos de producción; permitirlo solo en depuración controlada.
* Saneamiento previo: eliminar/ocultar PII *antes* de enviar texto al modelo.

**Operativo y gobernanza**

* Revisar DPIA y políticas de retención asumiendo el peor escenario: acceso a activaciones implica acceso a *prompts*.
* Emplear algoritmos tipo SipIt para *red teaming* y auditoría proactiva.
* Controlar estrictamente el ciclo de vida de logs: TTL corto, acceso restringido.

### Conclusiones

La inyectividad prácticamente universal de la función que mapea *prompts* a estados ocultos en muchos Transformers decoder-only destroza la intuición de que los *embeddings* o activaciones son “resúmenes” seguros. Más bien, actúan como mapas de alta fidelidad: la memoria es casi completa. Algoritmos como SipIt convierten esa propiedad en una capacidad operativa para reconstruir *prompts*.

En términos borgianos: lo que parecía una abstracción es, en muchos casos, un mapa a escala 1:1. Esto obliga a que las estrategias de seguridad no se apoyen en la opacidad del espacio latente sino en diseños y políticas que introduzcan olvido intencional o que protejan rigurosamente las activaciones como si fueran datos en claro. En ausencia de tales medidas, la exposición de activaciones equivale a la exposición del contenido procesado: algunos LLMs no olvidan.

### Referencias

* Vaswani, A. et al., “Attention is all you need”, NeurIPS 2017.
* Nikolaou, G. et al., “Language Models are Injective and Hence Invertible”, arXiv:2510.15511, 2025.
* Ba, J. L., Kiros, J. R., Hinton, G. E., “Layer normalization”, arXiv:1607.06450, 2016.
* Geiping, J. et al., “Inverting gradients — how easy is it to break privacy in federated learning?”, NeurIPS 2020.
* Morris, J. X. et al., “Text embeddings reveal (almost) as much as text”, EMNLP 2023.
* Zou, A. et al., “Universal and transferable adversarial attacks on aligned language models”, arXiv:2307.15043, 2023.
* GDPR (Regulation (EU) 2016/679), EU AI Act (2024), HIPAA (1996).