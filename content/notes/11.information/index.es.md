---

title: "Información" # va al índice de notas
date: 2025-07-04
showDate: false
summary: "Midiendo la sorpresa"
# description: "nota 2" #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
tags: [information theory, Shannon entropy, self-information, probability distribution]
math:  true  

---


{{< katex >}}

## ¿Qué es la Información y cómo se mide?


Imaginemos una situación cotidiana: abrís el la heladera esperando encontrar leche, pero descubrís que tiene "más vida de la esperada". Esa desagradable sorpresa te ha proporcionado información valiosa `no consumas esa leche`.

Por otro lado, si lanzás un dado cargado que siempre cae en 6, cada resultado te sorprenderá poco, si usás un dado balanceado, cada lanzamiento será más impredecible que el caso anterior.

> **idea central** podemos medir la información mediante el nivel de sorpresa que genera un evento. A mayor incertidumbre resuelta, mayor el contenido informativo.

### De la intuición a la formalización matemática

Definimos una función matemática \( I(p) \) que cuantifica la información basada en la probabilidad \( p \) de un evento. Esta función debe cumplir con cuatro principios esenciales:

1. **Variación continua**: Cambios pequeños en probabilidad deben generar cambios pequeños en información
2. **Cero información para lo seguro**: Eventos con \( p = 1 \) no aportan nueva información
3. **Aditividad para eventos independientes**: \( I(p_1 \times p_2) = I(p_1) + I(p_2) \)
4. **Relación inversa con la probabilidad**: Menor probabilidad implica mayor información

Una función que satisface perfectamente estos principios es:

\[ I(p) = -\log_2 p \]

### Comprobación matemática

**Eventos independientes:** Para probabilidades \( p_1 \) y \( p_2 \):

\[
\begin{aligned}
I(p_1 p_2) &= -\log_2 (p_1 p_2) \\
&= -(\log_2 p_1 + \log_2 p_2) \\
&= I(p_1) + I(p_2)
\end{aligned}
\]

**Comportamiento esperado:**
- Cuando \( p \to 0 \), \( I(p) \to \infty \) (eventos muy raros son muy informativos)
- Cuando \( p = 1 \), \( I(p) = 0 \) (lo seguro no informa)

## Entropía: el corazón de la teoría de la información

### Definición y significado

La **entropía de Shannon** representa el contenido informativo promedio de una distribución de probabilidad. Para eventos con probabilidades \( p_1, p_2, ..., p_n \):

\[ H[X] = \mathbb{E}[I(X)] = -\sum_{i=1}^{n} p_i \log_2 p_i \]

### Caso de estudio: distribución bernoulli

Para una variable que toma valor 1 con probabilidad \( p \) y 0 con probabilidad \( 1-p \):

\[ H[X] = -p \log_2 p - (1-p) \log_2 (1-p) \]

**Comportamiento característico:**
- Máxima entropía en \( p = 0.5 \) (máxima incertidumbre)
- Mínima entropía en \( p = 0 \) o \( p = 1 \) (cero incertidumbre)
- La curva describe una parábola invertida

## La elección del logaritmo base 2

### Motivación

Pensemos en un sistema de comunicación simple: necesitas transmitir el resultado de un lanzamiento de moneda usando solo una señal binaria (prender/apagar una luz).

**Estrategia óptima:**
- Cara: enviar señal (1)
- Cruz: no enviar señal (0)

Esta solución requiere exactamente **un bit** de información, la unidad mínima posible.

### Por qué bits y base 2

- **Bit**: Unidad fundamental que representa una elección binaria
- **Sistema binario**: Base matemática natural para sistemas digitales
- **Logaritmo base 2**: Responde "¿a qué potencia debo elevar 2 para obtener este número?"

**Otras bases:**
- Base \( e \): Unidades en "nats" (natural units)
- Base 10: Menos útil en contextos computacionales



## Conclusión




La teoría de la información, cimentada por Claude Shannon en 1948, proporciona herramientas matemáticas precisas para cuantificar algo tan abstracto como la información. Desde compresión de datos hasta comunicación eficiente, estos conceptos siguen siendo fundamentales en la era digital.

La elegancia de la teoría reside en cómo conecta intuición cotidiana con matemáticas rigurosas, demostrando que incluso la "sorpresa" puede medirse y optimizarse.

En resumen, **auto-información** mide sorpresa individual: $I(p) = -\log_2 p$, la **entropía** promedia la sorpresa esperada: $H[X] = -\sum_{i=1}^{n} p_i \log_2 p_i$. Las **distribuciones balanceadas** maximizan la entropía y los **sesgos** reducen el contenido informativo.


[{{< spotify type="album" id="5iT3F2EhjVQVrO4PKhsP8c?" width="100%" height="160" >}}]:#
[esto coloca un reproductor de muestras de spotify dado el id de la carpeta de spotify]:# 



[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 
