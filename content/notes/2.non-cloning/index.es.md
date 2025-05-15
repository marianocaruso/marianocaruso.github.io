---

title: "Teorema de no clonado" # va al índice de notas
date: 2025-01-01
showDate: false
#description: "non-cloning theorem"  #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
summary: "Sobre la imposibilidad de cierto tipo plagio"
tags: [quantum, states]

math:  true  

---

{{< katex >}}




Dado un espacio de Hilbert $\mathscr{H}$, se pretende encontrar un operador  $U:\mathscr{H}\otimes \mathscr{H}\longrightarrow\mathscr{H}$ de manera que para un vector susceptible de ser  **copiado** $|\varphi\rangle\in\mathscr{H}$ y para un vector  de **soporte**  $|s\rangle\in\mathscr{H}$, ambos de norma 1, se cumpla que 


{{< alert "check" >}}
$U:|\varphi\rangle\otimes |s\rangle\longmapsto|\varphi\rangle\otimes |\varphi\rangle, \quad \forall \varphi \in \mathscr{H}$ (operador de copiado)
{{< /alert >}}


Tal operador se dice que **realiza**  el procedimiento de copiado sin destruir el estado, $|\varphi\rangle$, que pretende copiar.

En las condiciones anteriores se puede demostrar el siguiente

## Enunciado 
$\nexists U$ que cumpla la definición anterior tal que o bien 
1. $U$ sea lineal 
2. $U$ sea unitario

---

## Demostración

#### 1. \\(U\\) no puede ser lineal
(*por reducción al absurdo*)


Veamos que $U$ no podría ser lineal. Supongamos que puede encontrarse un operador $U$ así y sean $|\varphi_1\rangle$, $|\varphi_2\rangle\in \mathscr{H}$, tales que 

$U|\varphi_i\rangle\otimes|s\rangle=|\varphi_i\rangle\otimes|\varphi_i\rangle$, con $i=1,2$

luego tomemos la combinación lineal $
|\varphi\rangle=\alpha_1|\varphi_1\rangle+\alpha_2|\varphi_2\rangle$, aquí entra cierta **arbitrariedad** del estado $|\varphi\rangle$ sobre el cual haremos la prueba. 

deberíamos esperar que para este estado $|\varphi\rangle$, escrito en término de los vectores $\{|\varphi_i\}_{i=1,2}$, se obtenga para $U|\varphi\rangle\otimes|s\rangle$ 

$$
\alpha_1^2|\varphi_1\rangle\otimes|\varphi_1\rangle+\alpha_2^2|\varphi_2\rangle\otimes|\varphi_2\rangle + \alpha_1\alpha_2\Big[|\varphi_1\rangle\otimes|\varphi_2\rangle+|\varphi_2\rangle\otimes|\varphi_1\rangle\Big]
$$

mientras que, exigiendo que $U$ sea **lineal**: 

$U|\varphi\rangle\otimes|s\rangle=\alpha_1U|\varphi_1\rangle\otimes|s\rangle+\alpha_2U|\varphi_2\rangle\otimes|s\rangle$ luego se obtiene para $U|\varphi\rangle\otimes|s\rangle$

$$
\alpha_1|\varphi_1\rangle\otimes|\varphi_1\rangle+\alpha_2|\varphi_2\rangle\otimes|\varphi_2\rangle
$$

comparando estas últimas dos expresiones para $U|\varphi\rangle\otimes|s\rangle$ se llega al absurdo.


#### 2. \\(U\\) no puede ser unitario 
(*por reducción al absurdo*)

Veamos que $U$ no podría ser unitario. Supongamos que puede encontrarse un operador $U$ así y sean $|\varphi_1\rangle$, $|\varphi_2\rangle\in \mathscr{H}$, tales que 

$U|\varphi_i\rangle\otimes|s\rangle=|\varphi_i\rangle\otimes|\varphi_i\rangle$, con $i=1,2$

Calculemos ahora el producto interno $\langle \varphi_1\otimes s|\varphi_2\otimes s\rangle$, exigiendo que $U$ sea **unitario**, i.e. $U^{\dagger}U=I$: $\langle \varphi_1\otimes s|\varphi_2\otimes s\rangle =\langle \varphi_1\otimes s|I|\varphi_2\otimes s\rangle$ que finalmente es $\langle \varphi_1\otimes s|U^{\dagger}U|\varphi_2\otimes s\rangle=\langle \varphi_1\otimes \varphi_1|\varphi_2\otimes \varphi_2\rangle$
usando que $\langle x\otimes y|z\otimes w\rangle=\langle x|z\rangle.\langle y|w\rangle$ 
se tiene 
$\langle \varphi_1 |\varphi_2\rangle.\langle s |s\rangle =\langle \varphi_1 |\varphi_2\rangle.\langle \varphi_1 |\varphi_2\rangle$, luego 

$$
\langle\varphi_1 |\varphi_2\rangle=
\langle \varphi_1 |\varphi_2\rangle^2
$$ 
que es una ecuación para  $\langle \varphi_1 |\varphi_2\rangle\in \mathbb{C}$; con lo cual o bien $\langle \varphi_1 |\varphi_2\rangle=0$ o bien $\langle \varphi_1 |\varphi_2\rangle=1$. El primer caso implica que aquellos vectores no pueden ser cualquier sino solo aquellos mutuamente ortogonales, con lo cual no hay arbitrariedad. El segundo caso implica que ambos pueden  ser proporcionales. En cualquier caso no hay arbitrariedad en la elección de aquellos dos vectores $| \varphi_1 \rangle,|\varphi_2\rangle$, lo que se traduce en una no universalidad del operador $U$.

**Notas**

1. Incluso podríamos haber generalizado el operador $U$ para incluir una fase local $\phi$ que pueda depender incluso de los estados $|\varphi\rangle,|s \rangle$, de forma que el supuesto operador de copia se redefina como 

$$
U|\varphi\rangle\otimes|s\rangle:=e^{i\phi(\varphi,s)}|\varphi\rangle\otimes|\varphi\rangle.
$$

    Aún en este caso las ideas de la demostración anterior seguiría siendo válida. 

2.  Se ha demostrado la imposibilidad de realizar copias **perfectas**  del estado del sistema cuántico y sin **destruir** el estado original, vía un operador o bien lineal o bien unitario.

3. Existen versiones que no prohíben  realizar copias imperfectas.

 