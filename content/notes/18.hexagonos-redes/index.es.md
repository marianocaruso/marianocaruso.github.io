---
title: "El hexágono y la red"
subtitle: "Seis formas de generar la misma red neuronal"
date: "2026-08-24"
showDate: false
summary: "Seis formas de generar la misma red"
draft: false
showReadingTime: false
tags: ["RNN", "sistemas dinámicos", "neurociencia computacional"]
math: true
---

{{< katex >}}




El hexágono pavimenta, dijo Jorge Wagensberg en su libro "La rebelión de las formas: o cómo perservar cuando la incertidumbre aprieta": a base de hexagonos podemos tejer redes. 
Existe otro contexto en el que otro hexágono y otra red aparecen juntos en escena: en el ámbito de las redes neuronales recurrentes, la conmutatividad entre el reescalado temporal, la discretización y la linearización queda formalmente caracterizada por el grupo simétrico S₃. Recientemente hemos probado que existe un la ecuación que regula la evolución de tales sistemas bajo cualesquiera dos de estas 3 operaciones es invariante, ver [Analyzing rescaling, discretization, and linearization in RNNs for neural system modeling](https://www.frontiersin.org/journals/computational-neuroscience/articles/10.3389/fncom.2026.1760701/full).




## Las seis avenidas del grupo S₃

Consideremos la ecuación que gobierna la capa oculta de una red recurrente en _tiempo continuo_ de $N$ neuronas impulsada por $M$ señales externas $x(t)$:

$$h'(t) = -\lambda h(t) + \sigma\left(W h(t) + \tilde{W} x(t) + b\right) (a) $$

que podemos abreviar mediante el operador del campo vectorial como $h'(t) = F(h(t), x(t))$. 

Para analizar este sistema en la práctica, recurrimos a computadoras y suelen aplicarse tres transformaciones fundamentales:

> 1. **Reescalado temporal ($\mathscr{R}_\tau$):** cambiamos la escala del tiempo mediante $t = \tau s$, lo que deforma la velocidad del sistema resultando en $\mathfrak{h}'(s) = \tau F(\mathfrak{h}(s), \chi(s))$.
> 2. **Discretización ($\mathscr{D}_\Delta$):** reemplazamos la derivada continua por una aproximación en diferencias finitas con paso $\Delta$ vía Forward Euler: $h(t_{k+1}) = h(t_k) + \Delta \cdot F(h(t_k), x(t_k))$.
> 3. **Linealización ($\mathscr{L}$):** asumiendo que el sistema opera en un régimen regular cerca del origen, aproximamos la activación no lineal por la identidad ($\sigma(\varphi) \mapsto \varphi$), obtenemos $h'(t) = A h(t) + B x(t) + b$, con $A = W - \lambda I$ y $B = \tilde{W}$.

La pregunta natural, que puede provenir de la duda neurótica de quien programa la simulación de estas redes, es si el orden en que aplicamos estas operaciones altera el producto final. Como las tres operaciones conmutan por pares: $(\mathscr{R}_\tau , \mathscr{D}_\Delta)$, $(\mathscr{D}_\Delta , \mathscr{L})$, $(\mathscr{L} ,\mathscr{R}_\tau )$, las seis permutaciones posibles del grupo simétrico S₃ sobre el conjunto $\{\mathscr{R}_\tau, \mathscr{D}_\Delta, \mathscr{L}\}$ colapsan en una regla de actualización única:

$$\mathfrak{h}(s_{k+1}) = (I + \tau \Delta A) \mathfrak{h}(s_k) + \tau \Delta B \chi(s_k) + \tau \Delta \cdot b \quad (b) $$ 

Si etiquetamos a las operaciones $\{\mathscr{R}_\tau,\mathscr{D}_\Delta ,\mathscr{L}\}$ con $\{1,2,3\}$, podemos esquematizar como es que estas 3 operaciones, que definen 6 rutas procedimientos posibles sobre la ecuación $(a)$ dan lugar a la misma ecuación $(b)$.

{{< tikz >}}
\begin{tikzpicture}[scale=1.2, transform shape, >=stealth, auto, node distance=2cm]
    % Nodos
    \node[text=red!80!black] (a) at (-0.02, 0.83) {$(a)$};
    
    % Doble barra invertida \\{ y \\} para que Hugo no las borre
    \node (left) at (-2.3, -0.51) {$\\{\mathbf{(1} \rightarrow \mathbf{2} \rightarrow \mathbf{3)}\\}$};
    \node (mid) at (0, -0.54) {$\cdots$};
    \node (right) at (2.3, -0.51) {$\\{\mathbf{(3} \rightarrow \mathbf{2} \rightarrow \mathbf{1)}\\}$};
    
    \node[text=blue!80!black] (b) at (0, -1.83) {$(b)$};

    % Flechas
    \draw[->, line width=1.2pt] (a) to[bend right=20] (left);
    \draw[->, line width=1.2pt] (a) -- (mid);
    \draw[->, line width=1.2pt] (a) to[bend left=20] (right);

    \draw[->, line width=1.2pt] (left) to[bend right=20] (b);
    \draw[->, line width=1.2pt] (mid) -- (b);
    \draw[->, line width=1.2pt] (right) to[bend left=20] (b);
\end{tikzpicture}
{{< /tikz >}}



## Por qué si Euler y no Runge-Kutta

Acá es donde conviene desmitificar un verso habitual en la comunidad de machine learning. Muchos asumen que usar integradores de orden superior (como Runge-Kutta de 4º orden, RK4) es siempre "mejor" porque reduce el error de truncamiento local.

Sin embargo, desde el punto de vista de la estructura algebraica, la conmutatividad exacta del hexágono es un privilegio exclusivo del esquema de Euler hacia adelante. ¿Por qué? Porque Euler evalúa el campo vectorial $F$ una sola vez por paso temporal.  Por el contrario, usar un método multipaso como el de Runge-Kutta implica realizar evaluaciones anidadas del tipo $F(F(\cdots))$ que introducen términos cruzados no lineales y de orden elevado. Al intentar linealizar *después* de discretizar con RK4, te encontrás con un engendro algebraico que no coincide con el sistema obtenido al discretizar el modelo ya linealizado. 

Usar un integrador sofisticado para entrenar una RNN continua a menudo solo sirve para multiplicar el costo computacional del Backpropagation Through Time (BPTT) y romper las simetrías algebraicas que te garantizan que el modelo discreto se comporta como el sistema biológico continuo.

## Controlabilidad intacta

Esta equivalencia operacional no es mero rigor estético; tiene consecuencias topológicas directas sobre la *controlabilidad* del sistema dinámico.

En redes neuronales donde el número de entradas es mucho menor que el número de neuronas ocultas ($M \ll N$), la capacidad de la red para explorar todo el espacio de estados $\mathbb{R}^N$ depende de la matriz de controlabilidad de Kalman:

$$\mathtt{C} = \begin{pmatrix} B & AB & A^2 B & \dots & A^{N-1} B \end{pmatrix}$$

Como las operaciones conmutan exactamente, el rango de $\mathtt{C}$ es estrictamente invariante bajo el reescalado temporal y la discretización. Si el sistema continuo es totalmente separable y controlable ($\mathrm{rank}(\mathtt{C}) = N$), la implementación discreta y linealizada jamás va a sufrir la aparición de "puntos ciegos" o subespacios inaccesibles creados por artefactos numéricos.

{{< alert icon="lightbulb" >}}
**Moraleja:** Si tenés una RNN entrenada en tiempo discreto y querés analizar sus atractores o adaptar la red a distintas velocidades temporales, no te gastes en re-entrenar el modelo durante largas horas de consumo computacional.
{{< /alert >}}