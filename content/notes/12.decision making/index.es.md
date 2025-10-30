---

title: "¿A o B?" # va al índice de notas
date: 2025-08-05
showDate: false
summary: "Decisiones basadas en datos"
# description: "nota 2" #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
tags: [binary decision, conditional probability, mutual information, maxent, logistic distribution]
math:  true  

---


{{< katex >}}

## decisiones basadas en datos


### decisión dicotómica

Decidir es tomar partido por una lista de opciones y dado el número mínimo de opciones es 2, la decisión "más fundamental", en el sentido basal de la palabra, es de tipo binaria.

Quizá el método más rudimentario, para decidir entre las opciones excluyentes $A$ o $B$, puede resolverse haciendo una lista de $\mathtt{pros}$ y $\mathtt{conts}$, luego contabilizar $\mathtt{pros}(A)-\mathtt{conts}(A)$ y $\mathtt{pros}(B)-\mathtt{conts}(B)$ y tomar aquella opción que tenga el número más alto. Este método tiene limitaciones, pues depende del número y tipo de elementos de las listas para $A$ y $B$.

Queremos poner una regla de medir para decidir, una basada en una colección finita de valores $x_1,\cdots,x_n$. Formalicemos esta idea de la toma decisiones basada en los $n-$valores anteriores, sin presuponer qué cosas son y qué valores toman, solo concebirlas como variables aleatorias $X_1,\cdots,X_n$ de valores que determinan a lo sumo una probabilidad de elegir una de las dos opciones $Y\in \{0,1\}$, definimos por $p(\pmb{x})=P(Y=1|\pmb{X}=\pmb{x})$, donde $\pmb{X}=(X_1,\cdots,X_n)$ y $\pmb{x}=(x_1,\cdots,x_n)$, como $Y$ es dicotómica, luego $1-p(\pmb{x})=P(Y=0|\pmb{X}=\pmb{x})$, notar que si $X$ es un vector de variables aleatorias continuas entonces $P(X=x)=0$, no obstante tiene sentido pensar y escribir $P(Y|X=x)$. De hecho, podríamos esbozar un principio rudimentario de decisión dicotómica que utilice a $p(\pmb{x})$ como sigue 

> $p(\pmb{x})<0.5$ elijo $Y=0$

> $p(\pmb{x})>0.5$ elijo $Y=1$

En cualquier caso hemos pasado de decidir basado en un lista de pros y contras a utilizar una medida de probabilidad como decisor: por tanto necesitamos encontrar o construir dicha cantidad. En teoría de la información se puede formalizar el concepto de incorporar la "data" que proviene de haber fijado $\pmb{X}$ en $\pmb{x}$, y evaluar cómo cambia la información que se tiene de $Y$ condicionada por esa "data". Haciendo uso de la información condicionada $H(Y|\pmb{X})$ y de la información ganada o mutua $H(Y)-H(Y|\pmb{X})$ es posible contestar a la pregunta sobre cuál es la distribución de probabilidad $p(\pmb{x})$ óptima, i.e. aquella que maximiza dicha información, de manera que poder utilizarla como decisor. Veremos 5 formas de aproximar esta búsqueda

### toma 1

Calculemos $H(Y)=-p\log (p)-(1-p)\log (1-p)$. Podemos buscar aquella $p(\pmb{x})$ tal que se maximice la información ganada $H(Y)-H(Y|\pmb{X}=\pmb{x})=I$, que será una función de $\pmb{x}$. Buscamos sus puntos críticos: $\partial_{\pmb{x}}I(\pmb{x})=0$, se obtiene $d_pH(Y)\partial_{\pmb{x}}p(\pmb{x})-\partial_{\pmb{x}}H(Y|\pmb{X}=\pmb{x})=0$, como $d_pH(Y)=-\log\left(\dfrac{p}{1-p}\right)$, se obtiene 
$$
\log\left(\dfrac{p}{1-p}\right)=-\dfrac{\partial_{\pmb{x}}H(Y|\pmb{X}=\pmb{x})}{\partial_{\pmb{x}}p(\pmb{x})}
$$
$p(\pmb{x})/[1-p(\pmb{x})]$ es el cociente entre obtener $Y=1$ y obtener $Y=0$, condicionada a la información $\pmb{X}=\pmb{x}$.

Si denotamos por $F(\pmb{x})=-\dfrac{\partial_{\pmb{x}}H(Y|\pmb{X}=\pmb{x})}{\partial_{\pmb{x}}p(\pmb{x})}$, de  $\log\left(\dfrac{p(\pmb{x})}{1-p(\pmb{x})}\right)=F(\pmb{x})$, se obtiene 

