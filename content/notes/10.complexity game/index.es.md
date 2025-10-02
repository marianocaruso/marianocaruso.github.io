---

title: "Complejidad computacional" # va al índice de notas
date: 2025-05-05
showDate: false
summary: "comprobandola por hartazgo"
# description: "nota 2" #creo que no sirve para nada
draft: false # true="no se muestra en la web"
showReadingTime: false
tags: [computational complexity, game]
math:  true  

---


{{< katex >}}

## objetivo
Formar una cuadrícula de piezas tales que en cada uno de sus lados contiguos coincidan forma y color.

## descripción

Se trata de un puzzle simple, en tanto que no tienen bordes que encastrar, pero complicados porque a priori pueden ir de cualquier forma. La idea es que la persona que lo intente compruebe por hartazgo la rapidez con la que crece el tiempo promedio de resolución con solo pasar de un simple 2x2 a un 3x3. El efecto de confirmar que un 2x2 se puede armar en un tiempo breve, pero no suele ser así con solo con un 3x3, permite tirar por tierra las expectativas que pueda hacerse el ludócuata de turno. Para los jugadores más resistentes, se puede armar un 4x4, etc.


Una vez comprobadas las ganas morir que entran por no completar el puzzle, se puede introducir el concepto de cómo lo resuelve una computadora que pruebe todas las opciones en las que pueden ser localizadas las piezas (muchísimas de las cuales no resuelven el puzzle), este número se puede expresar matemáticamente y dependiendo de lo que conozca el jugador se puede verificar analíticamente cómo crece el tiempo promedio de resolución con la cantidad de piezas del puzzle.
El juego consiste en disponer piezas sin bordes “tradicionales” de encastre, lo que hace que la colocación sea más libre. El desafío radica en que, conforme crece el tamaño de la rejilla (2x2, 3x3, etc.), el tiempo promedio para resolver el puzzle aumenta rápidamente, ilustrando así el fenómeno de la explosión combinatoria.


<iframe src="/juegos/puzzle_x-o/index.html"
        style="width: 150%; height: 800px; border: none;"
        loading="lazy"
        allowfullscreen>
</iframe>


[{{< spotify type="album" id="5iT3F2EhjVQVrO4PKhsP8c?" width="100%" height="160" >}}]:#
[esto coloca un reproductor de muestras de spotify dado el id de la carpeta de spotify]:# 



[3 tipos de imagen https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images ]:# 
[feature: coloca afuera y adentro esa imagen]:# 
[thumb coloca afuera esa imagen]:# 
[cover coloca adentro esa imagen]:# 
