---

title: "Algoritmos de annealing" # va al índice de notas
date: 2025-01-03
showDate: false
summary: "Cuando la naturaleza inspira algoritmos de optimización"
# description: "nota 2" #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
tags: [quantum, optimization]
math:  true  

---

{{< katex >}}

## optimización vía annealing

Veamos cómo resolver problemas de optimización de una función $f$, usando algoritmos de annealing clásico y cuántico. Ambas familias de algoritmos tienen un origen común en basado en la termodinámica. 

### annealing clásico
El algoritmo de annealing clásico está motivado por una correspondencia con la **física estadística**, específicamente en el proceso de **recocido de sólidos**. El recocido es un proceso en el que un material se calienta a alta temperatura y luego se enfría lentamente. Este enfriamiento gradual permite que los átomos del material se reorganicen en una estructura más estable y de menor energía, lo que mejora sus propiedades. Si bien hay se han desarrollado técnicas similares, <cite>Pincus[^1]</cite> , <cite>Khachaturyan et.al. [^2]</cite>,  <cite>Khachaturyan et. al.[^3]</cite>. Pero fue en 1983, que este enfoque fue utilizado por <cite>Kirkpatrick, Gelatt Jr., Vecchi[^4]</cite> para una solución del problema del viajante de comercio y allí se propuso su nombre actual: **simulated annealing**.
 
[^1]: A Monte-Carlo Method for the Approximate Solution of Certain Types of Constrained Optimization Problems". Journal of the Operations Research Society of America. 18 (6): 967–1235  (1970).
[^2]: Khachaturyan, A.: Semenovskaya, S.: Vainshtein B., Armen. "Statistical-Thermodynamic Approach to Determination of Structure Amplitude Phases". Soviet Physics Crystallography. 24 (5): 519–524 (1970).
[^3]: Khachaturyan, A.; Semenovskaya, S.; Vainshtein, B. "The Thermodynamic Approach to the Structure Analysis of Crystals". Acta Crystallographica. A37 (5): 742–754 (1981).
[^4]: Kirkpatrick, S.; Gelatt Jr, C. D.; Vecchi, M. P. "Optimization by Simulated Annealing". Science. 220 (4598): 671–680 (1983).


### annealing cuántico

El algoritmo de quantum annealing y el término "recocido cuántico" fue propuesto por primera vez en 1988 por <cite> B. Apolloni, N. Cesa Bianchi y D. De Falco[^5]$^,$[^6]</cite> como un algoritmo clásico de inspiración cuántica. Fue formulado en su forma actual por <cite>T. Kadowaki y H. Nishimori [^7]</cite> en 1998.

[^5]: Apolloni, Bruno; Cesa-Bianchi, Nicolo; De Falco, Diego. "A numerical implementation of quantum annealing". Stochastic Processes, Physics and Geometry, Proceedings of the Ascona-Locarno Conference.
[^6]: Apolloni, Bruno; Carvalho, Maria C.; De Falco, Diego (1989). "Quantum stochastic optimization". Stoc. Proc. Appl. 33 (2): 233–244.
[^7]: Kadowaki, T.; Nishimori, H. (1998). "Quantum annealing in the transverse Ising model". Phys. Rev. E. 58 (5): 5355.

