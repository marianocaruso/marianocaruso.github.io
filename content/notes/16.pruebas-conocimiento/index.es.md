---
title: "Cómo demostrar sin mostrar"
subtitle: "..."
date: 2026-03-25
showDate: false
summary: "Pruebas de conocimiento nulo"
draft: false
showReadingTime: false
tags: [criptografía, demostración, conocimiento, confianza]
math: true
---

{{< katex >}}


## Introducción: 


Existe una forma de crueldad técnica que Jorge Luis Borges bautizó como "maestría de Dios" en su *Poema de los dones*. El autor describe la "magnífica ironía" de recibir simultáneamente los libros y la noche: la posesión de una biblioteca infinita bajo el estigma de la ceguera.

Por un lado tenemos a $B$ un bibliotecario ciego que habita un paraíso de datos e información repleto de libros, en una estructura que recuerda *La biblioteca de Babel* (otro texto de Borges). $B$ habita una red de galerías hexagonales donde cada libro tiene su lugar, pero él no puede percibir los pasadizos que los conectan. Una de las tareas más laboriosas en esta biblioteca es la reubicación de ejemplares en su correspondiente estante. Para esto $B$ decide contratar un asistente para confeccionar una metodología de reubicación adaptada a su ceguera. Por otro lado, tenemos a $A$ un aspirante de asistente, quien debe estudiar la distribución de los libros en la biblioteca y realizar una suerte de examen frente a $B$. Algo importante, $A$ quiere conservar su trabajo todo el tiempo que sea posible, por tanto querrá siempre demostrar a $B$ que conoce el camino entre dos libros dados, sin revelar nunca el camino y perpetuarse en su puesto.

> ¿Puede $A$ demostrarle consistentemente a $B$ que conoce el camino que conectan esos dos libros, sin revelarle cuál es ese camino?

Esta pregunta ha sido abordada desde la criptografía y la respuesta es un rotundo sí. En este contexto criptográfico, hará falta formalizar algunas ideas mínimas y usar el relato entre $A$ y $B$ como guía en el resto de este texto. 


## Pruebas de conocimiento nulo

¿Cómo demostrar conocer algo sin mostrar ese algo?

### Abstrayendo libros y recorridos interlibros

Para formalizar esta coreografía, definamos dos elementos abstractos (antes libros), $\xi_0$ y $\xi_1$. Supongamos que existe una transformación, un "puente" o isomorfismo secreto $\sigma$, tal que $\xi_1 = \sigma(\xi_0)$.


### Demostración táctica

¿Cómo puede $B$, en su ceguera, verificar que $A$ no está inventando rutas inexistentes? La solución no es visual, sino estructural. Definamos dos libros distantes como $\xi_0$ y $\xi_1$. El "secreto" de $A$ es la trayectoria exacta $\sigma$ que los une.

La función de verificación de $B$ se basa en el punto de pivote. Para cada examen, $B$ le pide a $A$ que elija una galería intermedia y un libro $\xi$ allí ubicado y que se sitúe en ella. La verificación ocurre mediante un desafío binario:

* compromiso: $A$ anuncia que ha llegado a esa galería intermedia y tiene acceso a cierto libro $\xi$. $B$ confirma que $A$ está efectivamente en alguna galería, pero no sabe cómo llegó allí.

* desafío: $B$ lanza una moneda.
    * si sale cara: $B$ le pide a $A$ que lo guíe desde el libro $\xi_0$ hasta el libro $\xi$. $B$ camina de la mano de $A$ por este tramo.
    * si sale cruz: $B$ le pide a $A$ que lo guíe desde el libro $\xi$ hasta el libro $\xi_1$.

## ¿Cómo es que funciona?

La "función de verificación" de $B$ evalúa la continuidad del espacio. Si $A$ fuera un impostor y no conociera el camino secreto $\sigma$ que une $\xi_0$ con $\xi_1$, no podría encontrar una galería intermedia que conecte con ambos libros a la vez.

Si $A$ miente, tendría que apostar: o prepara un camino desde $\xi_0$ a una galería falsa, o desde una galería falsa hacia $\xi_1$. Pero como el bibliotecario elige al azar qué tramo recorrer, el impostor tiene un 50% de probabilidades de ser descubierto en cada paso.

La seguridad del asistente $A$ para mantener su empleo reside en que $B$ nunca recorre ambos tramos para el mismo punto intermedio $\xi$. Si $B$ hiciera esto podría componer, por carácter transitivo, la trayectoria total  $\xi_0\to \xi_1$ a partir de las partes $\xi_0 \to \xi$ y $\xi \to \xi_1$.

