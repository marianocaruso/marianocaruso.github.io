---
title: "Acuerdo en el desacuerdo"
summary: "Sobre la ventaja de disentir"
date: "2026-10-07"
showDate: false
draft: false
showReadingTime: false
tags: ["clasificación", "active learning"]
math: true
---

{{< katex >}}


## Formulación del problema

Sea $\mathscr{X}$ el espacio muestral o dominio de datos de entrada. Consideremos dos clasificadores previamente entrenados, denotados como Método 1 ($h_1$) y Método 2 ($h_2$), representados como funciones medibles $h_i: \mathscr{X} \to \{-1, +1\}$.

Para cada método $i \in \{1, 2\}$, el subconjunto de instancias predichas como "positivas" ($+1$) se define como:

$$
\mathscr{X}_i = \{x \in \mathscr{X} : h_i(x) = +1\} \subseteq \mathscr{X}
$$

La discrepancia unilateral entre ambos clasificadores se captura mediante la diferencia de conjuntos de positivos, que aísla las instancias clasificadas como positivas por el método $i$ pero rechazadas por el método $j$:

$$
\mathscr{X}_{i \neg j} = \mathscr{X}_i - \mathscr{X}_j = \{x \in \mathscr{X} : x \in \mathscr{X}_i \land x \notin \mathscr{X}_j\}
$$

La magnitud o volumen de esta divergencia viene dada por su cardinalidad:

$$
X_{i \neg j} = \text{card}(\mathscr{X}_{i \neg j})
$$

Decimos que existe **desacuerdo total** en la clase positiva cuando la intersección de las predicciones positivas es totalmente vacía:

$$
\mathscr{X}_1 \cap \mathscr{X}_2 = \emptyset
$$

En un escenario de clasificación binaria $\{-1, +1\}$, la región de desacuerdo bilateral global (la zona de conflicto estricto donde un modelo predice $+1$ y el otro $-1$) equivale directamente a la unión disjunta de ambas diferencias:

$$
\text{DIS}(\{h_1, h_2\}) = \{x \in \mathscr{X} : h_1(x) \neq h_2(x)\} = \mathscr{X}_{1 \neg 2} \cup \mathscr{X}_{2 \neg 1}
$$

Geométricamente, si visualizamos este espacio mediante un diagrama de Venn 


```
        método 1          método 2 
   ________________   ________________
  /                \ /                \
 /                  X                  \
|                  / \                  |
|                 /   \                 | 
|                /     \                |
|      𝒳₁¬₂    |𝒳₁ ∩ 𝒳₂|   𝒳₂¬₁       |
|                \     /                |
|                 \   /                 | 
|                  \ /                  |
\                   X                   /
 \_________________/ \_________________/   

```

donde el Método 1 ocupa la izquierda y el Método 2 la derecha:

*   **Medialuna izquierda ($\mathscr{X}_{1 \neg 2}$):** Representa el subconjunto exclusivo de positivos del Método 1 (coloreado en azul).
*   **Medialuna derecha ($\mathscr{X}_{2 \neg 1}$):** Representa el subconjunto exclusivo de positivos del Método 2 (coloreado en rojo).
*   **Lente central ($\mathscr{X}_1 \cap \mathscr{X}_2$):** Representa la zona de consenso explícito.



Si la condición $\mathscr{X}_1 \cap \mathscr{X}_2 = \emptyset$ se cumple, equivale a un vaciamiento completo del centro: el núcleo intermedio de coincidencia se anula y la totalidad de la masa predicha se desplaza hacia las medialunas extremas azul y roja.

## Operativa de la clasificación

Para comprender las consecuencias de este desacuerdo, es indispensable distinguir el propósito operativo con el que se utiliza el sistema de clasificación: la estimación de masa poblacional frente a la selección mediante filtro individualizado.