En esta presentación de **Nishimori** (uno de los autores del quantum annealing) en Google [link youtube](https://www.youtube.com/watch?v=OQ91L96YWCk) hace un recorrido por el algoritmo de annealing clásico y cuántico. 


Notar que la propuesta del quantum annealing en 1998 fue realizada antes que hubieran máquinas cuánticas en las que implementarlo. La propuesta del algoritmo del quantum annealing no requiere hardware cuántico, sino que puede ser considerado hoy como un algortimo de inspiración cuántica. 



Se ha demostrado teórica y experimentalmente que el quantum annealing puede superar al recocido térmico (recocido simulado) en ciertos casos, especialmente cuando la función objeto consiste en barreras muy altas pero delgadas que rodean mínimos locales poco profundos.


----

Comencemos por describir la inspiración común a ambos algoritmos. 

## Proceso de annealing como inspiración metalúrgica

Muchas aleaciones, e.g. acero (hierro-carbono), 
acumulan tensiones internas, debida a *defectos* (cualquier perturbación en la periodicidad de la red de un sólido cristalino) dentro de la superficie reticular del material, sobre todo después de un trabajo en frío o bien de un proceso de templado. 

La composición del material y la distribución de tales defectos determinan las propiedades físicas del material, tales como la conductividad eléctrica, el color, la ductilidad y la dureza, entre otras.

* **ductilidad** posibilidad de un material de deformarse plásticamente de manera sostenible y sin romperse por acción de un esfuerzo externo (op. fragilidad).
* **dureza** posibilidad de resistencia a la deformación plástica localizada, tales como la penetración, la abrasión y el rayado (op. suavidad).

En un material con defectos, es esperable que exista una temperatura umbral, por encima de la cual se promueve la migración de los componentes de dichos defectos. Posteriormente, si el enfriamiento es lento y controlado, los defectos pueden reorganizarse de manera más homogénea, dando lugar a un aumento la ductilidad además de una disminución de la dureza, junto con una disminución de la energía interna.

El proceso que regula este comportamiento se denomina **recocido** o **annealing**.


Como resultado de este **proceso térmico** sobre el material, queda de manifiesta la estrecha relación entre una redistribución o disminución del número de defectos, el aumento de la ductilidad y la disminución de la **energía interna**.



### receta recocido simple

1. **calentar** el material a cierta temperatura 
2. **mantener** la temperatura durante cierto tiempo 
3. **enfriar** el material lenta y controladamente 

Algo similar ocurre con otro tipo de recetas, veamos el siguiente análogo gastronómico para **ablandar la milanesa** como indica [esta señora](https://www.youtube.com/watch?v=owh4KLIewYw) o [este artículo de Crónica](https://www.cronica.com.ar/cocina/Trucos-para-que-la-milanesa-salga-como-Dios-manda-tierna-y-sabrosa-20230503-0026.html). En ambos casos la energía que se agrega al material tiende a disuadir las tensiones las tensiones internas generadas por las fibras.



## motivación del algoritmo

Veamos una manera de conectar los procedimientos de annealing con el de minimizar una función. Para ello comencemos por describir brevemente el procedimiento matemático para una función $f$. Hemos de adelantar que la cantidad que se minimiza en el proceso de annealing es la energía interna, al igual nuestra función objetivo $f$, i.e. $f \longleftrightarrow$ **energía interna**.

---

### ¿qué busca matemáticamente el algoritmo?
Supongamos una superficie dada por una función $f:D\rightarrow\mathbb{R}$, queremos encontrar el $(x_*)$ tal que $f(x_*)\leq f(x)$, $\forall x\in D$.

**nota** si $D\in\mathbb{R}^n$, con $n=2$ tendríamos una superficie. 

---

### ¿como representar físicamente el algoritmo?

#### Veamos que $f$ NO  debe asociarse al material físico

Dotemos de propiedades físicas al problema matemático anterior: supongamos que $f$ represente una porción de espacio en el que existe gravedad, podemos probar con tirar una bolita desde algún lugar $x_0$ y esperar que la bolita encuentre "por si sola" $x_*$. Lo que ocurre es que este procedimiento depende fuertemente de $x_0$, el "lugar" en el que sea dejada aquella bolita, y de $f$, del perfil de la superficie. Para aumentar las chances de encontrar $x_*$ podríamos repetir el procedimiento anterior cambiando en cada iteración el punto inicial $x_0$. 

Conviene no hacer alusión a que $f$ representa una superficie espacial, es decir el paisaje donde tal bolita se mueve, pues para $n>2$ no tendríamos una correspondencia realizable en este mundo. Conviene pensar en $f$ como cierto potencial, de hecho, el proceso de annealing en materiales modifica dos cosas: la energía interna (potencial en este caso) y la estructura interna del maeterial.

Tampoco la idea cruzada de tomar a $f$ como energía interna (o potencial) y que las bolitas estén sometidas mecánicamente a un potencial $f$, el camino de tales objetos estría determinado unívocamente por la forma de dicho potencial $f(x)$. De hecho, el simulated annealing no se explica tirando bolitas por una cuesta sin más, aunque fueren muchas, pues surge la siguiente pregunta: ¿cómo intentar evitar que aquellas bolitas queden atrapadas en mínimos locales?

En tal caso, las bolitas podrían ser realizaciones del algoritmo que simule el proceso de annealing, pero serían abstracciones de aquel pues no hay nada físico que **busque** el mínimo en el proceso metalúrgico, no es cierto que todas o la mayoría de las impurezas se localicen espacialmente en $x_*$. Si bien las impurezas se pueden desplazar espacialmente por el material permitiendo que la energía disminuya, el número de impurezas no es igual al número bolitas, i.e. realizaciones del algoritmo. 

De hecho si $f$ representara el material _per se_, tampoco funcionaría la analogía con el proceso de annealing, pues la forma del material debe cambiar en durante el descenso de la temperatura, ya no se estaría optimizando una función fija o _inmutable_  $f$ sino algo móvil o _mutable_.


En tal caso que bolitas **abstractas** recorran el material durante el proceso de annealing, ahora con mayor facilidad para encontrar el mínimo, sí que es razonable como argumento asociativo. Pues el proceso de annealing modifica la estructura interna del material cambiando la granularidad de fina a gruesa. Pensando en bolitas abstractas que permean el material con mayor facilidad, ahora en una estructura de granularidad superior, se asocian con estructuras cuya energía interna será menor. 



## Algoritmo [simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing)
(debería adjetivarse hoy como **_classical_ annealing**)


Denotemos por $x' \succ x$ a la relación de orden entre $x'$ y $x$, que adjetiva a $x'$ como _mejor que_ $x$. Usemos esta relación para denotar 


> $x' \succ x \Longleftrightarrow x'$ es   sucesor de $x$,

que conlleva la siguiente acción: 
> $x' \succ x \longleftrightarrow$ (aceptar $x'$, descartar $x$)

> **nota** hemos optado por cambiar el término vecino al de sucesor, pues el primer termino refiere o pretende una cercanía entre $(x,x')$, esto no necesariamente ocurre así. 

Dado que se trata de un algoritmo probabilístico que comienza con un $x$ aleatorio y luego sortea un posible sucesor, $x'$, para evaluar si hay alguna mejora entre $x'$ y $x$, podemos preguntarnos por la probabilidad $P(x'\succ x)$. 


### propuetas de pseudocódigo simulated annealing
$\mathtt{objetivo}$ minimizar $f(x)$

---
> $x \leftarrow x_0$  #elección del valor inicial 
for $k=1,\cdots , K$:
$T\leftarrow T_k$ #secuencia de "enfriamiento"
$x' \leftarrow \mathtt{neighbour}(x)$ #sorteo un posible sucesor de $x$ 
if $f(x')- f(x)< 0$: 
then $x \leftarrow x'$ #se acepta a $x'$, pues disminuye la función de costo
else 
case $\pmb{[}\mathtt{rand}(0, 1)\leq P(f(x'), f(x), T)\pmb{]}$: 
>> then $x \leftarrow x'$ #se acepta a $x'$, a pesar de que sea peor que $x$

>case $\pmb{[}\mathtt{rand}(0, 1)> P(f(x'), f(x), T)\pmb{]}$:
>> then $x \leftarrow x$ # no se acepta a $x'$ 

>return $x$

---

dado que el caso en que $\mathtt{rand}(0, 1)> P(f(x'), f(x), T)$, no actualiza el valor de $x$, podemos omitir toda esa parte y simplificar el pseudocódigo así: 

---
> $x \leftarrow x_0$  #elección del valor inicial 
for $k=1,\cdots , K$:
$T\leftarrow T_k$ #secuencia de "enfriamiento"
$x' \leftarrow \mathtt{neighbour}(x)$ #sorteo un posible sucesor de $x$ 
if $f(x')- f(x)< 0$: 
then $x \leftarrow x'$ #se acepta a $x'$, pues disminuye la función de costo
else $\mathtt{rand}(0, 1)\leq P(f(x), f(x'), T)$:
then $x \leftarrow x'$ #se acepta a $x'$, a pesar de que sea peor que $x$
return $x$
---

**nota** si lo que se minimiza es $f$ que es la energía interna, entonces aquellas bolitas abstractas recorren el perfil energético del material, es decir, las locaciones de tales bolitas serán las del valor inicial $x_0$ y las de los sucesores sorteados durante su ejecución.


## justificación formal
Dado que esta probabilidad depende del orden entre $f(x')\gtreqless
f(x)$, denotando de manera compacta a $\Delta_{x'x}f:=f(x')-f(x)$ podemos expresar 


$$
P(x'\succ x)=
P(x'\succ x|\Delta_{x'x}f<0 , T)P(\Delta_{x'x}f<0, T)+P(x'\succ x|\Delta_{x'x}f\geq0, T)P(\Delta_{x'x}f\geq 0, T).
$$

De manera que el algoritmo presenta una bifurcación según si $f(x')-f(x)<0$ o si $f(x')-f(x)\geq 0$, en cuyo caso la probabilidad de aceptar a ese $x'$ como sucesor del antiguo $x$ vendrá dada por la probabilidad condicional $P(x'\succ x|\Delta_{x'x}f\gtreqless 0\,, T)$, osea  la probabilidad de aceptar $x'$ frente a $x$ dado $\Delta_{x'x}f\gtreqless 0\,; T$, notemos que para el caso en que $\Delta_{x'x}f<0$ $x'$ se acepta siempre como sucesor de $x$, osea $P(x'\succ x)=1$, $\forall T$.

Podemos compactar aún más el pseudocódigo sin denotar explícitamente la bifurcación de aceptar siempre a $x'$ como sucesor de $x$ cuando $\Delta_{x'x}f<0$ y de aceptar con cierta probabilidad probabilidad cuando $\Delta_{x'x}\geq 0$, directamente como:

### pseudocódigo compacto del simualted annealing

En la propuesta anterior de pseudocódigo, faltó hacer alusión a que en cada temperatura $T_k$ deben realizarse varias rondas de búsqueda de posibles sucesores y decidir si se aceptan como sucesores o no. El lapso de tiempo que hay que esperar en cada temperatura para realizar está búsqueda viene dado por $L(T_k)$

---
> $x\leftarrow x_0$  #elección del valor inicial 
for $k=1,\cdots , K$:
$T\leftarrow T_k$ #secuencia de "enfriamiento"
$x' \leftarrow \mathtt{neighbour}(x)$ #sorteo un posible sucesor de $x$ 
else $\mathtt{rand}(0, 1)\leq P(f(x'), f(x), T)$:
then $x \leftarrow x'$ #se acepta a $x'$, a pesar de que pueda ser peor que $x$
return $x$
---
en este caso  $P(f(x'), f(x), T)$ denota ahora la probabilidad de aceptar $x'$ como sucesor de $x$, dada la función particular $f$ y la temperatura $T$. 

> **notar** que el caso en que $\Delta_{x'x}f<0$ si se acepta siempre $x'$ la línea será irrelevante 

>> else $\mathtt{rand}(0, 1)\leq P(f(x'), f(x), T)$

> pues $P(f(x'), f(x), T)=1$

### resumen: 
1. $\Delta_{x'x}f< 0$: $P(x'\succ x)=1$ es aceptado como  sucesor
2. $\Delta_{x'x}f\geq 0$: $P(x'\succ x)=e^{-\Delta_{x'x}f /T}$ (Bolztman distribution) **puede** ser aceptado como  sucesor. Para terminar de definir si será o no aceptado, lo que se hace es sortear un número $p\in[0,1]$ y si
   * $p\leq e^{-\Delta_{x'x}f /T}$ se acepta $x'$ como  sucesor 
   * $p>e^{-\Delta_{x'x}f /T}$ no se acepta $x'$ como  sucesor

### ¿por qué usar distribución de Boltzmann?


Puede motivarse por ser la distribución por excelencia en mecánica estadística en el contexto de los sistemas en equilibrio termodinámico. Esto va de la mano con que en el proceso de annealing  el enfriamiento es lento y puede tener lugar utilizar tal distribución. Pero para el algoritmo de annealing podría utilizarse otra, en principio parece no haber un argumento que obligue a usarla aquella distribución.

Veamos lo que implica adoptar dicha distribución en el algoritmo de annealing. Se tienen las siguientes propiedades si $\Delta_{x'x} f\geq 0$  

- la probabilidad de aceptar un cambio es **mayor** cuanto mayor sea $T$ y menor a medida que $T$ desciende. Esto permite que las bolitas sorteadas "exploren" inicialmente el espacio de posibles soluciones y luego se "estabilicen" en lo mejor que encuentren.

- la probabilidad de aceptar un cambio es **no nula** esto es algo interesante pues permite al algoritmo que aquellas bolitas abstractas escapen de mínimos locales. 

- la **duración** del algoritmo está regulada por la temperatura, cuando se llegue a $T_{K}$, que es nula, el "tiempo se acabó" pues no hay movimientos en el cero absoluto, de hecho la distribución de Boltzmann en el límite $T\to 0$ es $0$, como suele ocurrir en los sistemas termodinámicos clásicos.


Podríamos considerar que $\Delta_{x'x}f$ es aleatoria, pues el algoritmo comienza con un $x_0$ arbitrario,  los sucesores son aleatorios y por ende no se tiene información sobre las diferencias de la función $f$. Si pretendemos que este algoritmo se aplique a una enorme cantidad de funciones $f$ no debemos hacer afirmaciones particulares a priori acerca de tales diferencias.

Veamos qué otras afirmaciones generales conducen a modelar a $\Delta_{x'x}f$, para el caso en que es no negativa, como una variable aleatoria $Z$ tipo Boltzman, sin recurrir a analogías con la física de materiales, sino considerando tomando argumentos de la teoría de la información.

#### Un baño de humildad


Santa Teresa de Jesús escribió que «la humildad es andar en verdad», mucho antes escribió <cite>Platon[^8]</cite> «Pues yo era consciente de que no sabía prácticamente nada». De estas afirmaciones podríamos concluir que una afirmación verdadera sería que no sabríamos que distribución de probabilidades asignar a priori a $Z$. 

[^8]:Fowler, H.N., et al.; ``Plato, in Twelve Volumes''. Cambridge, Mass.: London: Harvard University Press; W. Heinemann, (1967).

Precisamente en el contexto de la teoría de la información, si no se sabe más que ciertas características sobre la distribución de $Z$ entonces deberíamos asumir máxima ignorancia, i.e. usar la distribución con la mayor entropía de Shannon posible, pues será la menos informativa acerca de $Z$.

Desde el punto de vista de la teoría de la información dicha distribución se obtiene como consecuencia de maximizar nuestra ignorancia acerca de $Z$. 

Si $Z$ fuera una variable aleatoria discreta sobre cierto conjunto $\mathscr{D}=\{z_i\}_{i\in I}$, entonces la **entropía** de Shannon viene dada por $S(Z)=-\sum_{i\in I} p_i\mathtt{log}(p_i),$    donde $\mathtt{log}$ representa el logaritmo sin especificar la base (si $S$ se mide en *bits* la base será $2$ y si $S$ se mide en *nats* la base será $e$) y $p_i=P(Z=z_i)$. 

En nuestro caso $Z$ representará las diferencias $\Delta_{x'x}f$ de una función general $f$, convendrá estudiar el caso en que $Z$ sea una variable aleatoria continua definida sobre cierto conjunto $\mathscr{D}$. En tal caso, será la **entropía diferencial** de Shannon será la que cuantifique nuestra ignorancia
\[
S(Z)=-\int_{\mathscr{D}}f_Z(z)\mathtt{log}\pmb{(}f_Z(z)\pmb{)}dz.
\]
> **nota** que $S(Z)$ sea una medida acerca de nuestra ignorancia sobre $Z$ puede argumentarse como sigue. La dispersión de $Z$ está ligada a $S(Z)$, por ejemplo: si $Z\sim N(\mu, \sigma)$ luego $S(Z)=\mathtt{log}(\sqrt{2\pi e}\,\sigma)$ es una función monótona creciente de $\sigma$, i.e. la dispersión de $Z$.

 
> la dispersión de $Z$ crece (decrece) $\longleftrightarrow$ la entropía $S(Z)$ en general crece (decrece)
---

En resumen, la motivación para partir de maximizar la entropía puede provenir de estas dos fuentes 

- **1.** teoría de la información: maximizar la **entropía diferencial** minimiza la cantidad de información previa incorporada
- **2.** física: muchos sistemas físicos tienden a moverse hacia configuraciones de máxima **entropía termodinámica** con el tiempo



##### Exponencialidad

Si existe tal adjetivo acerca de la función densidad $f_Z$. Sobre esto hay una respuesta desde la entropía, pues aquella la variable aleatoria $Z$ tal que su función densidad $f_Z(z)$ maximiza la entropía diferencial $S$, sujeta a la restricción de tener su valor esperado $E[Z]$ positivo y acotado superiormente. 

Definamos el problema de optimización entrópico, se trata de incluir la restricción de desigualdad $E(Z)-a\leq 0$, a la funcional $S(Z)$, se pueden usar las condiciones KKT que generaliza las ideas de multiplicadores de Lagrange y corresponde a encontrar la $f_Z(z)$ del funcional  $\mathscr{F}=S-\mu_0F_0-\mu_1F_1$, donde $F_0$ regula la condición de normalización de $f_Z$ y $F_1$ regula la condición de valor esperado de $Z$ acotado, además $\mu_0,\mu_1 > 0$
\begin{equation}
\begin{aligned}
\mathscr{F}[f_Z]=&-\int_{0}^{\infty}f_Z(z)\mathtt{log}\pmb{(}f_Z(z)\pmb{)}dz\\
&-\mu_0\Big[\int_{0}^{\infty} f_Z(z)dz - 1\Big]-\mu_1\Big[\int_{0}^{\infty}z f_Z(z)dz - a\Big]\\
\mathscr{F}[f_Z]=&\int_{0}^{\infty} L(f_Z,z)+\mu_0+a\mu_1
\end{aligned}
\end{equation}
donde $L(f_Z,z)=-f_Z\mathtt{log}(f_Z)-\mu_0 f_Z-\mu_1 z f_Z$, las ecuaciones de Euler-Lagrange son $\partial_{f_Z}L=0$, luego $f_Z(z)=e^{-\mu_1 z}/e^{\mu_0+1}$, con la condición de normalización $\int_{0}^\infty f_Z(z))=1$, luego $1/e^{\mu_0+1}=\mu_1$ y finalmente $f_Z(z)=\mu_1e^{-\mu_1z}$, osea que $Z\sim \mathtt{exp}(\mu_1)$.

#### Amnesia

No estamos hablando de la persona sino de su medida de probabilidad. 



$\textbf{def.}$ Definimos a $Z$ como una variable aleatoria **amnésica** si y solo si $P[Z>t+s|Z>s]=P[Z>t]$.


Esta propiedad se interpreta como que la información de los eventos que cumplen con $Z>s$, $Z$ supera a $s$, condiciona de tal forma a $Z>t+s$, que es idéntico a superar $Z>t$, como si no importara la información que aporta $Z>s$.

Dicho de otra forma aunque $s$ y $t$ no representen  tiempos, podemos interpretarla la propiedad indica que, dado que la variable $Z$ ya ha alcanzado un cierto nivel como $Z > s$, la probabilidad de que supere un valor adicional $Z > s + t$ es la misma que la probabilidad de superar ese valor adicional desde el "comienzo" $P(Z>t)$. Esto sugiere que los eventos $Z>s$ no afectan la probabilidad "futura", por lo que no hay efecto de *historia acumulada*. En otras palabras, el valor futuro de la variable no depende de cómo haya evolucionado hasta ahora, sino que es siempre como "empezar de nuevo".

Dada la función complementaria a la distribución acumulada, denotada por $G(z)=P[Z>z]$, podemos escribir 

\begin{equation}
\begin{aligned}
P[Z>t+s|Z>s]&=\frac{P[Z>t+s \bigcap  Z>s]}{P[Z>s]}\\
&=\frac{P[Z>t+s]}{P[Z>s]}\\
P[Z>t+s|Z>s]&=\frac{G(t+s)}{G(s)}
\end{aligned}
\end{equation}
pues si se cumple $Z>t+s$ corresponde a eventos contenidos en un conjunto incluido en el que corresponde a $Z>s$, de manera que si $Z$ es amnésica si y solo si $G(t+s)=G(t)G(s)$, $\forall s,t$. Veamos que si $s=0$ : $G(t)=G(t)G(0)$, luego $G(t)[1-G(0)]=0$ entonces o bien  $G(t)$ es idénticamente nula o bien $G(0)=1$. La primera opción queda descartada por trivial, por pretender ser $G(t)=P[Z>t]$. Además de la condición para $G$, se cumple que $G\geq 0$, pues $G(t/2+t/2)=G(t/2)G(t/2)$ luego $G(t)=G^2(t/2)\geq 0$.

Entonces buscamos $G$, tal que $G(t+s)=G(t)G(s)$, $\forall s,t$ con $G(0)=1$. Si $G$ es diferenciable y usando la condición para $G$ entonces $\frac{dG(z)}{dz}|_{z=t+s}=G(t)\frac{dG(z)}{dz}|_{z=s}$, luego evaluando en $s=0$ se tiene $G'(t)=G'(0)G(t)$, luego $G(t)=e^{G'(0)t}$, como $\lim_{t\to+\infty}P[Z\leq t]=1$ luego $\lim_{t\to+\infty}P[Z>1]=0$, entonces debe ocurrir que  $G'(0)<0$, con lo cual podemos escribir $G(z)=e^{-\lambda z}$, con cierto $\lambda>0$.

---

**notar** que  $P[Z\leq t+s|Z\leq s]=1$

---

#### Unificación

Suponiendo que $Z$ tiene valor esperado acotado superiorimente, y utilizando el principio de máxima ignorancia hemos conectado las ideas de exponencialidad y 
Hemos conectado las ideas de exponencialidad y amnesia. 

Podemos unificar 

Otra forma de resolver de manera unificada la distribución que hemos usado en el simulated annealing y que permitía la bifurcación según  $\Delta_{x'x}f\gtreqless 0$, podría consistir en buscar la distribución que maximice nuestra ignorancia, pero permitiendo que $Z$ será una variable aleatoria continua ahora extendida sobre todo $\mathbb{R}$. 

Podemos usar la función complementaria a la distribución acumulada $F^*(z)=\operatorname {P} [Z\leq z]$, definida como $G^*(z):=\operatorname {P} [Z>z]$ luego $G^*(z)=1-F^*(z)$ y $z$ extendida a todo $\mathbb{R}$.

Si $Z\sim \mathtt{exp}(\lambda)$, con $\lambda>0$, entonces la función densidad de $Z$, $f_Z(z)=\lambda e^{-\lambda z}$ luego $F(z)=\int_0^z f_Z(w) dw$ finalmente $F(z)=1- e^{-\lambda z}$, de hecho podría extenderse a todo  $z\in \mathbb{R}$, a partir de $f^*_Z(z)=0$ $\forall z<0$ y $f^*_Z(z)=f_Z(z)$ $\forall z \geq 0$, de manera que su función de distribución
\[F^*(z)=\left\{{\begin{matrix}0 &z<0\\1-e^{-\lambda z}&z\geq 0\end{matrix}}\right.\]
finalmente 
\[G^*(z)=\left\{{\begin{matrix}1&z<0\\e^{-\lambda z}&z\geq 0\end{matrix}}\right. \]

De esta forma $P[Z>z]$ corresponde a las probabilidades de aceptación de $x'\succ x$ con $z=\Delta_{x'x}f$, $\lambda = 1/T$.

De nuevo, esta función densidad extendida $f^*_Z(z)$ podría derivarse desde el punto de vista de la teoría de la información, como aquella que maximiza nuestra ignorancia, i.e. la entropía diferencial, ahora extendida para $z\in \mathbb{R}$ y sujeta a la restricción de tener su valor esperado acotado superiormente $E[Z]$.


## falta describir cómo se realizan estos son estos 3 pasos

1. $x = x_0$  #elección del valor inicial 
2. $T\leftarrow T_k$ #secuencia de "enfriamiento", temperaturas inicial $T_1$ y final $T_{K}$ y los saltos $T_k\mapsto T_{k+1}$
3. $x' \leftarrow \mathtt{neighbour}(x)$ #sorteo un posible sucesor de $x$ 



---
### 1. elección del valor incial

en la primera ronda usar sorteo para $x_0$
en las siguientes rondas usar el $x$ obtenido de la ronda anterior


### 2. secuencia de enfriamiento

#### Temperatura inicial $T_0$

Dado que la distribución para $Z\sim \mathtt{exp}(1/T)$ esto es el exponente de la probabilidad de aceptación es adimensional $e^{-\Delta_{x'x}f/T}$ entonces las unidades de $T$ son las unidades de $z$ osea de $f(x)$, entonces conviene sortar un $x_0$ y considerar $T_0=\gamma f(x_0)$, el factor $\gamma$ suele tomarse como $0.4$.


#### Temperatura final $T_K$

idealmente conviene que $T_K=0$
- si el descenso es de tipo lineal es viable proponer que $T_K=0$
- si el descenso es de tipo geométrico o exponencial no es viable proponer que $T_K=0$, nunca alcanzará ese valor, en cuyo caso conviene tomar $T_K\leq 0.01$

otros criterios de parada puede que no sea por alcanzar cierta temperatura, sino un número de posibles sucesores aceptados en cada temperatura, etc. 

#### actualización de la temperatura $T_k\rightarrow T_{k+1}$

##### lineal
buscamos una relación de $T_k$ con $k$ como $T_k=a+b\cdot k$, esto permite obtener la actualización de la temperatura $T_k\rightarrow T_{k+1}=T_k+b$. 

busquemos ahora la recta que pasa por los puntos $(0,T_0)$ y $(K,T_K)$, $T_k=T_0+k\cdot (T_K-T_0)/K$
permite encontrar cómo se actualiza la temperatura entre cada paso $T_k\rightarrow T_{k+1}= T_k+(T_K-T_0)/K$ 
en particular podemos exigir que $T_K=0$, con lo cual 
\begin{equation}
\begin{aligned}
T_k&=(1-k/K) T_0\\
T_{k+1}&= T_k-T_0/K
\end{aligned}
\end{equation}

##### geométrico o exponencial

la temperatura se actualice de forma geométrica o exponencial discreta
\begin{equation}
\begin{aligned}
T_{k}&=\alpha^k \,T_0\\
T_{k+1}&=\alpha\, T_k
\end{aligned}
\end{equation}
donde $\alpha\in(0,1)$ garantiza un descenso de la temperatura. Notar que $T_K=\alpha^KT_0$, no alcanzará el valor $0$, pues $\alpha^{K}$ no se anula para ningún $K$ finito. 

- Un argumento **físico** se podría inspirar en que el material se deja enfriar al aire libre y es bien conocida la ley de enfriamiento de un cuerpo de Newton ("Scala graduum Caloris" 1701). 

- Un argumento **algorítmico** para usar enfriamiento de tipo exponencial es lo suficientemente rápido para terminar cuanto antes el algoritmo.

- Un argumento de **regalo**, notemos que aun en el caso que $T_{k+1}=\alpha T_k$, la entropía diferencial cambia lentamente $\delta S\simeq 0$ pues  $S_{k+1}=S_k+\mathtt{log}(\alpha)$, luego la variación entre pasos $S_{k+1}-S_{k}=\mathtt{log}(\alpha)$ es pequeña, ya que en general suele considerarse que $\alpha$ suele estar muy muy cerca de $1$. Esto descansa en que $Z$ tiene por función densidad a $f^*_Z(z)$, con $\lambda = 1/T$, luego $S(Z)= \mathtt{log} (T)+1$.

### 3. sorteo de sucesores

Recordemos que la distribución de Bolztmann se usa como mecanismo probabilístico de aceptación de sucesores, pero queda abierta la forma de buscar sucesores.

Esta parte del algoritmo es la que pueda depender de la función objeto $f$, en particular del tipo de variable de $f$. 

- si $x\in \{0,1\}^n$, entonces $x'$ podría obtenerse haciendo un un bit-flip de un bit al azar de $x$, es decir sortear un $1$ para alguna de las posiciones de $1$ a $n$, definir el vector $k=(0,\cdots,1,\cdots,0)$ y tomar $x'=x\oplus k$, de manera similar se puede hacer si $x\in\{-1,1\}^n$

> **nota** si pretendemos resolver un problema en variable binaria $x\in\{0,1\}^n$ como excusa para resolver un problema en variable real $y\in\mathbb{R}^n$, podeos usar la codificación tal que cada $y_i$ se represente como una combinación de potencias de de $2$ multiplicados por una variable binaria $\{0,1\}$, hay que tener en cuenta aquí que hacer bit-flip en un bit arbitrario no es igual que tener en cuenta la jerarquía de tales bits, i.e. hay bits más representativos que otros. Podríamos pensar en hacer transiciones más (menos) violentas al principio (final), cuando la temperatura es alta (baja). Tener en cuenta que si se usa una codificación tipo complemento a1 o a2 el primer bit representa el signo con lo cual se puede pasar de $y$ a $-y$ con solo un bitflip. 

---

> **nota** ¿puede incorporarse alguna información sobre el perfil de $f(x)$? de manera que los sucesores no sean hijos solo del azar, sino que recolectando una suerte de muestreo de $f(x)$ pueda guiar la búsqueda por sorteo de sucesores.

### diccionario: proceso de annealing $\longleftrightarrow$ algoritmo de annealing


|$\textbf{proceso de annealing}$ | $\textbf{algoritmo de annealing}$|
|----|----|
|energía | función objeto|
|configuración| potencial solución|
|temperatura | parámetro de aceptación|
|enfriamiento rápido-lento | búsqueda local-global|



### conclusiones de un coach

El algoritmo de simulated annealing nos deja un aforismos al estilo  del _coaching ontológico_: 

> "para mejorar debes que aceptar tus derrotas"
> "debes salir de la zona de confort"
> "para avanzar hay que aprender a soltar"
> "de los errores nacen los grandes logros"

----

##  Algoritmo [quantum annealing](https://en.wikipedia.org/wiki/Quantum_annealing)

Dado el título entendemos que el nombre de este algoritmo debe estar ligado al proceso de annealing o al algoritmo de simulated annealing (que deberíamos llamar ahora clássical annealing).

En ambos casos estamos construyendo una máquina termodinámica abstracta que en su evolución temporal lenta nos revela $x_*$. En ambos casos clásico y cuántico, los cambios de la energía interna deben ser lentos de manera que las variaciones de entropía sean mínimos, no se intercambie calor: $\delta U \simeq \delta W$, de nuevo $\delta S\simeq 0$. 

En el trabajo de Kadowaki, T.; Nishimori, H. (1998). "Quantum annealing in the transverse Ising model", no se hace referencia explícita al teorema adiabático de Born y Fock de 1928. De hecho, la primer máquina que implementó el quantum annealing fue contruirda y comercializada por D-Wave Systems en 2011. 


El adjetivo de **quantum** en este algoritmo de Kadowaki, T.; Nishimori, H. (1998) viene a colación de que las fluctuaciones clásicas a la Boltzman $e^{-\Delta_{x'x}f/T}$, son reemplazadas por fluctuaciones cuánticas inspiradas en el efecto túnel cuántico, $e^{-w\sqrt{\Delta_{x'x}f}/\Gamma}$, donde $w$ es el ancho de la barrera y $\Gamma$ es el *transverse field*, que puede al igual que la temperatura ir cambiando con el tiempo. Es decir depende de la raíz cuadrada de la altura de la barrera y del ancho de la barrera. 

En Kadowaki, T.; Nishimori, H. (1998), se demuestra que el quantum annealing converge más rápido que el simulated annealing para el problema tipo Ising.


### quantum annealing through adiabatic quantum computing
Hemos visto que temperatura y tiempo están ligados en el proceso de annealing, pues la temperatura está regulado por el ritmo de descenso de la temperatura, que debe ser lento. Evoluciones lentas en termodinámica refieren a procesos de leves cambios en la entropía, es decir a procesos adiabáticos. 

En física cuántica hay un resultado importante debido a Max Born y Vladimir Fock (1928), en el tercer párrafo de "Beweis des Adiabatensatzes". Zeitschrift für Physik A, 51 (3–4), 165–180:
> (...) el teorema adiabático establece que si un sistema se encuentra inicialmente en un estado con un número cuántico específico y se somete a una transformación adiabática (infinitamente lenta), la probabilidad de transición a un estado con un número cuántico diferente es infinitamente pequeña. 

Esto es el estado del sistema puede ser en el un estado propio instantáneo si una perturbación dada actúa sobre él con la suficiente lentitud y si existe una brecha entre el valor propio y el resto del espectro del hamiltoniano.

Basado en el teorema adiabático, aquí está la relación entre descenso lento de la temperatura asociado con la evolución lenta del tiempo en el proceso adiabático...







[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 
