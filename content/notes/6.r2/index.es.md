---

title: "Métrica para regresión" # va al índice de notas
date: 2025-01-05
showDate: false
summary: "Comentario sobre métricas tipo cociente"
# description: "nota 2" #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
tags: [regression, metrics]
math:  true  

---

{{< katex >}}


# comentario sobre $R^2$ y cociente de varianzas


En el análisis de datos y la modelización predictiva, el coeficiente de determinación $R^2$ es una de las métricas más populares para evaluar qué tan bien un modelo se ajusta a los datos. Pero, ¿qué significa realmente este valor y cómo debemos interpretarlo? En esta entrada, desglosaremos su definición, su cálculo y las implicaciones que tiene en contextos como la regresión lineal y más allá.



Supongamos unos datos $\{y_i\}_{i\in I_N}$, con media aritmética $\bar{y}$ y un modelo que realiza predicciones para cada dato $\{\hat{y_i}\}_{i\in I_N}$, donde $I_N:=\{1,\cdots, N\}\subset \mathbb{N}$. El coeficiente de determinación \( R^2 \) se define como:

{{< alert "def" >}}
$$ R^2:=1-\dfrac{\sum_{i\in I_N}(y_i-\hat{y}_i)^2}{\sum_{i\in I_N}(y_i-\bar{y})^2} $$
{{< /alert>}}


el numerador de la fracción es es la suma de los cuadrados de los residuos y es proporcional al error cuadrático medio sobre los elementos de $I$ y el denominador es proporcional a la variación de la muestra $\{y_i\}_{i\in I_N}$, que mide su variabilidad respecto a la media $\bar{y}$.

En términos simples, $R^2$ nos dice qué proporción de la variabilidad de los datos es explicada por el modelo.

## interpretando los valores de \( R^2 \)

El valor de \( R^2 \) puede variar bastante, y su interpretación depende del contexto:

- **\( R^2 = 1 \)**: el modelo predice perfectamente los datos (\( y_i = \hat{y}_i \)), lo que implica que el error cuadrático medio es cero. ¡Un caso ideal pero raro en la práctica!
- **\( R^2 = 0 \)**: el modelo no explica ninguna variabilidad; es tan bueno como usar la media \( \bar{y} \) como predictor.
- **\( R^2 < 0 \)**: sorprendentemente, esto es posible. Significa que el modelo es peor que simplemente usar la media, ya que el error cuadrático medio supera la varianza muestral de los datos.

Se espera que un buen modelo tenga $R^2$ entre $0$ y $1$, Un valor negativo indica que las predicciones son tan malas que sería mejor y más eficiente ignorar ese modelo y usar $\bar{y}$.

----



Analicemos la estructura matemática de $R^2$: $1-(A/B)^2$. Por definición $(A/B)^2\geq 0$. 

a. el caso en que $(A/B)^2=0$, con $B$ finito, implica que $A=0$. 

b. Separemos el caso restante $(A/B)^2>0$, en dos: 

1. $(A/B)^2 \in (0,1]$, es lo deseable y si el modelo es bueno es lo esperable en la práctica.
2. $(A/B)^2 \in (1,\infty)$, en ese caso el error cuadrático medio entre los datos $\{y_i\}_{i\in I_N}$ y las predicciones $\{\hat{y}_i\}_{i\in I_N}$ es mayor (osea peor) que la propia fluctuación de los datos $\{y_i\}_{i\in I_N}$ respecto de su media $\hat{y}$, i.e. su varianza muestral, osea sería mejor reemplazar el modelo y sus predicciones $\hat{y}_i$, por una lisa y llana $\bar{y}$, porque lo hace mejor. 

Los casos que "hablan bien" del modelo son tales que $R^2 \in [0,1]$, pero cabe la posibilidad de que $R^2<0$, en ese caso el modelo elegido provee predicciones peores que tomar la media aritmética de los datos.

## $R^2$ puede ser negativo

En general $R^2$ no es siempre positivo.  Veamos qué implica que $R^2<0$: $\sum_{i\in I_N}(y_i-\hat{y}_i)^2>\sum_{i\in I_N}(y_i-\bar{y})^2$, es decir el error cuadrático medio es mayor a la varianza muestral.

Independientemente de la definición de $R^2$, veamos la relación entre las sumas de $(y_i-\bar{y})^2$, $(\hat{y}_i-\bar{y})^2$ y $(y_i-\hat{y}_i)^2$.


---

Usamos el hecho de que podemos escribir cada diferencia $y_i - \bar{y}$ como la suma de dos términos:

$$
y_i - \bar{y} = \bigl(y_i - \hat{y}_i\bigr) + \bigl(\hat{y}_i - \bar{y}\bigr).
$$


