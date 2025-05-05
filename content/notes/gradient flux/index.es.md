---

title: "Flujos y gradientes" # va al índice de notas
date: 2025-01-04
showDate: false
summary: "Sobre el proceso de búsqueda de puntos críticos"
# description: "nota 2" #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
tags: [gradient flux , optimization]
math:  true  

---

{{< katex >}}

<!--

 -->

-----

## ¡Qué te la optimize Magoya!

... dijo nunca nadie.

## Con M de Magoya

Los problemas de optimización pueden ser enunciados con cierta facilidad, pero su análisis y resolución suelen conducir a una gran cantidad de detalles formales y computacionales. Este artículo pretende comentar algunos puntos sobre la idea de concebir algún sistema físico, $M$, al que preparamos en algún estado inicial, y luego dejamos que recorra su vida en búsqueda del estado óptimo. 

Exteriorizamos la responsabilidad de resolver un problema de optimización a algún sistema físico _bien educado_: si pudiéramos construir sistemas físicos tales que en su evolución temporal resuelvan un problema de optimización, ¿qué forma tendrían ?


## Afinidad local

El principio intuitivo detrás del descenso de gradiente es la búsqueda de un descenso _local_. Por lo tanto, necesitamos caracterizar el comportamiento local de la función que pretendemos optimizar. Para esto sirven los gradientes.

En esta entrada del blog, consideraré minimizar una función $f$ sobre $\mathbb{R}^N$. Suponiendo que $f$ es diferenciable, una expansión de Taylor de primer orden de $f$ alrededor de un punto $x$ conduce a
$$
f(x+y) = f(x) + y\cdot \nabla f(x) + O(\| y\|),
$$
para cualquier norma $\| \cdot \|$ en $\mathbb{R}^N$, donde $\nabla f(x) \in \mathbb{R}^N$ es el gradiente de $f$ en $x$, compuesto por las derivadas parciales de $f$. Por lo tanto, alrededor de $x$, $f$ es aproximadamente afín. 

Dado que tenemos una aproximación afín local alrededor de $x$, podemos buscar la dirección de descenso más pronunciado, es decir, el vector de norma unitaria $u \in \mathbb{R}^d$ tal que $u \cdot \nabla f(x)$ se minimiza. Esta dirección de descenso más pronunciado depende de la elección de la norma (suponiendo que el gradiente no sea cero en $x$).

Para la norma $\ell_2$, minimizar $u \cdot \nabla f(x)$ tal que $\|u\|_2 = 1$, conduce a 
$$
u = \ – \frac{\nabla f(x)}{ \| \nabla f(x) \|_2},
$$
es decir, el descenso más pronunciado es a lo largo del gradiente negativo (ver una ilustración a continuación). En esta entrada del blog me centraré solo en esta dirección de descenso más pronunciado.

Mientras que para la norma $\ell_1$, minimizar $u^\top \nabla f(x)$ tal que $\|u\|_1 = 1$, conduce a
$$
u \in\  – \arg\max_{ v \in \{-e_1,\, e_1,\, -e_2,\, e_2,\dots,\, -e_N,\, e_N \}} v^\top \nabla f(x),
$$

donde $e_i$ es el $i$-ésimo vector canónico de la base de $\mathbb{R}^N$. Aquí, el descenso más pronunciado es a lo largo de un eje coordenado (a lo largo del lado positivo o negativo), y esto lleva a varias formas de descenso coordinado.

## Del descenso al flujo

El descenso de gradiente es el algoritmo iterativo más clásico para minimizar funciones diferenciables. Toma la forma
$$
x_{n+1} = x_{n} \, – \gamma \nabla f(x_{n})
$$
$n$ etiqueta cada iteración y $\gamma > 0$ es un tamaño del paso, escencialmente mide la intensidad del cambio en cada iteración.


En esta entrada, para simplificar su análisis y preparar el escenario para futuras entradas, presentaré el flujo de gradiente, que es esencialmente el límite del descenso de gradiente cuando el tamaño de paso $\gamma$ tiende a cero.

