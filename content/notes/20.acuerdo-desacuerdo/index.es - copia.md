# El Acuerdo en el Desacuerdo: Geometría de Clasificadores, Filtros de Selección y Aprendizaje Activo

## 1. Introducción y Formulación del Problema

Sea \\(\mathscr{X}\\) el espacio muestral o dominio de datos de entrada. Consideremos dos clasificadores previamente entrenados, denotados como Método 1 (\\(h_1\\)) y Método 2 (\\(h_2\\)), representados como funciones medibles \\(h_i: \mathscr{X} \to \{-1, +1\}\\).

Para cada método \\(i \in \{1, 2\}\\), definimos el subconjunto de instancias predichas como "positivas" (\\(+1\\)) como:

\\[
\mathscr{X}_i = \{x \in \mathscr{X} : h_i(x) = +1\} \subseteq \mathscr{X}
\\]

Para caracterizar la divergencia estructural entre ambos clasificadores, definimos la **diferencia unilateral de positivos**, que corresponde al conjunto de instancias clasificadas como positivas por el método \\(i\\) pero no por el método \\(j\\):

\\[
\mathscr{X}_{i \neg j} = \mathscr{X}_i - \mathscr{X}_j = \{x \in \mathscr{X} : x \in \mathscr{X}_i \land x \notin \mathscr{X}_j\}
\\]

La magnitud o volumen de esta discrepancia se mide mediante su cardinalidad:

\\[
X_{i \neg j} = \text{card}(\mathscr{X}_{i \neg j})
\\]

### El Caso de Desacuerdo Total en la Clase Positiva (\\(\mathscr{X}_1 \cap \mathscr{X}_2 = \emptyset\\))

Decimos que existe **desacuerdo total sobre los positivos** cuando la intersección de las predicciones positivas es vacía:

\\[
\mathscr{X}_1 \cap \mathscr{X}_2 = \emptyset
\\]

En este escenario, la **Región de Desacuerdo Bilateral** reducida a la clase positiva equivale exactamente a la unión disjunta de ambas diferencias de conjuntos:

\\[
\text{DIS}(\{h_1, h_2\}) \cap (\mathscr{X}_1 \cup \mathscr{X}_2) = \mathscr{X}_{1 \neg 2} \cup \mathscr{X}_{2 \neg 1}
\\]

Para cualquier objeto \\(x \in \mathscr{X}_1 \cup \mathscr{X}_2\\), el Método 1 afirmará que \\(x\\) es positivo si y solo si el Método 2 afirma categóricamente lo contrario.

---

## 2. Geometría del Desacuerdo: El Diagrama de Venn

Representemos geométricamente la relación entre \\(\mathscr{X}_1\\) y \\(\mathscr{X}_2\\) mediante un diagrama de Venn en el espacio \\(\mathscr{X}\\):

* **Medialuna Izquierda (\\(\mathscr{X}_{1 \neg 2}\\)):** Representa el subconjunto exclusivo de positivos identificados por el Método 1. Rellenada de color **azul**, representa la masa de datos sobre la cual solo el primer algoritmo emite un juicio positivo.
* **Medialuna Derecha (\\(\mathscr{X}_{2 \neg 1}\\)):** Representa el subconjunto exclusivo de positivos identificados por el Método 2. Rellenada de color **rojo**, representa la masa de datos sobre la cual solo el segundo algoritmo emite un juicio positivo.
* **Zona Central de Intersección (\\(\mathscr{X}_1 \cap \mathscr{X}_2\\)):** Es la lente de acuerdo explícito sobre los positivos.

Cromáticamente, si proyectamos este espacio sobre una composición esférica con un gradiente continuo de azul (izquierda) a rojo (derecho), el caso \\(\mathscr{X}_1 \cap \mathscr{X}_2 = \emptyset\\) se traduce en un **vaciamiento completo del centro**: la zona intermedia de consenso desaparece y toda la masa predicha se desplaza hacia los extremos azul (\\(\mathscr{X}_{1 \neg 2}\\)) y rojo (\\(\mathscr{X}_{2 \neg 1}\\)). "Estar de acuerdo en el desacuerdo" consiste en acotar geométricamente el perímetro de estas dos medialunas.

---

## 3. Perspectiva Operativa: Filtro de Selección vs. Clasificación de Masa

El impacto práctico del desacuerdo \\(\mathscr{X}_1 \cap \mathscr{X}_2 = \emptyset\\) depende fundamentalmente del objetivo del sistema de clasificación:

### A. La Clasificación como Filtro de Selección (Nivel Micro / Individual)
Cuando el clasificador se utiliza como un **filtro**, el objetivo es identificar objetos específicos sobre los cuales ejecutar una acción costosa o crítica (por ejemplo, seleccionar candidatos para una auditoría fiscal, aprobar créditos bancarios o enviar pacientes a tratamiento médico).

* **Impacto del desacuerdo:** Si \\(\mathscr{X}_1 \cap \mathscr{X}_2 = \emptyset\\), el filtro es totalmente inconsistente. La población seleccionada por el Método 1 (\\(X_{1 \neg 2}\\)) es totalmente rechazada por el Método 2, y la población seleccionada por el Método 2 (\\(X_{2 \neg 1}\\)) es totalmente rechazada por el Método 1. A nivel individual, la superposición de criterios es nula (\\(0\%\\)).

### B. La Clasificación de Masa o Poblacional (Nivel Macro / Volumétrico)
Cuando la tarea busca únicamente **identificar o cuantificar a una masa** o proporción global dentro de la población (por ejemplo, estimar la tasa de prevalencia de una enfermedad o calcular el volumen total de inventario defectuoso):

* **Impacto del desacuerdo:** Si \\(X_{1 \neg 2} = X_{2 \neg 1}\\), ambos métodos reportarán exactamente la misma masa cuantitativa total de positivos:
  
\\[
\text{card}(\mathscr{X}_1) = X_{1 \neg 2} = X_{2 \neg 1} = \text{card}(\mathscr{X}_2)
\\]

  A nivel macroscópico, las métricas globales darán la ilusión de un comportamiento idéntico. Sin embargo, a nivel microscópico, el conflicto en la identidad de los objetos es absoluto.

---

## 4. Fundamentos Matemáticos y Nomenclatura Unificada

Para unificar la teoría de la información y el aprendizaje automático, adoptamos una nomenclatura uniforme donde \\(\mathscr{X}\\) representa el espacio muestral/dominio, \\(\mathscr{B}\\) la \\(\sigma\\)-álgebra de eventos y \\(\mathscr{C}\\) el espacio de hipótesis.

### 4.1. Estructura de Información y Teorema de Aumann (1976)

Sea \\((\mathscr{X}, \mathscr{B}, p)\\) un espacio de probabilidad común, donde \\(p\\) representa la distribución previa compartida (*common prior*). La información de la que dispone cada clasificador o agente \\(i \in \{1, 2\}\\) se modela mediante una partición \\(\mathscr{P}_i\\) sobre \\(\mathscr{X}\\). 

Para cada punto \\(x \in \mathscr{X}\\), denotamos por \\(P_i(x) \in \mathscr{P}_i\\) al único elemento de la partición que contiene a \\(x\\). La probabilidad posterior asignada por el clasificador \\(i\\) a un evento objetivo \\(A \in \mathscr{B}\\) (ejemplo: "el punto \\(x\\) es una instancia verdaderamente positiva") viene dada por:

\\[
q_i(x) = p(A \mid P_i(x)) = \frac{p(A \cap P_i(x))}{p(P_i(x))}
\\]

El **conocimiento común** (*common knowledge*) se define sobre la celda \\(P \in \mathscr{P}_1 \wedge \mathscr{P}_2\\), donde \\(\mathscr{P}_1 \wedge \mathscr{P}_2\\) es el refinamiento común más grueso (*meet*) de ambas particiones.

> **Teorema de Aumann (1976):**
> Sean \\(q_1, q_2 \in\\). Si en un punto \\(x \in \mathscr{X}\\) es de conocimiento común que \\(q_1(x) = q_1\\) y \\(q_2(x) = q_2\\), entonces:
>
> \\[
> q_1 = q_2
> \\]

