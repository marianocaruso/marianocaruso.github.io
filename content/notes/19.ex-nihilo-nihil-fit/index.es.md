---
title: "¿Extrayendo información de la nada?"
subtitle: "La paradoja de los dos sobres, priors impropios y el umbral de Thomas Cover."
date: "2026-09-11"
showDate: false
summary: "¿Puede un número generado al azar,  aumentar tus probabilidades de tomar mejores deciciones?"
draft: false
showReadingTime: false
tags: ["probabilidad", "teoría de la información", "paradojas"]
math: true
---

{{< katex >}}

{{< lead >}}
Te presentan dos sobres cerrados con dinero. Sabés que uno contiene exactamente el doble que el otro. Se toma uno al azar, lo abrís y observás una cantidad $x$. En ese momento te ofrecen quedarte con $x$ o cambiarlo por el sobre cerrado, que puede tener el doble de lo que ves o la mitad de lo que ves: ¿qué hacés?  {{< /lead >}}

## El pasto del vecino siempre parece más verde

Dado que el sobre que tenés en la mano tiene una cantidad $x$ de dinero, el otro tiene $2x$ (con probabilidad $1/2$) o bien $x/2$ (con probabilidad $1/2$). Así que un calculo ingenio de tu ganancia esperada, si cambiás, es:

$$\tfrac{1}{2}(2x) + \tfrac{1}{2}(x/2)$$

Como $1.25x > x$, todo parece indicar que cambiar es la mejor opción.

Podemos generalizar esto, cambiando la proporción: en lugar de un factor de 2 a un factor $p$ (con $p > 0$ y $p \neq 1$ para que efectivamente haya dos cantidades distintas). Si tu sobre tiene $x$, el otro contiene $px$ o bien $x/p$. Tu nueva ganancia esperada al cambiar sería:

$$\tfrac{1}{2}(px) + \tfrac{1}{2}(x/p) = \frac{p^2 + 1}{2p} x$$

Notar que para cualquiera de las proporciones $p$  permitidas, el factor $\frac{p^2+1}{2p}$ es estrictamente mayor a 1. Es decir, sin importar la proporción del juego, esta formulación te va a decir que te conviene cambiar.

Uno de los problemas de esta formulación, consiste en tratar a nuestra observación inicial $x$ como el centro gravitatorio del problema. El valor $x$ no es el parámetro base; es apenas un espejismo, una observación condicionada y efímera de las verdaderas cantidades subyacentes, fijas y reales que están sobre la mesa.

Algo en esta formulación invita a pensar que no es correcta: si realmente se presenta un sobre elegido al azar de entre las dos opciones (es decir, esto no es como en ciertos concursos televisivos, donde lo que se presenta al participante suele estar condicionado por la información de quienes han diseñado el programa) ¿cómo podría, sin más, la opción de cambiar ser la recomendable?

## Aleatoriedad para romper la simetría 

A lo largo de las décadas, este problema fue atendido por matemáticos, economistas y filósofos. Desde su primera iteración analizada por Maurice Kraitchik en 1943 (usando corbatas y billeteras), hasta interminables debates sobre la probabilidad bayesiana y el peligro de asignar probabilidades ingenuas a eventos desconocidos, la mayoría de los esfuerzos se centraron en explicar por qué el cálculo anterior estaba mal. Pero muy pocos se animaron a hacer la pregunta ofensiva: ¿podemos usar el valor de nuestro sobre para ganar de verdad?

Si el valor observado $x$ parece no darnos información para decidir, ¿estamos condenados al 50/50? En 1987, el teórico de la información Thomas Cover demostró que no. Su formulación original, publicada en el problema Pick the Largest Number, no hablaba de sobres ni de proporciones fijas, sino de un escenario mucho más hostil que permite entender cómo hacer la transición de decidir bajo máxima incertidumbre (estar completamente a ciegas) a decidir bajo incertidumbre (donde tenés una ventaja probabilística real).

Cover plantea un juego de máxima incertidumbre: un adversario escribe dos números reales distintos cualquiera, digamos $a$ y $b$ (asumamos $a < b$ sin pérdida de generalidad). No hay reglas de proporción y no existe una distribución de probabilidad conocida para la elección de estos números. Elegís uno al azar, observás su valor $x$ y tenés que adivinar si es el mayor.

Bajo estas condiciones de ignorancia absoluta, Cover propuso una estrategia de una belleza cínica. Inyecta una variable aleatoria de control: generás un número aleatorio $K$ a partir de una distribución continua, sobre el conjunto de números posibles de los que fueron tomados $a$ y $b$, como una exponencial o normal. Este número $K$ subdivide el espacio del problema de decisión de 2 a 3 partes, y en particular veremos que dentro de uno de tales subespacios la probabilidad de ganar es 1.

### El algoritmo es simple:

1. Si lo que observás ($x$) es menor que $K$, entonces **cambiás**. 
2. Si lo que observás ($x$) es mayor que $K$, entonces **no cambiás**.