$$
p(\pmb{x})=\dfrac{1}{1+e^{-F(\pmb{x})}}
$$

Si $F(\pmb{x})=w_0+w_1x_1+\cdots+w_nx_n$ es una función lineal $p(\pmb{x})$ toma la forma de una distribución logística multivariada

$$
p(\pmb{x})=\dfrac{1}{1+e^{-\sum_{k=0}^nw_kx_k}}
$$
donde $x_0=1$.

También podría tomarse de $d_pH(Y)\partial_{\pmb{x}}p(\pmb{x})-\partial_{\pmb{x}}H(Y|\pmb{X}=\pmb{x})=0$, una ecuación diferencial para $p$ pues como $d_pH(Y)=-\log\left(\dfrac{p}{1-p}\right)$, entonces 

$$
\log\left[\dfrac{p(\pmb{x})}{1-p(\pmb{x})}\right]\partial_{\pmb{x}}p(\pmb{x})=-\partial_{\pmb{x}}H(Y|\pmb{X}=\pmb{x})
$$

### toma 2

Notar que $H(Y)$ debería definirse con parámetro $p_Y=P(Y=1)=\int_\mathscr{X} P(Y=1|\pmb{X}=\pmb{x})P_{\pmb{X}}(\pmb{x}) d\pmb{x}$, donde $p(\pmb{x}):=P(Y=1|\pmb{X}=\pmb{x})$, luego $p_Y$ no depende de $\pmb{x}$. Se sigue entonces que 
$$
H(Y):=-p_Y\log(p_Y)-(1-p_Y)\log(1-p_Y)
$$ 
donde $p_Y=\int_\mathscr{X} p(\pmb{x})P_{\pmb{X}}(\pmb{x}) d\pmb{x}$. 

$H(Y)$ depende de $p(\pmb{x})$ pero no depende de $\pmb{x}$. De hecho si dependiera de $\pmb{x}$ sería raro porque no está supeditada a $\pmb{x}$, pues eso se consigue con $H(Y|\pmb{X})$. 


Si quisiera encontrar la distribución $p(\pmb{x})$ tal que se maximice la información ganada, no debería tomar variaciones respecto de $\pmb{x}$ sino sobre las distribuciones, es decir, no recurrir al cálculo sobre funciones sino sombre funcionales.


 
Con lo cual cuando quiera maximizar la información ganada (información mutua) $H(Y)-H(Y|\pmb{X})$ variando $\pmb{x}$ eso equivale a minimizar la entropía condicional $H(Y|\pmb{X})$. 


En cualquier caso la **entropía condicional** $H(Y | \pmb{X})$ se define como el valor esperado de la entropía de $Y$ condicionada a cada valor posible de $\pmb{X}$:

$$
H(Y \mid \pmb{X}) := \mathbb{E}_{\pmb{X}}[H(Y \mid \pmb{X} = \pmb{x})].
$$
Como $Y$ es discreta y $\pmb{X}$ continua, la forma **explícita** es:

$$
H(Y \mid \pmb{X}) = - \int_{\mathscr{X}} \sum_{y \in \mathscr{Y}} P(Y = y \mid \pmb{X} = \pmb{x}) \log P(Y = y \mid \pmb{X} = \pmb{x}) \cdot P_{\pmb{X}}(\pmb{x})\, d\pmb{x}
$$
para el caso binario $Y \in \{0,1\}$, entonces, si denotamos:

* $p(\pmb{x}) = P(Y = 1 \mid \pmb{X} = \pmb{x})$,
* $1 - p(\pmb{x}) = P(Y = 0 \mid \pmb{X} = \pmb{x})$,
* $P_{\pmb{X}}(\pmb{x})$ es la densidad de $\pmb{X}$,

la entropía condicional se convierte en:

$$
H(Y \mid \pmb{X}) = - \int_{\mathscr{X}} \left[ p(\pmb{x}) \log p(\pmb{x}) + (1 - p(\pmb{x})) \log (1 - p(\pmb{x})) \right] \cdot P_{\pmb{X}}(\pmb{x})\, d\pmb{x}
$$



La entropía condicionada en un punto específico $\pmb{x}$ es 
$$
  H(Y \mid \pmb{X} = \pmb{x}) = - p(\pmb{x}) \log p(\pmb{x}) - [1 - p(\pmb{x})] \log (1 - p(\pmb{x})),
$$

