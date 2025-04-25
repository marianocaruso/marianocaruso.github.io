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

## Introducción

En este artículo analizamos la dinámica del flujo de gradiente definido por:

$$
 x'(t) = -\nabla f(x(t)),
$$

donde $x \in \mathbb{R}^n$ y $f:\mathbb{R}^n\to\mathbb{R}$ es una función de clase $C^1$. Examinaremos la relación entre las soluciones estacionarias de este sistema y los puntos críticos de $f$, así como su comportamiento a largo plazo y el impacto de la existencia de múltiples extremos en la dinámica.

## 1. Puntos estacionarios y puntos críticos

Un punto $x^*$ es estacionario si la derivada temporal se anula: $x'(t)=0$. De la ecuación de flujo de gradiente se deduce que $\nabla f(x^*)=0$. Por tanto, **los puntos estacionarios coinciden exactamente con los puntos críticos** de la función $f$.

## 2. Convergencia a largo plazo

La energía $f(x(t))$ decae a lo largo de las trayectorias según:

$$
\frac{d}{dt}f(x(t)) = \nabla f(x(t))\cdot x'(t) = -\|\nabla f(x(t))\|^2 \le 0.
$$

Bajo condiciones estándar para $f$, analiticidad y compacidad de los subniveles, la desigualdad de Łojasiewicz garantiza que $x(t)$ converge a un punto límite $x^*$ cuando $t$ tiende a $\infty$. Sin embargo, este punto límite puede ser un mínimo local, un máximo local o un punto de silla, dependiendo de la topología de $f$ y de la condición inicial.

## 3. Múltiples extremos y ausencia de bifurcaciones innatas

Si $f$ presenta varios mínimos locales, cada mínimo actúa como atractor asintótico con su propia cuenca de atracción. Las condiciones iniciales determinan en cuál atractor cae la trayectoria. En ausencia de parámetros externos que varíen en el sistema, **no se produce una bifurcación dinámica** interna: el sistema no cambia cualitativamente salvo al variar la función $f$ misma.

## 4. Referencias

1. Ambrosio, L., Gigli, N. & Savaré, G. _Gradient Flows in Metric Spaces and in the Space of Probability Measures_. Birkhäuser, 2008.
2. Absil, P.-A., Mahony, R. & Andrews, B. “Convergence of the Iterates of Descent Methods for Analytic Cost Functions.” _SIAM Journal on Optimization_ **16**(2), 531–547 (2005).
3. Łojasiewicz, S. “Sur les trajectoires du gradient d’une fonction analytique.” _Séminaire G. Choquet_, École Polytechnique (1983).





[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 