Más precisamente, esto se obtiene considerando que nuestras iteraciones $x_n$ se muestrean en cada múltiplo de $\gamma$, a partir de una función $X: \mathbb{R}_+ \to \mathbb{R}^d$, como $x_n = X(n\gamma)$
Podemos entonces usar una interpolación afín a trozos para definir una función definida en todos los puntos. Tenemos entonces para $t = n\gamma$,
$
X(t + \gamma) = x_{n+1} =x_{n} \, – \gamma \nabla f(x_{n}) = X(t)\, – \gamma \nabla f(X(t))$. Dividiendo por $\gamma$, obtenemos
$$
\frac{1}{\gamma} \big[ X(t + \gamma) \, – X(t) \big] = \, – \nabla f(X(t)).
$$
Cuando $\gamma$ tiende a cero (y con supuestos de regularidad adicionales simples), el lado izquierdo tiende a la derivada de $X$ en $t$, y por lo tanto la función $X$ tiende a la solución de la siguiente ecuación diferencial ordinaria
$$
\dot{X}(t) = \ – \nabla f (X(t)).
$$

Estudiar el flujo de gradiente en lugar de las recurrencias del descenso de gradiente tiene pros y contras.

*   _Análisis simplificados_: El flujo de gradiente no tiene tamaño de paso, por lo que todos los problemas tradicionales molestos relacionados con la elección del tamaño de paso, con búsqueda de línea, constante, decreciente o con un esquema extraño, son innecesarios. 
*   _Del flujo (continuo) a algoritmos (discretos) reales_: Un flujo no puede ejecutarse en una computadora, ya que es un objeto de tiempo continuo. La discretización tradicional es el método de Euler, que reemplaza exactamente el flujo por una interpolación afín a trozos de las iteraciones de descenso de gradiente, donde, como se mostró anteriormente, vemos $x_n$ como $X(n\gamma)$, siendo $\gamma$ el incremento de tiempo entre dos muestras. Cuatro observaciones interesantes:
    1. _No hay transferencia directa de pruebas_: Aunque la discretización de Euler siempre proporciona un algoritmo, las pruebas de convergencia genéricas no permiten transferir inmediatamente las pruebas de tiempo continuo a resultados de convergencia para el análisis discreto. Una dificultad clave es establecer el tamaño de paso $\gamma$. Sin embargo, el análisis a menudo puede ser imitado, es decir, se pueden utilizar funciones de Lyapunov similares.
    2.   _Algoritmos proximales_: Ante funciones de gradiente no continuas, la versión _hacia adelante_ de la discretización de Euler $x_{n+1} = x_{n} – \gamma \nabla f(x_{n})$ puede ser reemplazada por la versión _hacia atrás_ $x_{n+1} = x_{n} \, –  \gamma \nabla f(x_{n+1}),$  que solo es implícita, ya que puede resolverse minimizando $f(x) + \frac{1}{2\gamma}\|x-x_{n}\|_2^2$, lo que conduce al algoritmo del punto proximal. Los esquemas forward-backward también pueden recuperarse cuando $f$ es la suma de un término suave y otro no suave.
    3. _Descenso de gradiente estocástico_: Hay dos maneras de tratar el descenso de gradiente estocástico, lo que lleva a dos límites continuos muy diferentes. Añadir ruido $\varepsilon_n$ independiente e idénticamente distribuido (para simplificar) de media cero al gradiente conduce a la recurrencia $x_{n+1} = x_{n} – \gamma \big[ \nabla f(x_{n}) + \varepsilon_n\big]$, donde el ruido se multiplica por el tamaño de paso $\gamma$. Tomar el límite cuando $\gamma$ tiende a cero conduce a la ecuación determinista del flujo de gradiente. La razón principal y "a grandes rasgos" es que la contribución del ruido se desvanece porque se multiplica por el tamaño de paso. 
    4. _Convergencia a una difusión de Langevin_: Cuando en su lugar se añade ruido con magnitud proporcional a la raíz cuadrada $\sqrt{2 \gamma}$ del tamaño de paso (que es asintóticamente mayor que $\gamma$), cuando $\gamma$ tiende a cero, y si la covarianza del ruido es la identidad, convergemos a un proceso de difusión que es la solución de una ecuación diferencial estocástica: $dX(t) = \ – \nabla f(X(t)) + \sqrt{2} dB(t),$
