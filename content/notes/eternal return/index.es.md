---

title: "Eterno retorno" # va al índice de notas
date: 2025-01-02
showDate: false
summary: "¿Cuándo llegamos?"
# description: "nota 2" #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
tags: [eternal return, quantum computing]
math:  true  

---


{{< katex >}}







## Plumas, pinceles y qubits

La idea de un **tiempo circular** aparece una y otra vez en la literatura, el arte y la ciencia.  El *uróboro*, la serpiente que se muerde a si misma, simboliza el ciclo eterno de las cosas, imagen de la naturaleza cíclica del tiempo y del **eterno retorno**. Borges explora estas nociones: Marta Gallo apunta que en cuentos como *Las ruinas circulares* el autor sugiere un “eterno retorno y eterno comienzo” donde nada termina definitivamente.  En *Las ruinas circulares* un mago sueña y va dando forma a otro ser, hasta descubrir al final que él mismo es el sueño de otro, cerrando así un círculo onírico de creación y muerte.  Esta narrativa circular enlaza con otros textos borgianos: por ejemplo, *El jardín de senderos que se bifurcan* retrata el tiempo como un laberinto de caminos que se bifurcan en todas las posibilidades, un “multiverso” literario donde todos los destinos coexisten.  En el ensayo *“La doctrina de los ciclos”* Borges aborda la idea de un retorno literal desde un enfoque matemático: invoca a Cantor para argumentar que un universo de infinitos puntos no puede repetir exactamente sus estados.  En *“El tiempo circular”* examina tres concepciones del eterno regreso –astrológica (platónica), nietzscheana y cósmica (año de Brahma)– sin adherirse a ninguna.  Ahí cita a Schopenhauer: “La forma de aparición de la voluntad es sólo el presente… Nadie ha vivido en el pasado, nadie vivirá en el futuro”, negando así la existencia efectiva del pasado y el futuro fuera de la conciencia presente.  En conjunto, Borges amalgama la idea de ciclos con la de múltiples realidades: sus textos circulares ofrecen un flujo perpetuo de creación, donde cada historia es al mismo tiempo un comienzo y un regreso.

Nietzsche hizo del eterno retorno un tema central: no sólo los hechos, sino también los pensamientos y las ideas “se repiten una y otra vez” eternamente.  En *La gaya ciencia* invita a aceptar lo que ha de volver (el *amor fati*) como prueba de grandeza.  Previamente, Schopenhauer había concebido un mundo eterno en ciclos de la Voluntad: en *El mundo como voluntad y representación* afirma que sólo existe el presente –pasado y futuro son meros marcos de la conciencia–, de modo que la existencia es un flujo continuo sin novedad radical.  Así, en la tradición occidental –como ya lo observaban los estoicos– el tiempo no es lineal sino circular: cada universo se destruye para renacer igual; cada acto se repite bajo formas equivalentes. Borges retoma estas raíces filosóficas, reconociendo la concepción estoica y oriental del tiempo cíclico e incorporándola a su “historia de la eternidad”.

En el arte plástico, el tiempo devorador se traduce en imágenes poderosas.  Goya pintó *Saturno devorando a su hijo* (ca. 1820) como crónica pictórica de Cronos (*Saturno* romano) en el acto caníbal de engullir a uno de sus vástagos.  Tradicionalmente esta escena es un emblema alegórico del paso inexorable del tiempo: Cronos se comía a sus hijos para evitar ser destronado, literalmente devorando el futuro por temor a perder el poder, es él quien quiere perpetrarse eternamente. En el lienzo de Goya, la furia del dios bruñido y la sangre del niño desgarrado ilustran el ciclo eterno de destrucción –el “padre” que consuma al “hijo”– que preside las pinturas negras.  Antes, en 1636 Rubens había pintado *Saturno* (para la Torre de la Parada), donde el titán Saturno, advertido de que uno de sus hijos lo derrocaría, decide devorarlos a todos.  Ahí Saturno aparece desgarrando el pecho de uno de sus hijos mientras empuña su guadaña.  Rubens coloca la figura enorme del dios contra un fondo oscuro, destacando el horror barroco del mito.  Estas dos obras, la de Rubens y la de Goya, plasman el rostro sombrío del retorno cíclico: el tiempo, representado por Cronos, es un ciclo destructor que engulle a sus propias creaciones. En ambos casos el arte encarna lo que el uroboro simboliza: la eternidad circular del devenir.