Al unir las dos piezas, el bibliotecario ciego reconstruiría en su mente el mapa secreto $\sigma$, y la necesidad de tener un asistente desaparecería. Este protocolo le permite a $A$ acceder a su puesto como asistente y perpetuarse en él.

----

### De asistentes y bibliotecarios a probadores y verificadores

Aquel aspirante de asistente $A$ y aquel bibliotecario ciego $B$ se conocen en criptografía bajo el nombre de probador $P$ y verificador $V$.

Recordemos que $V$, aun teniendo delante de sí dos elementos $\xi_0$ y $\xi_1$, no conoce una trayectoria que permite ir de uno a otro. Un probador $P$ afirma conocer una trayectoria. El reto del protocolo es que $P$ debe convencer al verificador de que conoce el camino, sin revelar nada más que la veracidad de dicha declaración.


Para que $P$ convenza a $V$ sin entregar el secreto $\sigma$, realiza un injerto de aleatoriedad. $P$ genera un tercer elemento intermedio, el libro $\xi$, mediante una transformación $\gamma_0$:

$$\xi = \gamma_0(\xi_0).$$


Debido a la conexión secreta $\sigma$, este nuevo elemento $\xi$ también está vinculado a $\xi_1$ mediante una segunda transformación $\gamma_1$. Tenemos entonces que:

$$\xi = \gamma_1(\xi_1).$$
naturalmente existe camino inverso, denotado por  $\xi_1^{-1}$.

$V$ emite un bit aleatorio $b \in \{0, 1\}$.

* $b = 0$: $V$ exige a $P$ que revele $\gamma_0$. Se comprueba que $\xi$ es una derivación honesta de $\xi_0$.
* $b = 1$: $V$ exige a $P$ que revele $\gamma_1$. Se comprueba que $\xi$ tiene una conexión válida con $\xi_1$.


La seguridad del protocolo no reside en la complejidad, sino en la imposibilidad de la síntesis. Si $P$ fuese forzado a entregar ambos isomorfismos ($\gamma_0$ y $\gamma_1$) para el mismo libro $\xi$, la propiedad de "conocimiento nulo" colapsaría. El verificador podría construir $\xi_1^{-1}$ y calcular $\gamma_1^{-1} \circ \gamma_0$ que resuelve precisamente el problema de encontrar $\sigma$ para conectar $\xi_0$ con $\xi_1$. Esto es así pues, dado que $\gamma_1(\xi_1) = \gamma_0(\xi_0)$ luego $\xi_1 = \gamma_1^{-1}(\gamma_0(\xi_0))$ por lo que $\sigma = \gamma_1^{-1} \circ \gamma_0$.

Al recibir ambas piezas $(\gamma_0,\gamma_1)$, el verificador podría "ver" para convertirse en dueño del secreto. El protocolo funciona porque se realizan iteraciones de estos pasos, cambiando aleatoriamente el punto intermedio $\xi$, de manera que el verificador solo puede conocer un camino entre cada punto intermedio y uno de los elementos $\{\xi_0,\xi_1\}$ elegidos también al azar en cada ronda.

La prueba se verifica iterativamente, en una serie de rondas, por la acumulación de sospechas fallidas. En la primera ronda, tras verificar el vínculo entre $\xi_0$ y el punto intermedio $\xi$, la probabilidad de que el probador esté cometiendo un fraude es de un medio. Al repetirse el proceso con un nuevo punto de pivote, esta duda se reduce a un cuarto. Al alcanzar la $n-$ésima iteración, la probabilidad de engaño es $2^{-n}$. La duda de $V$ va desapareciendo, pero su ignorancia sobre el secreto $\sigma$ permanece intacta.

## Reflexión


Las pruebas de conocimiento nulo son, en esencia, un pacto sobre los límites de lo que compartimos. Nos permite validar procesos y certificar identidades sin sacrificar la privacidad, creando un puente de confianza allí donde antes solo había ceguera o desconfianza. En un entorno digital que tiende a la transparencia absoluta, estas estructuras nos devuelven el control sobre nuestra propia información. Al final, demostrar la verdad sin exponer su origen es una de las herramientas más potentes de la soberanía técnica del usuario: una forma de participar en el sistema sin quedar expuestos por él, preservando el secreto bajo la luz de una evidencia matemática.