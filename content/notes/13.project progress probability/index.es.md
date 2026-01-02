---
title: "Persistencia y dependencia" # va al índice de notas
date: 2025-12-30
showDate: false
summary: "Probabilidad de progreso de un proyecto"
# description: "nota 2" #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
tags: [uncertainty, repetition effect, conditional probability]
math:  true  
---


{{< katex >}}


### Probabilidad de progreso de un proyecto

Todo proyecto está, por definición, orientado al futuro. Un proyecto es una secuencia de acciones que apunta a la concreción de un objetivo que todavía no existe y cuyo resultado no puede conocerse de antemano. Incluso cuando el plan es claro y los medios están bien definidos, siempre hay un margen de incertidumbre respecto a si una acción concreta, o el proyecto en su conjunto, logrará concretarse.

Esta incertidumbre no es un defecto del diseño ni una falta de información; es estructural. Actuar implica decidir hoy bajo condiciones que solo se resolverán mañana. 

Precisamente por eso, modelamos entonces cada acción relevante del proyecto mediante una variable aleatoria
$$
X_k \in \{0,1\}, \qquad k=1,2,\dots
$$
donde $X_k=1$ representa la concreción de la acción en la etapa $k$ y $X_k=0$ su no concreción en dicha etapa. El índice $k$ no es solo un contador: impone una ordenación temporal de los intentos y, con ella, una secuencia de consumo de recursos. 


### Intentos y concreción

Definimos el **número de intentos hasta la primera concreción** como
$$
N := \inf\{n \in \mathbb{N} : X_n = 1 \}.
$$

> La variable aleatoria $N$ puede intepretase no solo como una medida del tiempo cronológico, sino también el **despliegue efectivo de recursos** necesario para que el proyecto avance: cada intento consume tiempo, dinero, etc. y $N$ cuenta cuántos de esos intentos fueron necesarios.

Por definición de $N$, son equivalentes los siguientes eventos 
$$
\{N>n\} = \{X_1=0,\dots,X_n=0\}, \qquad
\{N=n\} = \{X_1=0,\dots,X_{n-1}=0, X_n=1\}.
$$
Estas identidades no dependen de ninguna hipótesis probabilística adicional: e.g. independencia, distribución idéntica, etc.

La probabilidad $P(N \le n)$ se interpreta como la **probabilidad de que el proyecto se concrete en, a lo sumo, $n$ intentos**. Dicho de otra manera, mide la probabilidad de alcanzar el objetivo antes de agotar $n$ etapas o recursos asignados.


- [etapas] Indica cuán probable es que el proyecto logre avanzar dentro de los primeros $n$ pasos. Un valor cercano a 1 significa que el proyecto tiene alta probabilidad de concretarse rápidamente; un valor bajo indica que es probable que se necesiten más intentos.