Elevamos al cuadrado ambos lados:

$$
(y_i - \bar{y})^2 = \Bigl[(y_i - \hat{y}_i) + (\hat{y}_i - \bar{y})\Bigr]^2.
$$

Utilizando la identidad \((a+b)^2 = a^2 + b^2 + 2ab\), obtenemos:

$$
(y_i - \bar{y})^2 = (y_i - \hat{y}_i)^2 + (\hat{y}_i - \bar{y})^2 + 2\,(y_i - \hat{y}_i)(\hat{y}_i - \bar{y}).
$$

Sumando sobre $i\in I$:
$$
\sum_{i\in I_N}(y_i - \bar{y})^2 = \sum_{i\in I_N} [(y_i - \hat{y}_i)^2 +  (\hat{y}_i - \bar{y})^2 + 2 (y_i - \hat{y}_i)(\hat{y}_i - \bar{y})].$$

Denotemos por $\lambda=2\sum_{i\in I_N} (y_i - \hat{y}_i)(\hat{y}_i - \bar{y})$.


En los modelos de regresión lineal, suele cumplirse cierta ortogonalidad entre los residuos $y_i - \hat{y}_i$ y las predicciones centradas en $\bar{y}$ $(\hat{y}_i - \bar{y})$: 

$$\sum_{i\in I_N} (y_i - \hat{y}_i)(\hat{y}_i - \bar{y}) = 0,$$

en particular: 
- $\sum_{i\in I_N} (y_i - \hat{y}_i)\hat{y}_i = 0$, por la ortogonalidad de los residuos con las predicciones  
- $\sum_{i\in I_N} y_i - \hat{y}_i = 0$ porque el modelo ajusta una intersección, de modo que los residuos tienen media cero.

Sustituyendo en la suma obtenida:
$$
\sum_{i\in I_N}(y_i - \bar{y})^2 = \sum_{i\in I_N} (y_i - \hat{y}_i)^2 + \sum_{i\in I_N} (\hat{y}_i - \bar{y})^2 + \lambda,
$$
entonces nos queda
$$
R^2=\dfrac{\sum_{i\in I_N}(\hat{y}_i-\bar{y})^2+\lambda}{\sum_{i\in I_N}(y_i-\bar{y})^2},
$$
el signo de $\lambda$ no está definido, si $\lambda<0$ y en valor absoluto mayor que $\sum_{i\in I}(\hat{y}_i-\bar{y})^2$ se tiene que $R^2<0$.


Si $\bar{\hat{y}}=\bar{y}$, osea: $\sum_{i\in I_N} (y_i-\hat{y}_i)=0$, entonces podemos considerar a $\sum_{i\in I_N}(y_i-\bar{y})^2$ como algo proporcional a la **varianza muestral** de las predicciones $\hat{y}$. En este caso podríamos deducir que $\lambda$ toma la forma reducida de $\lambda=2\sum_{i\in I_N} (y_i - \hat{y}_i)(\hat{y}_i - \bar{y})$ luego $\lambda=2\sum_{i\in I_N} (y_i - \hat{y}_i)\hat{y}_i - 2\sum_{i\in I_N} (y_i - \hat{y}_i)\bar{y}$, finalmente $\lambda=2\sum_{i\in I_N} (y_i - \hat{y}_i)\hat{y}_i$.

Ahora bien $\bar{\hat{y}}=\bar{y}$, es válido para un modelo de regresión lineal y no es valido en general para otros casos. Con lo cual no es válido en general asociar $R^2$ con el cociente de la varianza de $\hat{y}$ y la varianza de $y$. 

Conviene seguir usando la definición original y reescribirla de manera compacta como 
{{< alert "def" >}}
$$ R^2=1-\frac{e(y,\hat{y})}{\mathtt{Var}(y)} $$
{{< /alert>}}
donde $e(y,\hat{y})=N^{-1}\cdot\sum_{i\in I_N}(y_i-\hat{y}_i)^{2}$ y $\mathtt{Var}(y)=N^{-1}\cdot\sum_{i\in I_N}(y_i-\bar{y})^{2}$, una forma de definir la varianza muestral.


## conclusión

El coeficiente de determinación $R^2$ es una herramienta esencial para evaluar modelos predictivos, pero no es una varita mágica. Al entender su definición, su relación con las sumas de cuadrados y sus limitaciones, podemos usarlo de manera más informada. Ya sea en regresión lineal o en contextos más amplios, combinar $R^2$ con otras métricas y validaciones nos dará una visión más completa del rendimiento de nuestros modelos.





[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 