*Demostración Mínima:*
Dado que los valores de las probabilidades posteriores son de conocimiento común en \\(x\\), existe una celda \\(P \in \mathscr{P}_1 \wedge \mathscr{P}_2\\) tal que para todo \\(x' \in P\\), \\(q_1(x') = q_1\\) y \\(q_2(x') = q_2\\). Dado que \\(P\\) es un elemento del *meet*, se puede expresar como una unión disjunta de bloques de la partición del Agente 1: \\(P = \bigcup_k P_1^k\\), con \\(P_1^k \in \mathscr{P}_1\\). Por definición de probabilidad condicional:

\\[
p(A \cap P) = \sum_k p(A \cap P_1^k) = \sum_k q_1 \cdot p(P_1^k) = q_1 \cdot p(P) \implies q_1 = \frac{p(A \cap P)}{p(P)}
\\]

Repitiendo la descomposición para el Agente 2 usando los bloques disjuntos \\(P_2^j \in \mathscr{P}_2\\), obtenemos \\(q_2 = \frac{p(A \cap P)}{p(P)}\\). Por consiguiente, \\(q_1 = q_2\\). \\(\blacksquare\\)

#### Implicación Epistemológica: Origen del Desacuerdo
Si asumimos un marco de racionalidad bayesiana con una prior común \\(p\\), el teorema de Aumann establece que la existencia de desacuerdo en las medialunas (\\(q_1(x) \neq q_2(x)\\) para \\(x \in \mathscr{X}_{1 \neg 2} \cup \mathscr{X}_{2 \neg 1}\\)) **ocurre de forma necesaria debido a una asimetría en la información privada**, es decir:

\\[
P_1(x) \neq P_2(x)
\\]

### 4.2. Aprendizaje Activo Basado en Desacuerdo (Hanneke, 2014)

En la teoría de aprendizaje activo supervisado, consideramos un espacio de hipótesis \\(\mathscr{C}\\) con dimensión VC finita \\(d = \text{vc}(\mathscr{C}) < \infty\\).

Dado un conjunto de datos etiquetados \\(Z_m = \{(X_k, Y_k)\}_{k=1}^m\\), se define el **Espacio de Versiones** \\(\mathscr{V}_m \subseteq \mathscr{C}\\) como el conjunto de hipótesis consistentes con la muestra:

\\[
\mathscr{V}_m = \{h \in \mathscr{C} : \forall k \in \{1, \dots, m\}, h(X_k) = Y_k\}
\\]

La **Región de Desacuerdo** asociada al espacio de versiones \\(\mathscr{V}_m\\) se define formalmente como:

\\[
\text{DIS}(\mathscr{V}_m) = \{x \in \mathscr{X} : \exists h, g \in \mathscr{V}_m \text{ tal que } h(x) \neq g(x)\}
\\]

Para nuestro par de clasificadores \\(\{h_1, h_2\}\\), la unión de la medialuna azul y la medialuna roja constituye exactamente el conjunto \\(\text{DIS}(\{h_1, h_2\}) = \mathscr{X}_{1 \neg 2} \cup \mathscr{X}_{2 \neg 1}\\).

#### El Algoritmo CAL y la Regla de Consulta Activa
El algoritmo de aprendizaje activo CAL (*Cohn, Atlas, Ladner*) procesa la secuencia no etiquetada \\(X_1, X_2, \dots\\) solicitando la etiqueta \\(Y_m\\) al oráculo **únicamente si el punto pertenece a la región de desacuerdo**:

\\[
\text{Si } X_m \in \text{DIS}(\mathscr{V}_{m-1}) \implies \text{Consultar Label } Y_m
\\]

\\[
\text{Si } X_m \notin \text{DIS}(\mathscr{V}_{m-1}) \implies \text{Inferir } h(X_m) \text{ por consenso unánime}
\\]

#### Coeficiente de Desacuerdo (\\(\theta\\)) y Complejidad de Etiquetas
Hanneke cuantifica la tasa de contracción de la región de desacuerdo alrededor de la hipótesis óptima \\(f^*\\) mediante el **Coeficiente de Desacuerdo** \\(\theta(r_0)\\):

\\[
\theta(r_0) = \sup_{r > r_0} \frac{p(\text{DIS}(B(f^*, r)))}{r} \vee 1
\\]

donde \\(B(f^*, r) = \{h \in \mathscr{C} : p(\{x \in \mathscr{X} : h(x) \neq f^*(x)\}) \le r\}\\).

Mientras que el aprendizaje pasivo requiere una cantidad de etiquetas de orden \\(O(1/\epsilon)\\) para alcanzar un error máximo \\(\epsilon\\), el protocolo activo basado en desacuerdo acota la **complejidad de etiquetas** \\(\Lambda(\epsilon, \delta, P_{XY})\\) a:

\\[
\Lambda(\epsilon, \delta, P_{XY}) = O \left( \theta(\epsilon) \cdot \left[ d \log \theta(\epsilon) + \log\left(\frac{\log(1/\epsilon)}{\delta}\right) \right] \log\left(\frac{1}{\epsilon}\right) \right)
\\]

Si \\(\theta(\epsilon) = O(1)\\), la demanda de etiquetas se reduce de forma **exponencial** a \\(O(\log(1/\epsilon))\\).

---

## 5. Sustitución de Modelos: Modelo State-of-the-Art (\\(h_1\\)) vs. Modelo Candidato (\\(h_2\\))

Consideremos el escenario práctico en el que se dispone de un modelo en producción considerado *State-of-the-Art* (SOTA), denotado como Método 1 (\\(h_1\\)), y se pretende evaluar la introducción de un nuevo modelo candidato, denominado Método 2 (\\(h_2\\)). Supongamos que tras el entrenamiento se observa una divergencia severa en la que los conjuntos de predicciones positivas satisfacen:

\\[
\mathscr{X}_1 \cap \mathscr{X}_2 = \emptyset
\\]

```
            MÉTODO 1 (SOTA)                     MÉTODO 2 (CANDIDATO)
        +----------------------+             +----------------------+
        |                      |             |                      |
        |  Medialuna Izquierda |  Intersección|   Medialuna Derecha  |
        |  (AZUL)              |    VACÍA    |   (ROJA)             |
        |                      |             |                      |
        |  X_{1 \neg 2}        |     (Ø)     |   X_{2 \neg 1}       |
        +----------------------+             +----------------------+
```

### Anodinia Volumétrica vs. Colapso del Filtro
Si la evaluación del modelo candidato \\(h_2\\) se realiza exclusivamente bajo una métrica poblacional de masa, podría darse el caso de que \\(X_{1 \neg 2} \approx X_{2 \neg 1}\\). La tasa global de positivos predicha por el nuevo modelo sería idéntica a la del modelo SOTA. Sin embargo, en un sistema de **filtro de selección**, la sustitución de \\(h_1\\) por \\(h_2\\) provocaría las siguientes consecuencias:

1. **Descarte del 100% de la Población SOTA:** Todo objeto \\(x \in \mathscr{X}_{1 \neg 2}\\) previamente seleccionado por el sistema en producción pasará a ser rechazado de forma sistemática.
2. **Incorporación de una Población Totalmente Inédita:** El sistema seleccionará únicamente objetos \\(x \in \mathscr{X}_{2 \neg 1}\\), respecto a los cuales el modelo SOTA emitía un juicio negativo.

### Estrategia de Evaluación Guiada por Desacuerdo
En lugar de desplegar \\(h_2\\) a ciegas o etiquetar muestras de forma aleatoria en todo el dominio \\(\mathscr{X}\\), la combinación de los principios de Aumann y Hanneke indica que la investigación de la idoneidad de \\(h_2\\) debe concentrarse **exclusivamente en la región de desacuerdo**:

\\[
\text{DIS}(\{h_1, h_2\}) = \mathscr{X}_{1 \neg 2} \cup \mathscr{X}_{2 \neg 1}
\\]

Muestrear activamente y etiquetar instancias dentro de la medialuna azul (\\(\mathscr{X}_{1 \neg 2}\\)) permite medir exactamente la tasa de falsos negativos que introduciría \\(h_2\\) al abandonar el modelo SOTA. Muestrear la medialuna roja (\\(\mathscr{X}_{2 \neg 1}\\)) revela si el nuevo modelo está descubriendo verdaderos positivos no detectados o si simplemente padece de un sesgo inductivo erróneo.

---

## 6. Conclusiones: El Valor de "Estar de Acuerdo en el Desacuerdo"

1. **Aislamiento de la Asimetría Informativa:** La existencia de la región de desacuerdo \\(\mathscr{X}_{1 \neg 2} \cup \mathscr{X}_{2 \neg 1}\\) es la manifestación geométrica de divergencias en los datos de entrenamiento o en los sesgos inductivos de los modelos. Bajo el supuesto de priors comunes (Aumann, 1976), estas medialunas encapsulan toda la información privada no compartida entre ambos clasificadores.
2. **Eficiencia en la Supervisión:** En lugar de auditar exhaustivamente el espacio total \\(\mathscr{X}\\), restringir la evaluación al conjunto de desacuerdo permite optimizar la **complejidad de etiquetas** (Hanneke, 2014), garantizando que cada consulta al oráculo aporte la máxima información posible para actualizar el espacio de versiones.
3. **Control Riguroso en Filtros de Selección:** Para aplicaciones operativas donde la clasificación actúa como un filtro individual, asegurar la consistencia entre un modelo SOTA y un modelo candidato exige verificar la convergencia en las medialunas. Delimitar formalmente la región de desacuerdo es el único mecanismo bayesianamente sólido para auditar la sustitución de un algoritmo sin comprometer la integridad del sistema.

---

## Referencias Bibliográficas

1. **Aumann, R. J. (1976).** Agreeing to disagree. *The Annals of Statistics*, 4(6), 1236–1239.
2. **Hanneke, S. (2014).** Theory of disagreement-based active learning. *Foundations and Trends® in Machine Learning*, 7(2–3), 131–309.