- [recursos] Si cada intento consume recursos (tiempo, dinero, atención,... entonces $P(N \le n)$ refleja la probabilidad de que el proyecto se concrete antes de gastar los recursos correspondientes a $n$ intentos.

Si las variables aleatorias $\{X_k\}_k$ son idénticamente distribuidas e independientes tales que  $p:=P(X_k=1)$, entonces

$$
P(N \le n) = 1 - (1-p)^n,
$$

lo que crece monótonamente con $n$. Esto muestra que la probabilidad de concreción aumenta al invertir más intentos, y que la curva $P(N \le n)$ proporciona un una garantía casi segura de éxito y un modo de acotar la cantidad de recursos necesarios en promedio, como veremos más adelante.
Podemos hacer lo propio aún cuando los intentos no son independientes, definiendo probabilidades condicionales $P(X_k=1|X_1=0,\cdots X_k=0)$, denotadas por $p_k$, de manera que 

$$
P(N \le n) = 1 - \prod_{k=1}^{n} (1-p_k),
$$
reflejando cómo la estructura del proyecto puede favorecer o dificultar la concreción. Si $p_k$ aumenta con $k$, la persistencia se vuelve más eficaz; si disminuye con $k$, el progreso es más incierto. Dicha expresión para $P(N\le n )$ será demostrada más adelante.

En resumen, $P(N \le n)$ es una **medida acumulada de éxito**: cuantifica la probabilidad de concretar el proyecto **dentro de un límite de intentos o recursos**, y permite comparar escenarios independientes versus dependientes.



### Persistencia sin dependencia

Supongamos primero que los intentos son idénticamente distribuidos, con

$$
P(X_k=1)=p,
$$
de ahí que $P(X_k=1)$ no depende de $k$.

En este caso,

$$
P(N>n) = (1-p)^n,
\qquad
P(N=n) = (1-p)^{n-1}p.
$$

La esperanza de $N$ puede calcularse directamente a partir de su distribución:

$$
E[N] = \sum_{n\ge1} n (1-p)^{n-1} p.
$$

Usando que
$$
\sum_{n\ge1} n q^{n-1} = \frac{1}{(1-q)^2}, \qquad |q|<1,
$$

con $q=1-p$, se obtiene

$$
E[N] = p \cdot \frac{1}{p^2} = \frac{1}{p}.
$$

Para la varianza, observamos primero que

$$
E[N^2] = \sum_{n\ge1} n^2 (1-p)^{n-1} p.
$$


Usando la identidad

$$
\sum_{n\ge1} n^2 q^{n-1} = \frac{1+q}{(1-q)^3}, \qquad |q|<1,
$$

con $q=1-p$, resulta

$$
E[N^2] = p \cdot \frac{2-p}{p^3} = \frac{2-p}{p^2}.
$$

Por lo tanto, $V[N] := E[N^2] - (E[N])^2$, toma la forma 

$$
V[N] = \frac{1-p}{p^2}.
$$

Este modelo presenta cierta ingenuidad. Cada intento es estadísticamente igual al anterior. El pasado no influye en el futuro. Pero tiene cierta utilidad, pues es resoluble de manera sencilla y puede servir para fijar una escala natural para el orden de magnitud de los recursos necesarios y también como una cota de referencia incluso cuando el proceso real no sea independiente, como veremos posteriormente.

Ambas cantidades $E[N]$ y $V[N]$ tienen interpretaciones claras cuando se leen en términos de **recursos** y **riesgo**.



#### Interpretación de la esperanza

En el caso de intentos independientes con $P(X_k=1)=p$, la igualdad $E[N]=1/p$, dice que el **número medio de intentos necesarios** para concretar el proyecto es inversamente proporcional a la probabilidad de concreción en cada intento.

Interpretado operativamente:

* Si cada intento tiene una probabilidad pequeña de concreción, el proyecto es *caro* en recursos: el esfuerzo medio crece como $1/p$.
* Si se consigue duplicar $p$, se reduce a la mitad el número medio de intentos necesarios.

Esta igualdad también tiene una lectura estructural: en el modelo independiente, no hay memoria ni aprendizaje. El proceso “olvida” el pasado, de modo que el costo esperado del proyecto está completamente determinado por una única magnitud local, $p$. No importa cuántas veces se haya fallado antes: el costo esperado desde cualquier punto sigue siendo $1/p$.



#### Interpretación de la varianza

La varianza

$$
V[N]=\frac{1-p}{p^2}
$$

mide la **incertidumbre en el consumo de recursos** alrededor de su valor medio.

Hay varias lecturas complementarias:

1. **Riesgo operativo**
  Aunque el costo medio sea $1/p$, la realización concreta puede desviarse mucho de ese valor. Cuando $p$ es pequeño, la varianza es grande: no solo se espera gastar muchos recursos, sino que además el gasto es altamente impredecible.

2. **Escala natural de las fluctuaciones**
  La desviación típica es
  $ \sqrt{V[N]} = \sqrt{1-p}/p \sim 1/p$ cuando $p$ es pequeño.
  Esto indica que las fluctuaciones son del mismo orden que la media. No existe una “ley de los grandes números” que estabilice el costo: incluso en promedio, el proyecto puede salir mucho más caro o mucho más barato de lo esperado.

3. **Fragilidad del modelo sin dependencia**
  El hecho de que $V[N]$ sea grande refleja que el modelo independiente es frágil: al no incorporar aprendizaje ni desgaste, no hay mecanismo que reduzca la dispersión del número de intentos. El proceso puede terminar muy pronto o prolongarse arbitrariamente.



#### Lectura conjunta

* $E[N]=1/p$ fija el **nivel medio** de recursos necesarios.
* $V[N]$ cuantifica el **riesgo** asociado a esa estimación.

En el caso independiente, ambos crecen al mismo ritmo cuando $p$ es pequeño. Esto subraya un punto conceptual importante: persistir sin dependencia no solo es caro en promedio, sino también altamente incierto.

Desde esta perspectiva, introducir dependencia entre los intentos, cuando es favorable, no solo puede reducir $E[N]$, sino también estabilizar el proceso, disminuyendo la varianza y haciendo el uso de recursos más predecible.



### Persistencia con dependencia

Abandonamos ahora la independencia, manteniendo la misma distribución marginal:
$$
P(X_k=1)=p \quad \forall k.
$$

Definimos, para $n\ge1$, la probabilidad condicional
$$
p_n := P(X_n=1 \mid X_1=0,\dots,X_{n-1}=0).
$$

Introducimos una variable auxiliar $X_0$ definida como $X_0 = 0$ casi seguramente. Esta variable no representa un intento real, sino un estado inicial previo al comienzo del proyecto, en el que aún no se ha desplegado ningún recurso ni se ha realizado ninguna acción. Su único propósito es unificar la notación: al condicionar sobre $X_0=0$, que ocurre con probabilidad uno, no se introduce información adicional. En particular, esto permite definir de forma uniforme $p_1 := P(X_1=1 \mid X_0=0)=P(X_1=1)$ y tratar todos los pasos del proceso bajo una misma convención temporal. De esta forma para $n=1$ no hay condición. Para $n\ge2$, $p_n$ mide cómo cambia la probabilidad de concreción después de una secuencia de intentos fallidos.



Usando la regla del producto para probabilidades condicionales 

$$
P(X_1,\dots,X_n)=P(X_1)P(X_2|X_1)\dots P(X_k|X_1,\cdots X_{k-1})\dots P(X_n|X_1,\cdots X_{n-1})
$$ 

que denotamos de manera compacta como 

$$
P(X_1,\dots,X_n) = \prod_{k=1}^n P(X_k \mid X_1,\dots,X_{k-1})
$$

y que evaluada para el caso: 

$$
P(X_1=0,\dots,X_n=0)
= \prod_{k=1}^n P(X_k=0 \mid X_1=0,\dots,X_{k-1}=0)
= \prod_{k=1}^n (1-p_k).
$$

A partir de las identidades que definen $N$, se obtiene entonces

$$
P(N>n)=\prod_{k=1}^n (1-p_k),
\qquad
P(N=n)=p_n\prod_{k=1}^{n-1}(1-p_k).
$$
Estas expresiones son completamente generales y no requieren independencia.

### Persistencia que transforma y persistencia que no

Cuando $p_n = p$, persistir equivale a volver siempre al mismo estado probabilístico. 

Cuando la sucesión $\{p_n\}_{n\in \mathbb{N}}$ es creciente y además 
$$
p \le p_n
$$
cada intento fallido ($X_k=0$) incrementa la probabilidad condicional del siguiente. En este casi *la persistencia incorpora aprendizaje*.

Cuando la sucesión $\{p_n\}_{n\in \mathbb{N}}$ es decreciente y además 
$$
p \ge p_n
$$
cada intento fallido reduce la probabilidad futura. En este caso *la persistencia acumula ignorancia*.

### Persistencia y progreso

En el modelo sin dependencia se tiene $p_n=p$ para todo $n$, y por tanto
$$
P(N > n) = (1 - p)^n
$$

Si la estructura del proyecto es tal que
$$
p_n \ge p \quad \forall n,
$$
entonces
$$
P(N>n)=\prod_{k=1}^n (1-p_k) \le (1-p)^n,
$$
y en consecuencia
$$
P(N\le n) \ge 1-(1-p)^n.
$$
Persistir, en este caso, aumenta la probabilidad de progreso antes de consumir $n$ intentos.

Si, por el contrario, se cumple

$$
p_n \le p \quad \forall n,
$$
las desigualdades se invierten y la persistencia retrasa el progreso respecto del modelo independiente.





### Reflexión

Los proyectos no son eventos aislados, sino procesos formados por una sucesión de acciones. En la práctica, esas acciones rara vez son independientes: cada decisión modifica el contexto de las siguientes, para bien o para mal.

Por eso, la persistencia no puede evaluarse solo en términos de cuántas veces se insiste. Persistir sin que exista dependencia entre etapas equivale a repetir sin aprendizaje. En cambio, cuando el proyecto incorpora mecanismos que hacen crecer, local o globalmente, la probabilidad de concreción, la persistencia se convierte en progreso.

Desde este punto de vista, satisfacer un objetivo no es solo cuestión de resistir en el tiempo, sino de diseñar una estructura de dependencia entre acciones que permita que cada intento mejore las condiciones del siguiente. Persistencia y dependencia no son alternativas: son complementarias.


[{{< spotify type="album" id="5iT3F2EhjVQVrO4PKhsP8c?" width="100%" height="160" >}}]:#
[esto coloca un reproductor de muestras de spotify dado el id de la carpeta de spotify]:# 



[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 