donde $B$ es un movimiento browniano estándar. Además, cuando $t$ tiende a infinito, $X(t)$ tiende en distribución a una variable aleatoria con densidad proporcional a $\exp( – f(x) )$. 


## Propiedades de los flujos de gradiente

El flujo de gradiente $\dot{X}(t) = \ – \nabla f (X(t)) $ está bien definido para una amplia variedad de condiciones sobre la función $f$. Las más clásicas son la continuidad de Lipschitz del gradiente o la semiconvexidad.

La propiedad más obvia es que la función disminuye a lo largo del flujo; en otras palabras, $f(X(t))$ es decreciente, lo cual es una consecuencia simple de

$$
\frac{d}{dt} f(X(t)) =  \frac{dX(t)}{dt}\cdot \nabla f(X(t)) =\  – \| \nabla f (X(t) )\|_2^2 \leqslant 0.
$$

Si $f$ está acotada inferiormente, entonces $f(X(t))$ siempre convergerá, pues se trata como una función no creciente que está acotada. Sin embargo, en general, $X(t)$ puede no converger siempre sin supuestos adicionales, por ejemplo, puede oscilar indefinidamente. Esto es, sin embargo, raro y existen diversas condiciones suficientes para la convergencia de los flujos de gradiente, que se remontan a Lojasiewicz y se basan en las desigualdades homónimas, que establecen que para $y$ y $x$ lo suficientemente cerca,

$$
|f(x) – f(y)|^{1-\theta} \leqslant C \| \nabla f(x)\|
$$

para algún $C > 0$ y $\theta \in (0,1)$. Estas se cumplen para "funciones subanalíticas", que incluyen la mayoría de las funciones que uno puede imaginar.

Una vez que $X(t)$ converge a algún $"X(\infty)"$, suponiendo que $\nabla f$ es continuo, debemos tener $"\nabla f(X(\infty))=0"$, es decir, $X(\infty)$ es un punto estacionario de $f$. Entre todos los puntos estacionarios (que pueden ser mínimos locales, máximos locales o puntos de silla), aquel al que converge $X(t)$ depende de $X(0)$. Típicamente, solo los mínimos locales son estables, es decir, las cuencas de atracción de otros puntos estacionarios tienen típicamente medida de Lebesgue cero.

## Aplicaciones a la optimización

Hay, al menos, dos preguntas clave en optimización relacionadas con los flujos de gradiente:

*   ¿Cuándo podemos tener garantías globales de convergencia? Es decir, ¿podemos asegurarnos de elegir un punto de inicialización lo suficientemente bueno como para obtener el óptimo global _sin saber dónde está el óptimo global_? Una dificultad clave es que el volumen de la cuenca de atracción del óptimo global puede ser arbitrariamente pequeño, incluso para funciones infinitamente diferenciables (imagine una función igual a cero en todas partes excepto en una pequeña bola donde es negativa).
*   ¿Qué tan rápido podemos llegar allí? "Allí" puede ser un punto estacionario o un óptimo global. Esta es una pregunta importante, ya que la mera convergencia en el límite puede ser arbitrariamente lenta.

Una clase importante de funciones son las funciones convexas, donde todo funciona muy bien. Las estudiaremos a continuación. Otras funciones se estudiarán en futuras entradas.

## Funciones convexas

Ahora asumimos que la función $f$ es convexa y diferenciable. En el aprendizaje automático, esto corresponde a funciones objetivo encontradas para el aprendizaje supervisado que se basan en la minimización del riesgo empírico con una función de predicción parametrizada linealmente, como la regresión logística.

Existen varias definiciones de convexidad, que se basan en propiedades globales la función está siempre "por debajo de sus cuerdas", o está siempre "por encima de sus tangentes" o propiedades locales (el Hessiano es siempre positivo semidefinido). La que necesitamos aquí es la de estar por encima de sus tangentes, es decir, para cualquier $x, y \in \mathbb{R}^N$, $f(x) \geqslant f(y)  +  ( x \, – y)\cdot\nabla f(y)$. 

