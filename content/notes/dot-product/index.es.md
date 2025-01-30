---

title: "Cómputo eficiente del producto interno" # va al índice de notas
date: 2025-01-02
showDate: false
summary: "Ventajas y desafíos en el cómputo del producto interno"
# description: "nota 2" #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
tags: [quantum, dot product, kernel, LLM]
math:  true  

---

{{< katex >}}


## Sobre el producto interno, *a lo bruto*


El producto interno o escalar entre vectores $x$ e $y$, también conocido como producto punto o producto interno, denotado por $x\cdot y$, es una operación fundamental en machine learning, especialmente en tareas que involucran modelos de lenguaje de gran escala (LLM) y el uso de embeddings vectoriales. Los embeddings, que representan palabras, frases o incluso conceptos completos como vectores en espacios de alta dimensionalidad, permiten medir similitudes semánticas a través del producto punto, base para tareas como búsqueda de información, generación de texto y análisis de contexto. En aplicaciones modernas, los sistemas deben calcular millones de productos punto en tiempo real, por ejemplo, para comparar embeddings generados por LLMs con grandes bases de datos, lo que destaca la necesidad de métodos cada vez más eficientes y escalables.


 Dados dos vectores $x,y\in\mathbb{R}^N$, también conocido como producto punto o producto interno: $x\cdot y=\sum_{i=1}^Nx_iy_i$. El producto interno (calculado a lo) **bruto**, es decir, de forma clásica requiere realizar $N$ multiplicaciones y $N-1$ sumas, suponiendo que la multiplicación y la suma son operaciones de tiempo constante, la complejidad temporal es por lo tanto $O(N)$.


### Enunciado
{{< alert "check" >}}
Demostraremos que el cálculo de \(\langle \phi | \varphi \rangle\) en un sistema cuántico puede realizarse en \(O(\log N)\) requiere formalizar el procedimiento bajo los supuestos adecuados. 
{{< /alert >}}

---

### 1. Representación de los vectores como estados cuánticos
Especifiquemos las componentes de cada uno de los dos vectores \(x = (x_1, \dots, x_N)\), \(y= (y_1,\dots, y_N)\). Estos se codifican como estados cuánticos:
\[
|\phi\rangle = \frac{1}{\|x\|} \sum_{i=1}^N x_i |i\rangle, \quad |\varphi\rangle = \frac{1}{\|y\|} \sum_{i=1}^N y_i |i\rangle
\]
El producto interno *a la* quantum viene dado por:
\[
\langle \phi | \varphi \rangle = \frac{\sum_{i=1}^N x_i y_i}{\|x\| \|y\|}
\]



### 2. Operación cuántica para calcular \\(\langle \phi|\varphi\rangle\\)
La computación cuántica permite estimar \(\langle \phi | \varphi \rangle\) mediante interferencia cuántica. El procedimiento básico es el siguiente:


 #### a. Construcción del estado combinado
Se prepara un estado auxiliar que combina \(|\phi\rangle\) y \(|\varphi\rangle\):
\[
|\Psi\rangle = \frac{1}{\sqrt{2}} \left( |\phi\rangle|0\rangle + |\varphi\rangle|1\rangle \right)
\]
Esto requiere un circuito que condicione la preparación de \(|\phi\rangle\) o \(|\varphi\rangle\) en el valor del qubit auxiliar.

#### b. Aplicación de la puerta Hadamard
Aplicamos una puerta Hadamard \(H\) al qubit auxiliar:
\[
H|0\rangle = \frac{1}{\sqrt{2}} (|0\rangle + |1\rangle), \quad H|1\rangle = \frac{1}{\sqrt{2}} (|0\rangle - |1\rangle)
\]
El nuevo estado se convierte en:
\[
|\Psi'\rangle = \frac{1}{2} \Big( (|\phi\rangle + |\varphi\rangle)|0\rangle + (|\phi\rangle - |\varphi\rangle)|1\rangle \Big)
\]

#### c. Medición del qubit auxiliar
La probabilidad de medir \(0\) en el qubit auxiliar está relacionada directamente con \(\langle \phi | \varphi \rangle\):
\[
P(0) = \frac{1}{2} \left( 1 + \text{Re}(\langle \phi | \varphi \rangle) \right)
\]
Similarmente, la probabilidad de medir \(1\) está relacionada con \(1 - \text{Re}(\langle \phi | \varphi \rangle).\) Mediante repeticiones, podemos estimar \(\text{Re}(\langle \phi | \varphi \rangle).\)

#### d. Complejidad del cálculo
1. El número de qubits necesarios para representar \(|\phi\rangle\) y \(|\varphi\rangle\) es \(\log N\).
2. Las operaciones cuánticas, tales como la puerta Hadamard, actúan en paralelo sobre las amplitudes de \(|\phi\rangle\) y \(|\varphi\rangle\), lo que implica que la complejidad del circuito depende del número de qubits, luego \(O(\log N)\).

---

### 3. Preparación del estado: un costo adicional
La ventaja cuántica solo se logra si los estados \(|\phi\rangle\) y \(|\varphi\rangle\) ya están preparados. Preparar un estado cuántico a partir de datos clásicos generalmente tiene complejidad \(O(N)\), ya que cada componente del vector debe cargarse en la superposición.

Sin embargo, en escenarios donde los datos ya están disponibles en forma cuántica (como en simulaciones físicas), el costo de preparación se elimina, y el cálculo del producto interno se realiza en \(O(\log N)\).

---

### 4. Conclusión
El cálculo de \(\langle \phi | \varphi \rangle\) puede realizarse en \(O(\log N)\) dentro del modelo cuántico bajo los siguientes supuestos:
1. Los vectores están codificados como estados cuánticos \(|\phi\rangle\) y \(|\varphi\rangle\).
2. Las operaciones cuánticas (como puertas y mediciones) escalan con el número de qubits (\(\log N\)).


{{< alert >}}
A pesar de este notable resultado, hay aún un costo \(O(N)\) remanente, que surge en la preparación inicial del estado si los datos son codificados de manera clásica. Este paso sigue siendo un desafío en la computación cuántica actual. 
{{< /alert >}}


P.D: algún detalle de interés

[{{< spotify type="album" id="5iT3F2EhjVQVrO4PKhsP8c?" width="100%" height="160" >}}]:#

<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/6RPpk7XOVcXy9m09doykhg?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

[esto coloca un reproductor de muestras de spotify dado el id de la carpeta de spotify]:# 



[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 