> Es decir $H(Y \mid \pmb{X}) = \mathbb{E}_{\pmb{X}}[H_{b}(p(\pmb{X}))]$, donde $H_{b}(p) := -p \log p - (1-p) \log(1-p)$ es la entropía binaria.

> * Esta expresión **no** se puede escribir simplemente como una función de $p_Y$, ni se puede derivar respecto de $\pmb{x}$ sin cuidado, porque es una integral.


La información mutua o información ganada $I(p)=H(Y)-H(Y|\pmb{X})$, pues ambas cantidades dependen de $p(\pmb{x})$.

Si bien $H(Y|\pmb{X})$ es un funcional local de $p(\pmb{x})$, pues se puede escribir como la integral en $\pmb{x}$ que contiene a $p(\pmb{x})$, no ocurre lo mismo con $H(Y)=-p_Y\log(p_Y)-(1-p_Y)\log(1-p_Y)$ que no puede escribirse así, pues la integral de $p(\pmb{x})$ está repartida en cada $p_Y$ de $H(Y)$. 



### toma 3 - MaxEnt  $P(Y=1|\pmb{X}=\pmb{x})$


Queremos determinar la distribución condicional $p(\pmb{x}) := P(Y=1 \mid \pmb{X} = \pmb{x})$ que maximiza la entropía condicional de $Y$ dado $\pmb{X}$, i.e. la información de $Y$ condicionada por $\pmb{X}$, bajo ciertas restricciones de valor esperado.


#### entropía condicional

Como $Y \in \{0,1\}$, la entropía condicional de $Y$ dado $\pmb{X} = \pmb{x}$ es:

$$
H(Y |\pmb{X}=\pmb{x}) = - p(\pmb{x}) \log p(\pmb{x}) - (1 - p(\pmb{x})) \log (1 - p(\pmb{x}))
$$

Queremos maximizar la entropía esperada:

$$
H(Y \mid \pmb{X}) = \mathbb{E}_{\pmb{X}} [H(Y \mid \pmb{X} = \pmb{x})]
$$

Imponemos restricciones sobre el valor esperado de ciertas funciones $f_k(\pmb{x})$, a través de la esperanza:

$$
\mathbb{E}_{\pmb{X}} [p(\pmb{x}) f_k(\pmb{x})] \geq \mu_k \quad \text{para } k=1, \dots, m
$$

Definimos el funcional $\mathscr{F}$

$$
\mathscr{F}[p(\pmb{x})] = \mathbb{E}_{\pmb{X}} \left[ -p(\pmb{x}) \log p(\pmb{x}) - (1 - p(\pmb{x})) \log (1 - p(\pmb{x})) \right] +\sum_{k=1}^m \lambda_k \left( \mathbb{E}_{\pmb{X}} [p(\pmb{x}) f_k(\pmb{x})-\mu_k ] \right)
$$

Para encontrar el máximo, derivamos funcionalmente con respecto a $p$, e igualamos a cero:

$$
\delta_{p} \mathscr{F}= -\log p(\pmb{x}) + \log(1 - p(\pmb{x})) + \sum_k \lambda_k f_k(\pmb{x}) = 0
$$

Lo que implica:

$$
\log \left( \frac{1 - p(\pmb{x})}{p(\pmb{x})} \right) = -\sum_k \lambda_k f_k(\pmb{x})
$$

Es decir:

$$
\frac{1 - p(\pmb{x})}{p(\pmb{x})} = \exp\left(- \sum_k \lambda_k f_k(\pmb{x}) \right)
$$

$$
p(\pmb{x}) = \frac{1}{1 + \exp\left(- \sum_k \lambda_k f_k(\pmb{x}) \right)}
$$
también puede escribirse como  $p(\pmb{x}) = \sigma\left( \sum_k \lambda_k f_k(\pmb{x}) \right)$, donde $\sigma$ es la función sigmoide $\sigma(z) := 1/(1 + e^{-z})$.


La solución al problema de máxima entropía condicional bajo las restricciones da com resultado  una **distribución logística generalizada**:

$$
P(Y=1 \mid \pmb{X} = \pmb{x}) = \frac{1}{1 + \exp\left( -\sum_k w_k f_k(\pmb{x}) \right)}
$$




----

### toma 4 MaxEnt  $P(Y=y|\pmb{X}=\pmb{x})$

Podemos generalizar el resultado anterior para el caso en que se tenga una cantidad numerable de opciones excluyentes para la variable $Y$.
 
Buscamos la distribución condicional $p(y|\pmb{x})=P(Y=y|\pmb{X}=\pmb{x})$, también denotada genéricamente por $\varphi(\pmb{x},y)$, que maximiza la entropía condicional