En matemáticas y en física el teorema de recurrencia de Poincaré afirma que ciertos sistemas dinámicos, tras un tiempo finito suficientemente largo, regresan a un estado tan próximo como se desee al estado inicial en el caso de tiempo continuo o idéntico al estado inicial en el caso de tiempo discreto.

En mecánica clásica los sistemas hamiltonianos aislados son periódicos *a la larga*.  

En mecánica cuántica existe un resultado análogo al clásico: para un sistema cerrado con espectro discreto de energías, una versión cuántica del teorema garantiza que para cualquier tolerancia y cualquier tiempo de partida habrá un tiempo $T$ futuro en que el estado cuántico $|\psi(T)\rangle$ regrese arbitrariamente cerca del estado inicial $|\psi(0)\rangle$.  La evolución unitaria del estado en mecánica cuántica, $|\psi(t)\rangle = U(t)|\psi(0)\rangle$ con $U(t)=e^{-iHt/\hbar}$, conserva la norma y hace la dinámica cuasiperiódica. En efecto, escribiendo $|\psi(0)\rangle=\sum_n c_n |\phi_n\rangle$ en la base de autofunciones de energía $H|\phi_n\rangle=E_n|\phi_n\rangle$, la distancia entre $|\psi(T)\rangle$ y $|\psi(0)\rangle$ puede hacerse arbitrariamente pequeña. 

Metafóricamente hablando, la dinámica *a la* Schrödinger de los sistemas cuánticos está encerrada en otro ciclo.

De hecho, en el ámbito de la computación cuántica también encontramos otro tipo de recurrencia. Esta recurrencia cuántica puede visualizarse claramente en el caso más simple: la dinámica de un **qubit**. Cualquier estado de un qubit se representa como un punto en la *esfera de Bloch*. Desde el punto de vista matemático, la esfera es un espacio cerrado y compacto. Una compuerta cuántica de un qubit equivale a una rotación de esa esfera. Matematicamente, bajo el Hamiltoniano 
$$
H=\omega\hat w\cdot\sigma,
$$
donde $\sigma=(\sigma_1,\sigma_2,\sigma_3)$ es el arreglo de las matrices de Pauli. El operador de evolución $U(t)\;=\;\exp\bigl[-it/\hbar H\bigr]$ toma la forma 

$$
U(t)\;=\;\exp\Bigl[-i\omega t/\hbar \,(\hat w\cdot\sigma)\Bigr]\,.
$$

Como $(\hat w\cdot\sigma)^2=I$, luego $U(t)=\cos\bigl(\omega t/\hbar\bigr)I - i\,\sin\bigl(\omega t/\hbar\bigr)\,(\hat w\cdot\sigma).$
De aquí se ve que $U(t)$ es un operador cíclico, de período $T=h/\omega$. Es decir, la evolución del qubit es un movimiento circular en la esfera de Bloch con vuelta al estado original cada $T$. Este hecho se alinea con la propiedad algebraica de que las rotaciones, elementos del grupo $SU(2)$ que generan los operadores cuánticos de un qubit, pueden asociarse a rotaciones tridimensionales, es decir, a elementos del grupo $SO(3)$.  En consecuencia, cualquier Hamiltoniano de dos niveles da lugar a dinámicas cíclicas en la esfera de Bloch, y esas rotaciones unitarias se pueden componer para simular evoluciones complejas.

Estas ideas de dinámica rotacional tienen gran relevancia práctica en la **simulación cuántica**. Nielsen y Chuang subrayan que un conjunto universal de puertas cuánticas equivale a generar arbitrariamente dichas rotaciones $SU(2)$ y $SU(4)$. En la práctica, Reck et al. mostraron que *cualquier* operador unitario de dimensión finita $N\times N$ se puede descomponer en secuencias de transformaciones elementales de 2 dimensiones. Su algoritmo probó experimentalmente cómo construir en el laboratorio un circuito óptico (red de divisores de haz) que implementa cualquier matriz unitaria. Esto facilita la simulación cuántica: con esa receta se puede reproducir en qubits la evolución periódica de sistemas físicos y químicos. En efecto, la simulación cuántica eficiente se basa en descomponer las evoluciones temporales complejas en rotaciones elementales, controlando así los ciclos cuánticos. En términos filosóficos, la unidad de control de estos retornos (rotaciones de Bloch) es la analogía cuántica del dominio del tempo en música: el avance en computación cuántica reside en manejar con precisión las recurrencias temporales.

## Epílogo