> en el primer caso $x < K$ se asume que lo que se te dio como opción es el más chico, por eso cambiás.

> en el primer caso $x > K$ se asume que lo que se te dio como opción es el más grande, por eso no  cambiás.

Veamos por qué esto es una estrategia ganadora analizando los tres escenarios posibles donde puede caer $K$ en relación a los desconocidos $a$ y $b$:

Si $K \leq a$ o $K \geq b$, tu umbral es inútil. Cayó fuera del rango de interés. No logra discriminar nada y seguís jugando a cara o cruz, acertando el 50% de las veces.

Pero si $a < K < b$, la magia ocurre. Si observaste la cantidad menor ($a$), vas a cambiar (porque $a < K$) y te llevás el mayor ($b$). Si observaste la mayor ($b$), te la quedás (porque $b > K$). En este intervalo, tu tasa de acierto es del 100%.

Podemos demostrar que la probabilidad total de ganar el juego de Cover aplicando la Ley de Probabilidad Total sobre estos tres escenarios:

{{<alert "lightbulb">}} $$\begin{aligned} P(\texttt{ganar}) = & P(\texttt{ganar} \mid K < a) {\cdot} P(K < a) + \\ & P(\texttt{ganar}\mid a \leq K \leq b) {\cdot} P(a \leq K \leq b) + \\ & P(\texttt{ganar}\mid K > b) {\cdot} P(K > b)\end{aligned}$$


Notar que estamos tomando cierta licencia en la nomenclatura sobre el "evento” $\texttt{ganar}$ y su probabilidad asociada.
{{< /alert >}}
Reemplazando por las tasas de acierto (50%, 100% y 50%):

$$P(\texttt{ganar}) = \tfrac{1}{2}P(K < a) + P(a \leq K \leq b) + \tfrac{1}{2} P(K > b)$$

Agrupamos los términos multiplicados por $1/2$:

$$P(\texttt{ganar}) = \tfrac{1}{2} \big[ P(K < a) + P(K > b) \big] + P(a \leq K \leq b)$$

Dado que $P(K < a) + P(K > b) + P(a \leq K \leq b)=1$. Sustituyendo esto, llegamos a la expresión final:

$$P(\texttt{ganar}) = \tfrac{1}{2} \left[1+ P(a \leq K \leq b)\right]$$


Como la distribución de $K$ cubre todos los números reales, y como $a$ y $b$ son distintos (sin pérdida de generalidad $a < b$), por lo tanto $P(K \in [a,b]) > 0$, de manera que queda reducida la máxima incertidumbre sobre la elección, pues $P(\texttt{ganar})$ ahora es mayor a $1/2$.

## La conexión con nuestros sobres

Con la estrategia general demostrada, volver a nuestro problema original es sencillo. Nuestro problema de los sobres no es más que un caso particular, del juego de Cover. Ahora no puede elegir dos números cualesquiera está atado por la proporción entre ellos.

Si aplicamos la misma estrategia, generando nuestro umbral $K$, la probabilidad de quedarnos con el sobre que más plata tiene se reduce de forma directa a:

$$P(\texttt{ganar}) = \tfrac{1}{2}\left[1 + P(\alpha \leq K \leq 2\alpha)\right]$$

Sabemos que $P(\alpha \leq K \leq 2\alpha) > 0$ entonces $P(\texttt{ganar}) > 1/2$.

Acabamos de extraer información útil de un valor completamente aleatorio y desconectado del sistema. No adivinamos el valor exacto de $\alpha$, pero usamos una vara de medir caótica para romper la simetría de nuestra propia ignorancia. El espejismo se disipó, y la estadística, finalmente, juega a nuestro favor.


## Simular

He aquí una forma sencilla de verficar las ideas contrastando ambas estratégias de decisión.

<iframe src="/juegos/cover-vs-rand/simulador_cover-vs-rand_minimalista.html"
        style="width: 100%; height: 900px; border: none;"
        loading="lazy"
        allowfullscreen>
</iframe>


## Conclusión

El principio de $\textit{ex nihilo nihil fit}$ permanece intacto: el mecanismo de Cover no genera información de la nada, sino que introduce una escala externa allí donde el observador carecía de marco de referencia. La variable aleatoria $K$ no adivina el contenido oculto; funciona como un sistema de coordenadas que quiebra la simetría del problema. La ventaja sobre el 50% es la consecuencia directa de contrastar un valor huérfano de contexto $x$ contra los valores para $K$ que surgen de una distribución de probabilidad bien definida.

## Referencias para curiosos:

> {{< icon "link" >}} [T. M. Cover, Pick the Largest Number. Open Prob. in Comm. & Comp.](https://isl.stanford.edu/~cover/papers/paper73.pdf)

> {{< icon "youtube" >}} [Numberphile: How to Win a Guessing Game](http://www.youtube.com/watch?v=ud_frfkt1t0)

> {{< icon "youtube" >}} [Vsauce2: Should You Switch? NO!](http://www.youtube.com/watch?v=5LWfXhggC70)