$$
H(Y \mid \pmb{X}) = -\int_{\mathscr{X}} P_{\pmb{X}}(\pmb{x}) \sum_y \varphi(\pmb{x},y) \log [\varphi(\pmb{x},y)] \, d\pmb{x}
$$

sujeta a las siguientes restricciones:

1. Normalización: $\sum_y \varphi(\pmb{x},y) = 1 \quad \forall \pmb{x}$

2. Restricciones de momento conjunto $(\pmb{X},Y)$
$$
\int_{\mathscr{X}} P_{\pmb{X}}(\pmb{x})\sum_y \varphi(\pmb{x},y) g_k(\pmb{x}, y) \, d\pmb{x} \geq \mu_k  \quad \forall k
$$

Construimos ahora el funcional $\mathscr{F}$ como 

$$
\mathscr{F}[\varphi(\pmb{x},y)] = -\int_{\mathscr{X}} P_{\pmb{X}}(\pmb{x}) \sum_y \varphi(\pmb{x},y) \log \varphi(\pmb{x},y) \, d\pmb{x} + \sum_k \lambda_k \left(\int_{\mathscr{X}} P_{\pmb{X}}(\pmb{x}) \sum_y \varphi(\pmb{x},y) g_k(\pmb{x}, y) \, d\pmb{x} - \mu_k \right) +\int_{\mathscr{X}}P_{\pmb{X}}(\pmb{x}) \eta(\pmb{x}) \left( \sum_y \varphi(\pmb{x},y) - 1 \right) \, d\pmb{x}
$$
> **notar** que el término $\eta(\pmb{x})$ aparece porque estamos resolviendo un problema de optimización funcional, y necesitamos garantizar que para cada valor de $\pmb{x}$ se cumpla la restricción de normalización: $
\sum_y p(y \mid \pmb{x}) = 1 \quad \text{para todo } \pmb{x}.$ Esta es una restricción para cada $\pmb{x}$, entonces no podemos usar un solo multiplicador de Lagrange global, como en problemas finito-dimensionales, necesitamos usar un multiplicador funcional $\eta(\pmb{x})$, que es una función definida sobre el espacio de $\pmb{x}$, para imponer esta restricción punto a punto. Formalmente: si tenemos una familia de restricciones parametrizadas por $\pmb{x}$, como 
$F(\pmb{x}) := \sum_y p(y \mid \pmb{x}) - 1 = 0 \quad \forall \pmb{x}$, entonces el término de Lagrange asociado es: 
$\int P_{\pmb{X}}(\pmb{x}) \eta(\pmb{x}) \left( \sum_y p(y \mid \pmb{x}) - 1 \right) d\pmb{x}.$

---

 
Calculamos la derivada funcional respecto de $p(y \mid \pmb{x})$:

$$
\delta_{\varphi} \mathscr{F} = -\log \varphi(\pmb{x},y) - 1 + \sum_k \lambda_k g_k(\pmb{x}, y) + \eta(\pmb{x})
$$

Igualamos a cero:

$$
\log \varphi(\pmb{x},y) = -1 + \eta(\pmb{x}) +\sum_k \lambda_k g_k(\pmb{x}, y)
$$

$$
\varphi(\pmb{x},y) = \exp\left( -1 + \eta(\pmb{x}) + \sum_k \lambda_k g_k(\pmb{x}, y) \right)
$$
Definimos $Z(\pmb{x}) = \exp[1-\eta(\pmb{x})]$


como $\sum_y \varphi(\pmb{x},y) = 1$ luego  $\sum_y\exp\left( -1 + \eta(\pmb{x}) + \sum_k \lambda_k g_k(\pmb{x}, y) \right)=1$, luego la función $Z$ toma la forma $Z(\pmb{x}) = \sum_{y} \exp\left[\sum_k \lambda_k g_k(\pmb{x}, y) \right]$.

Entonces:
$$
\varphi(\pmb{x},y) = \frac{1}{Z(\pmb{x})} \exp\left( \sum_k \lambda_k g_k(\pmb{x}, y) \right)
$$

Esta es la forma general de un modelo MaxEnt condicional. Los multiplicadores $\lambda_k$ se determinan ajustando las expectativas del modelo a las empíricas.

si
si $g_k(\pmb{x},y)=y\cdot f_k(\pmb{x})$ se tiene 
$$
\varphi(\pmb{x},y)=
\frac{\exp\left[ y \sum_k\lambda_k f_k(\pmb{x}) \right]}{1+\exp\left[\sum_k\lambda_k f_k(\pmb{x}) \right]} 
$$