Borges escribe sobre la idea de volver eternamente; Goya y Rubens pintan a un Cronos que encarna el tiempo destructor que todo lo repite; en física clásica y cuántica los teoremas de recurrencia garantizan matemáticamente ese retorno. En cada campo la noción circular reaparece: incluso nuestras técnicas más modernas, como la simulación cuántica de sistemas físicos y químicos, dependen de poder controlar rigurosamente esas rotaciones cíclicas del estado. En otras palabras, el progreso científico (simulación de moléculas, materiales cuánticos, etc.) exige entender y manejar los ciclos subyacentes del tiempo. Así, la enseñanza final es que –como reza el mito del uroboro– el camino siempre regresa al comienzo, y el dominio de esos retornos determina la capacidad para avanzar en la simulación de la realidad. La aparente dicotomía entre la idea de progreso, tan valorada en la ciencia y la sociedad moderna, y la noción de recurrencia que subyace en muchos fenómenos naturales y filosóficos, revela una interconexión más profunda. Si bien la ciencia se esfuerza por avanzar y descubrir nuevas fronteras, a menudo lo hace identificando y aprovechando patrones y ciclos recurrentes inherentes al universo. El progreso científico, por lo tanto, puede interpretarse como una exploración cada vez más profunda de estos ciclos fundamentales. Los avances cruciales en la simulación de sistemas físicos y químicos, particularmente en el campo de la mecánica cuántica y la información cuántica, dependen intrínsecamente de la capacidad de utilizar y controlar las recurrencias inherentes a estos sistemas. La comprensión y el control de estas recurrencias son, por lo tanto, fundamentales para el futuro del avance científico y tecnológico, permitiendo el desarrollo de herramientas cada vez más poderosas para la simulación y el cómputo. La danza eterna del tiempo, con sus ciclos y retornos, no es solo un tema de reflexión filosófica y artística, sino también un principio fundamental que guía nuestra exploración científica del universo.



## Referencias


* J. L. Borges (1944). *Ficciones*. Emecé, Buenos Aires, pp. 71–76.
* J. L. Borges (1936). *Historia de la eternidad*. Emecé, Buenos Aires, pp. 362–375.
* F. Nietzsche (1882). *La gaya ciencia*. Alianza Editorial, Madrid, 1994, Aforismo 341.
* F. Nietzsche (1883–1885). *Así habló Zaratustra*. Alianza Editorial, Madrid, 1997, Parte III.
* A. Schopenhauer (1819). *El mundo como voluntad y representación*. Trotta, Madrid, 2006, Libro IV.
* F. de Goya y Lucientes (1820- 1823), *Saturno*, [Museo Nacional del Prado](https://www.museodelprado.es/coleccion/obra-de-arte/saturno/18110a75-b0e7-430c-bc73-2a4d55893bd6?searchMeta=saturno%20goya)
* P. P. Rubens (1636-1638), *Saturno devorando a un hijo*, [Museo Nacional del Prado](https://www.museodelprado.es/coleccion/obra-de-arte/saturno-devorando-a-un-hijo/d022fed3-6069-4786-b59f-4399a2d74e50?searchMeta=saturno%20rubens)
* F. Bloch (1946). *Nuclear Induction*. *Physical Review* 70, 460–473.
* M. A. Nielsen & I. L. Chuang (2000). *Quantum Computation and Quantum Information*. Cambridge Univ. Press.
* M. Reck, A. Zeilinger, H. J. Bernstein & P. Bertani (1994). *Experimental realization of any discrete unitary operator*. *Phys. Rev. Lett.* 73, 58–61.
* H. Poincaré (1890). *Sur le problème des trois corps et les équations de la dynamique*. *Acta Mathematica* 13, 1–270.
* P. Bocchieri & A. Loinger (1957). *Quantum recurrence theorem*. *Physical Review* 107, 337–338.
* L. S. Schulman (1978). *Note on the quantum recurrence theorem*. *Phys. Rev. A* 18, 2379–2380.
* S. Lloyd (1996). *Universal Quantum Simulators*. *Science* 273, 1073–1078.



<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px;">
  <iframe 
    src="https://www.youtube.com/embed/Lfa4kgiuQWE"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 12px;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

[{{< spotify type="album" id="5iT3F2EhjVQVrO4PKhsP8c?" width="100%" height="160" >}}]:#
[esto coloca un reproductor de muestras de spotify dado el id de la carpeta de spotify]:# 



[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 
