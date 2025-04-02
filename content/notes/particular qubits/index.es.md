---

title: "Qubits particulares" # va al índice de notas
date: 2025-01-03
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



En el tratamiento de qubits se parte del hecho de que el estado completo de la partícula se describe en un espacio de Hilbert total que, en muchos sistemas físicos, es el producto tensorial de dos subespacios: uno asociado a la parte orbital (generalmente de dimensión infinita) y otro a la parte interna (spin), que es de dimensión 2. Formalmente, se tiene

\[\mathscr{H} = \mathscr{H}_{\mathrm{orbital}} \otimes \mathscr{H}_{\mathrm{spin}},\]

donde \(\mathscr{H}_{\mathrm{orbital}} = L^2(\mathbb{R}^3)\) y \(\mathscr{H}_{\mathrm{spin}} \sim \mathbb{C}^2.\)
La clave para trabajar exclusivamente con qubits (la parte de spin) reside en la separabilidad tanto del Hamiltoniano como de los estados. En muchos contextos experimentales, el Hamiltoniano total \(H\) puede descomponerse en dos términos que actúan de forma independiente en cada subespacio:

\[H = H_{\mathrm{orbital}} \otimes I_{\mathrm{spin}} + I_{\mathrm{orbital}} \otimes H_{\mathrm{spin}},\]
donde \(I_{\mathrm{orbital}}\) e \(I_{\mathrm{spin}}\) son los operadores identidad en \(\mathscr{H}_{\mathrm{orbital}}\) y \(\mathscr{H}_{\mathrm{spin}}\) respectivamente. Esto es válido cuando no existen términos de acoplamiento entre la parte orbital y el spin, o cuando tales acoplamientos son despreciables o pueden tratarse perturbativamente.

Si se prepara el sistema en un estado factorizable del tipo
\[|\pmb{x}, s\rangle = |\phi(\pmb{x}) \otimes |s\rangle,\]
donde \(|\phi(\pmb{x}\rangle \in \mathscr{H}_{\mathrm{orbital}}\) es la componente orbital en la posición \(\pmb{x}\)  y \(|s\rangle\) es un estado arbitrario en \(\mathscr{H}_{\mathrm{spin}} \sim \mathbb{C}^2\), la evolución temporal también se separa:
\[U(t) = U_{\mathrm{orbital}}(t) \otimes U_{\mathrm{spin}}(t).\]
Si además \(|\phi(\pmb{x})\rangle\) es un autostado estacionario de \(H_{\mathrm{orbital}}\), su evolución se reduce a una fase global, y la dinámica efectiva se concentra en la parte de spin:
\[|s(t)\rangle = U_{\mathrm{spin}}(t)\, |s\rangle.\]

Esta aproximación se justifica en la medida en que, en los dispositivos de qubits (por ejemplo, en sistemas de spin qubits en semiconductores o iones atrapados), la interacción que podría acoplar las variables orbitales y de spin es muy pequeña en comparación con las interacciones que afectan directamente al spin. De modo que, al fijar la parte orbital en un estado estacionario, se “congela” su contribución dinámica, permitiendo que el comportamiento cuántico relevante se describa únicamente en el subespacio \(\mathscr{H}_{\mathrm{spin}}\).

La separabilidad del Hamiltoniano y de los estados es, por tanto, el fundamento que permite “aislar” el qubit en una estructura bidimensional, lo que facilita la manipulación y el control en aplicaciones de computación cuántica.

En resumen, al preparar el sistema en un estado factorizable y considerar un Hamiltoniano que se separa como
\[H = H_{\mathrm{orbital}} \otimes I_{\mathrm{spin}} + I_{\mathrm{orbital}} \otimes H_{\mathrm{spin}},\]
se puede omitir o discriminar, vía factorización, la parte orbital y trabajar únicamente en el subespacio bidimensional isomorfo a \(\mathbb{C}^2\) para tratar con un qubit.








[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 