si $f_k(\pmb{x})=x_k$ se tiene la distribución logística
$$
\varphi(\pmb{x},y)=
\frac{\exp\left( y \pmb{\lambda}\cdot \pmb{x} \right)}{1+\exp\left( \pmb{\lambda}\cdot \pmb{x} \right)} 
$$
donde $\pmb{\lambda}=(\lambda_1,\cdots,\lambda_n)$.


---

> **notar** que la función $f(\pmb{x})=\frac{1}{1+\exp[-F(\pmb{x})]}$, se puede escribir 
 usando la función sigmoide como $f(\pmb{x})=\sigma(F(\pmb{x}))$, definida por $\sigma(z):= 1/(1 + e^{-z})$, y como $\sigma'(z)=\sigma(z)[1-\sigma(z)]$ se tiene que $\nabla f(\pmb{x})=f(\pmb{x})[1-f(\pmb{x})]\nabla F(\pmb{x})$

> para el caso logístico $f(\pmb{x})=\frac{1}{1+\exp[-\sum_k\omega_k x_k)]}$, $\nabla f(\pmb{x})=-f(\pmb{x})[1-f(\pmb{x})]\pmb{\omega}$

 
---

### toma 5 

Otra manera más directa y bastante general de abordar el problema consiste en tratar con una variable aleatoria $Z$ real definida a partir de las cantidades $\pmb{x}$ que habíamos considerado como resultado de un vector aleatorio $\pmb{X}$, en este caos las consideramos fijas. La aleatoriedad es introducida vía una fluctuación aditiva $\xi$: $Z=\phi(\pmb{x})+\xi$.

La variable aleatoria dicotómica $Y$ queda definida según el umbral $Z$ 
$$
Y = 
\begin{cases}
1 & \text{si } Z > 0 \\
0 & \text{si } Z \leq 0
\end{cases}
$$

Entonces, la probabilidad condicional de $Y$ dado $\pmb{X}=\pmb{x}$ es: $P(Y = 1 | \pmb{X}=\pmb{x}) = P(Z > 0) = P(\xi > -\phi(\pmb{x})) = 1 - F_\xi(-\phi(\pmb{x}))$, donde $F_\xi(\chi):=P(\xi\leq \chi)$ es la función de distribución acumulada de $\xi$. Aquí es donde entra en juego el modelo de error que se quiera usar, si $\xi\sim \mathtt{logistic}(\mu,s)$, la forma de la distribución acumulada tiene el aspecto de S que se pretende. Luego $F_\xi(\chi)=1/(1+e^{-(\chi-\mu)/s})$, podría usar, en particular para modelar el error corresponde $\mu=0$, para permitir fluctuaciones simétricas, como $1 - F_\xi(-\phi(\pmb{x}))=1/(1+e^{-\phi(\pmb{x})/s})$, entnces 

$P(Y = 1 | \pmb{X}=\pmb{x})=1/(1+\exp[{-\phi(\pmb{x})/s})]$

Si $\phi(\pmb{x})=\pmb{\lambda}\cdot\pmb{x}$, queda la pregunta de cómo obtener o estimar $\pmb{\lambda}$.



#### función de verosimilitud

Dados datos observados $(\pmb{x}_1, y_1), \dots, (\pmb{x}_n, y_n)$ con $\pmb{x}_i$ fijos y $y_i \in (0,1)$, la verosimilitud es:

$$
L(\pmb{\lambda}) = \prod_{i=1}^n \left( \frac{1}{1 + e^{-\pmb{\lambda}\cdot \pmb{x}_i}} \right)^{y_i} \left( \frac{1}{1 + e^{\pmb{\lambda}\cdot\pmb{x}_i}} \right)^{1 - y_i}
$$

#### estimación de máxima verosimilitud

El estimador $\hat{\pmb{\lambda}}$ es solución de:

$$
\hat{\pmb{\lambda}} = \arg\max_{\pmb{\lambda}} \; \log L(\pmb{\lambda})
= \arg\max_{\pmb{\lambda}} \; \sum_{i=1}^n \left[ y_i \log \sigma(\pmb{\lambda}\cdot \pmb{x}_i) + (1 - y_i) \log (1 - \sigma(\pmb{\lambda}\cdot\pmb{x}_i)) \right]
$$

donde $\sigma(z) = 1/(1 + e^{-z})$.


[{{< spotify type="album" id="5iT3F2EhjVQVrO4PKhsP8c?" width="100%" height="160" >}}]:#
[esto coloca un reproductor de muestras de spotify dado el id de la carpeta de spotify]:# 



[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 
