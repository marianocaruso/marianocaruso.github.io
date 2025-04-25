---

title: "Qubits particulares" # va al índice de notas
date: 2025-01-06
showDate: false
summary: "Representación de qubits en estados de  partículas"
# description: "nota 2" #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
tags: [quantum, qubits, spin states, orbital space]
math:  true  

---

{{< katex >}}


## Representación de qubits en estados de partícula


El qubit es el análogo cuántico del bit (acrónimo de binary-digit), la unidad fundamental clásica de información. Es un objeto matemático con propiedades específicas que pueden realizarse en un sistema físico real de muchas maneras diferentes. Al igual que el bit clásico tiene un estado, e.g. 0 o 1, un qubit también tiene un estado. Sin embargo, a diferencia del bit clásico, $|0\rangle$ y $|1\rangle$ son solo dos posibles estados del qubit, y cualquier combinación lineal (superposición) de ellos también es posible. En general, pues, el estado físico de un qubit es la superposición $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ (donde $\alpha$ y $\beta$ son números complejos). El estado de un qubit puede describirse como un vector en un espacio de Hilbert bidimensional, un espacio vectorial complejo. Los estados especiales $|0\rangle$ y $|1\rangle$ se conocen como los estados de la base computacional y forman una base ortonormal para este espacio vectorial. 
La realización física de estos qubits tiene lugar utilizando propiedades como el spin de las partículas (generalmente fermiones), la polarización de los fotones,... para conseguir dos estados base.

Ahora bien si tratamos con objetos cuya descripción físico-matemática completa comprende una parte espacial que suelen ser de dimensión infinita 

> ¿puede afectar esta descripción completa al intento de codificar estados tipo qubits de espacios de dimensión 2?

----

En el tratamiento de qubits se parte del hecho de que el estado completo de la partícula se describe en un espacio de Hilbert total que, en muchos sistemas físicos, es el producto tensorial de dos espacios: uno asociado a la parte orbital (generalmente de dimensión infinita) y otro a la parte interna (por ejemplo la parte de spin), que suele ser de dimensión 2. Formalmente, se tiene

\[\mathscr{H} = \mathscr{H}_{1} \otimes \mathscr{H}_{2},\]

donde \(\mathscr{H}_{1} = L^2(\mathbb{R}^3)\) y \(\mathscr{H}_{2} \sim \mathbb{C}^2.\)
La clave para trabajar exclusivamente con qubits (la parte de spin) reside en la separabilidad tanto del Hamiltoniano como de los estados. Bajo el supuesto de separabilidad del Hamiltoniano total \(H\), esto es

\[H = H_{1} \otimes I_{2} + I_{1} \otimes H_{2},\]
donde \(I_{1}\) e \(I_{2}\) son los operadores identidad en \(\mathscr{H}_{1}\) y \(\mathscr{H}_{2}\) respectivamente. Esto es válido cuando no existen términos de acoplamiento entre la parte orbital y el spin, o cuando tales acoplamientos son despreciables o pueden tratarse perturbativamente.

Si se prepara el sistema en un estado factorizable del tipo
\[|\phi(\pmb{x}), s\rangle = |\phi(\pmb{x})\rangle \otimes |s\rangle,\]
donde \(|\phi(\pmb{x})\rangle \in \mathscr{H}_{1}\) es la componente orbital en la posición \(\pmb{x}\)  y \(|s\rangle\) es un estado arbitrario en \(\mathscr{H}_{2} \sim \mathbb{C}^2\), la evolución temporal también se separa:

\[U(t) = U_{1}(t) \otimes U_{2}(t).\]

Si además \(|\phi(\pmb{x})\rangle\) es un autostado estacionario de \(H_{1}\), su evolución se reduce a una fase global, y la dinámica efectiva se concentra en la parte de spin:

\[|s(t)\rangle = U_{2}(t)\, |s\rangle.\]

Esta aproximación se justifica en la medida en que, en los dispositivos de qubits (por ejemplo, en sistemas de spin qubits en semiconductores o iones atrapados), la interacción que podría acoplar las variables orbitales y de spin es muy pequeña en comparación con las interacciones que afectan directamente al spin. De modo que, al fijar la parte orbital en un estado estacionario, se “congela” su contribución dinámica, permitiendo que el comportamiento cuántico relevante se describa únicamente en el subespacio \(\mathscr{H}_{2}\).

La separabilidad del Hamiltoniano y de los estados es, por tanto, el fundamento que permite “aislar” el qubit en una estructura bidimensional, lo que facilita la manipulación y el control en aplicaciones de computación cuántica.

En resumen, al preparar el sistema en un estado factorizable y considerar un Hamiltoniano que se separa como
\[H = H_{1} \otimes I_{2} + I_{1} \otimes H_{2},\]
se puede omitir o discriminar, vía factorización, la parte orbital y trabajar únicamente en el subespacio bidimensional isomorfo a \(\mathbb{C}^2\) para tratar con un qubit.








[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 