Aplicar esto a cualquier punto estacionario $y$ tal que $\nabla f(y)=0$ muestra que para todo $x$, $f(x) \geqslant f(y)$, es decir, $y$ es un minimizador global de $f$. Este es el beneficio clásico de la convexidad: no hay necesidad de preocuparse por los mínimos locales.

Otra propiedad que necesitaremos es la desigualdad de Lojasiewicz, que se cumple en particular cuando $f$ es $\mu$-fuertemente convexa, es decir, $f – \frac{\mu}{2} \| \cdot \|_2^2$ es convexa:

$$
f(x) \ – f(x_\ast) \leqslant \frac{1}{2 \mu} \| \nabla f (x)\|^2,
$$
para cualquier minimizador $x_\ast$ de $f$ y cualquier $x$. Esta propiedad permite pasar de una cota sobre la norma del gradiente a una cota sobre los valores de la función. Entonces obtenemos la tasa de convergencia: 

$$
\begin{aligned}
\frac{d}{dt} \big[ f(X(t))\ – f(x_\ast) \big] &=  {X}(t)\cdot \nabla f(X(t)) \\
&=  
\ – \| \nabla f (X(t) )\|_2^2 \\
\frac{d}{dt} \big[ f(X(t))\ – f(x_\ast) \big] &\leqslant \ – 2\mu  \big[ f(X(t)) \ – f(x_\ast) \big]
\end{aligned}
$$ 

utilizando la desigualdad de Lojasiewicz anterior, lo que conduce a una integración simple de la derivada de $\log \big[ f(X(t)) \ – f(x_\ast) \big]$: 
$$
f(X(t)) \ – f(x_\ast) \leqslant \exp( – 2\mu t ) \big[ f(X(0))\  – f(x_\ast) \big],
$$
es decir, la convergencia es exponencial y el tiempo característico es proporcional a $1/\mu$.

El flujo de gradiente proporciona la idea principal (convergencia exponencial); y aplicando el resultado anterior a $t = \gamma n$, parece que recuperamos la tasa tradicional proporcional a $\exp( – \gamma \mu n)$. Sin embargo, esto solo es cierto asintóticamente para $\gamma$ tendiendo a cero, y demostrar un resultado para el descenso de gradiente requiere pasos adicionales para lidiar con tener un tamaño de paso constante. Esto requiere típicamente $\gamma \leqslant 1/L$, donde $L$ es la constante de suavidad de $f$, y la prueba más simple utiliza la misma estructura.

Sin convexidad fuerte, tenemos, utilizando la propiedad tangente en $X(t)$ y $x_\ast$: 
$$
\begin{aligned}
\frac{d}{dt}\big[   \| X(t)\ – x_\ast \|^2 \big] &= –   2 ( X(t)  – x_\ast )\cdot \nabla f(X(t)) \\
&\leqslant \ – 2 \big[ f(X(t)) \ – f(x_\ast) \big],
\end{aligned}$$
lo que conduce, integrando de $0$ a $t$, y utilizando la monotonicidad de $f(X(t))$: 
$$
\begin{aligned}
 f(X(t)) \ – f(x_\ast) &\leqslant \frac{1}{t} \int_0^t \big[ f(X(u)) \ – f(x_\ast) \big] du\\
 & \leqslant \frac{1}{2t} \| X(0) \ – x_\ast \|^2 \ – \frac{1}{2t} \| X(t) \ – x_\ast \|^2.
\end{aligned}
$$
Recuperamos las tasas habituales de $O(1/n)$, con $t = \gamma n$, con la misma advertencia que antes (el tamaño de paso debe estar acotado).





-----


## Referencias

1. Ambrosio, L., Gigli, N. & Savaré, G. _Gradient Flows in Metric Spaces and in the Space of Probability Measures_. Birkhäuser, 2008.
2. Absil, P.-A., Mahony, R. & Andrews, B. “Convergence of the Iterates of Descent Methods for Analytic Cost Functions.” _SIAM Journal on Optimization_ **16**(2), 531–547 (2005).
3. Łojasiewicz, S. “Sur les trajectoires du gradient d’une fonction analytique.” _Séminaire G. Choquet_, École Polytechnique (1983).




[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 