El término anodino hace referencia a aquello que resulta inofensivo, neutro o carente de impacto ostensible. En la evaluación de clasificadores a nivel macroscópico, el objetivo principal suele ser cuantificar el volumen global o la proporción de la clase positiva en la población.

Si ocurre que $X_{1 \neg 2} \approx X_{2 \neg 1}$, la cardinalidad total de positivos predicha por ambos métodos resulta idéntica:

$$
\text{card}(\mathscr{X}_1) = X_{1 \neg 2} \approx X_{2 \neg 1} = \text{card}(\mathscr{X}_2)
$$

Desde la perspectiva de un cuadro de mando macroscópico, el cambio del Método 1 al Método 2 se percibe como volumétricamente anodino: el sistema sigue reportando el mismo número bruto de casos positivos. Las métricas agregadas permanecen inalteradas, sugiriendo una aparente equivalencia.


Sin embargo, cuando la clasificación se utiliza como un filtro de selección a nivel micro (donde cada predicción positiva dispara una acción individualizada e irreversible, como seleccionar una molécula para síntesis en laboratorio), la condición $\mathscr{X}_1 \cap \mathscr{X}_2 = \emptyset$ representa un colapso estructural del filtro.

Dado que la intersección es vacía:

1.  El $100\%$ de los elementos seleccionados por el Método 1 ($\mathscr{X}_{1 \neg 2}$) son sistemáticamente rechazados por el Método 2.
2.  El $100\%$ de los elementos seleccionados por el Método 2 ($\mathscr{X}_{2 \neg 1}$) eran considerados negativos por el Método 1.

Lo que a nivel macroscópico se diagnosticó como una anodinia volumétrica, a nivel micro operacional constituye una renovación catastrófica del grupo objetivo. El filtro ha cambiado por completo la identidad de cada sujeto u objeto seleccionado.

## Fundamentos teóricos

Para unificar la teoría de la información con la explotación operativa de estos modelos, requerimos de dos andamiajes teóricos complementarios.

### Un teorema importante

La información de la que dispone cada clasificador $i \in \{1, 2\}$ se representa mediante una partición $\mathscr{P}_i$ sobre $\mathscr{X}$. La probabilidad posterior asignada por el clasificador $i$ a un evento objetivo $A$ (ej. "la molécula es candidata") condicionada a su partición es $q_i(x) = p(A \mid P_i(x))$.

El **teorema de Aumann (1976)** demuestra matemáticamente la imposibilidad de que dos agentes bayesianos con un prior común discrepen en sus probabilidades posteriores si dichas probabilidades son de conocimiento común.

**Una consecuencia para Machine Learning:** 
Si el teorema postula que el desacuerdo es imposible bajo condiciones de simetría informativa, su violación en la práctica resulta reveladora. Bajo supuestos de prior común, el desacuerdo en las medialunas ($q_1(x) \neq q_2(x)$ para $x \in \mathscr{X}_{1 \neg 2} \cup \mathscr{X}_{2 \neg 1}$) no es un mero "ruido estadístico"; se debe estricta y necesariamente a una **asimetría en la información privada o en el sesgo inductivo** ($P_1(x) \neq P_2(x)$). 

El desacuerdo es, por tanto, la prueba matemática de una complementariedad epistémica: los modelos están particionando el espacio de características de manera ortogonal.

### Aprendizaje activo basado en desacuerdo

Mientras Aumann nos da el diagnóstico epistémico, Hanneke formaliza el protocolo operativo para aprovecharlo. 

Para nuestro comité de dos clasificadores $\{h_1, h_2\}$, la región de desacuerdo es $\text{DIS}(\{h_1, h_2\}) = \mathscr{X}_{1 \neg 2} \cup \mathscr{X}_{2 \neg 1}$. El algoritmo CAL (Cohn, Atlas, Ladner) de aprendizaje activo explota esta geometría evaluando cada punto no etiquetado $X_m$:


* si $X_m \in \text{DIS} \implies$ consultar etiqueta $Y_m$ al oráculo
* si $X_m \notin \text{DIS} \implies$ inferir etiqueta por consenso unánime sin consulta

Hanneke mide la tasa de contracción de esta región mediante el coeficiente de desacuerdo $\theta$. Cuando $\theta(\epsilon) = O(1)$, la complejidad de etiquetas demanda disminuye exponencialmente respecto al aprendizaje pasivo (muestreo aleatorio), pasando de $O(1/\epsilon)$ a $O(\log(1/\epsilon))$.

## Explotando el desacuerdo

En lugar de ver la divergencia de clasificadores como un problema de auditoría defensiva, la intersección entre la asimetría de Aumann y el muestreo de Hanneke proporciona un mapa del tesoro para la **captura de valor**, especialmente en dominios donde la validación es extremadamente costosa. 

Pensemos, por ejemplo, en una fase temprana de *drug discovery* para evaluar la inhibición de una diana terapéutica. El "oráculo" aquí es una síntesis en laboratorio o un ensayo *in vitro*, recursos altamente limitados. Tenemos dos modelos de clasificación (por ejemplo, un modelo clásico basado en descriptores fisicoquímicos tradicionales y un modelo emergente que emplea representaciones diferentes).

Si detectamos un alto grado de divergencia ($\mathscr{X}_1 \cap \mathscr{X}_2 \approx \emptyset$), la estrategia de captura de valor dicta lo siguiente:

1.  **Consenso como explotación segura:** La zona de acuerdo positivo ($\mathscr{X}_1 \cap \mathscr{X}_2$) agrupa los candidatos "seguros". Ambos sesgos inductivos coinciden. Sin embargo, estas moléculas suelen pertenecer a espacios químicos bien conocidos y redundantes. Gastar presupuesto de laboratorio aquí tiene un bajo riesgo, pero también una baja ganancia de información (retorno de inversión epistémico marginal).
2.  **Desacuerdo como exploración** Las regiones $\mathscr{X}_{1 \neg 2}$ y $\mathscr{X}_{2 \neg 1}$ no son zonas de error, sino fronteras de exploración. 
    *   Si muestreamos candidatos de la medialuna del nuevo modelo ($\mathscr{X}_{2 \neg 1}$) y el oráculo (el ensayo *in vitro*) confirma la positividad, habremos validado que el sesgo inductivo de $h_2$ está capturando lógicas subyacentes (topológicas, estructurales) invisibles para el modelo clásico.
    *   Esta zona concentra los candidatos más innovadores, aquellos capaces de superar los cuellos de botella clásicos del cribado.

## Conclusiones

*   **Comprensión de la divergencia:** El desacuerdo entre dos clasificadores en las medialunas azul y roja no debe interpretarse como ruido aleatorio, sino como la manifestación geométrica de una asimetría en la información y complementariedad de sesgos inductivos (Aumann, 1976).
*   **Superación de la ilusión volumétrica:** Evaluar modelos mediante métricas agregadas puede enmascarar un colapso completo del filtro de selección. Un cambio "volumétricamente anodino" a nivel macro puede implicar descartar sistemáticamente los perfiles históricos y renovar toda la base operativa.
*   **De la auditoría a la captura de valor:** Delimitar formalmente la región de desacuerdo $\text{DIS}$ permite concentrar el presupuesto de validación experimental en las fronteras de conflicto (Hanneke, 2014). En dominios complejos, explotar el desacuerdo es la forma más rápida y matemáticamente óptima de transitar desde los espacios de conocimiento trillados hacia fronteras de descubrimiento de alto valor.

## Referencias bibliográficas

*   Aumann, R. J. (1976). Agreeing to disagree. *The Annals of Statistics*, 4(6), 1236–1239.
*   Hanneke, S. (2014). Theory of disagreement-based active learning. *Foundations and Trends in Machine Learning*, 7(2–3), 131–309.