# Symbiotic Encounter

![Interactive Morphing Wall](/images/projects/diagram-morph.png)


```wwh
Why: Contemporary kinetic architecture often depends on motorized systems that are mechanically complex, energy-intensive, noisy, and maintenance-heavy. This project aimed to investigate whether Shape Memory Alloys (SMAs) could offer a materially embedded alternative — enabling architectural responsiveness through solid-state actuation rather than external machinery — while also exploring how a responsive surface might acknowledge human presence and reduce the psychological neutrality of static space.

---
What: The outcome is a morphing wall prototype composed of a parametrically generated 3D-printed surface, embedded NiTi SMA wires, a custom current-driver circuit, and an Arduino-based sensing and control system. Using ultrasonic proximity detection, the wall activates localized SMA contraction to produce controlled surface deformation, achieving silent, motor-free kinetic interaction through lightweight components and a stretchable textile amplification layer.

---
How: Through iterative prototyping, we tested multiple mechanical linkages, rejected rigid hinge systems, and ultimately developed a hybrid system combining 3D-printed nodes and elastic textile to amplify limited SMA strain. I designed and tuned the driver circuit using MOSFET switching to safely deliver required current, programmed Arduino logic for proximity-based activation cycles, optimized G-code for complex surface printing, and integrated housing, structural framing, and final assembly into a cohesive, functioning MVP.
```


```video
src: https://stream.mux.com/5015ZQXy8Ryvbn5MpgDJEetR9Ygt00iQVC8yQObBBBUOE.m3u8
poster: /images/projects/morph/morph-3.jpg
controls: true
autoplay: true
loop: true
muted: true
aspectRatio: 16 / 9
caption: Morphing Wall
```

## Project Overview

The Interactive Morphing Wall project represents an innovative approach to smart home technology, combining shape memory alloys with digital control systems to create dynamic, responsive wall surfaces. This cutting-edge project explores the intersection of materials science, robotics, and user experience design to create living, breathing architectural elements.



```gallery
aspectRatio: 14 / 9
seconds: 5
item: /images/projects/morph/morph-1.jpg | Morphing Wall
item: /images/projects/morph/morph-3.jpg | Human Scale
item: /images/projects/morph/morph-2.jpg | Sensory Syetem
item: /images/projects/morph/morph-5.jpg | Production
item: /images/projects/morph/diagram-morph-8.jpg | Back-end
```


```card2
size: 2/3
title: Mobility Innovation
thumb: /images/projects/ignik-outdoors-thumb.jpg


# Material-Native Kinetics

---
### Responsive surfaces activated at the material level, not through motors.
```

```card2
size: 1/3
title: Design Strategy
thumb: /images/projects/ignik-outdoors-thumb.jpg

# Responsive Interaction

---
### Architecture that feels, moves, and acknowledges presence silently.
```
```card2
size: 1/3
thumb: /images/projects/ignik-outdoors-thumb.jpg

# Intelligent Surface Systems

---
## Smart installation blending sensing, actuation, and form.
```

```card2
size: 2/3
thumb: /images/projects/ignik-outdoors-thumb.jpg

# Beyond Mechanics

---
## A pathway to lighter, quieter, and maintenance-minimal kinetic architectural elements.
```
<!-- bg:none -->

# The Challenge

### Mechanical Constraint
Initial mechanisms relied on rigid joints and linkages to translate SMA contraction into visible motion, but these added weight and reduced efficiency. Recognizing the limited strain capacity of SMA wires, we pivoted toward an elastic intermediary: a stretchable textile membrane layered beneath the printed surface. This reduced mechanical complexity and amplified movement through material behavior rather than hardware.

### Custom Driver Design
SMA wires require precise high-current delivery for Joule heating. Off-the-shelf solutions proved unstable or unsuitable, so I designed a dedicated driver circuit using MOSFET switching and protective components. Thermal testing cycles were conducted to balance activation speed, repeatability, and material longevity, ensuring reliable phase transformation without overheating.

![Design Diagram](/images/projects/morph/diagram-morph-2.png)
```album3
image1: /images/projects/morph/diagram-morph-4.png
alt1: Circuit Diagram
image3: /images/projects/morph/diagram-morph-3.png
alt3: SMA Diagram
leftRatio: 1
rightRatio: 1
gap: 1
topAspect: 11 / 9
fit: contain
rightImageWidth: 86%
rightImageHeight: 100%
noGlass: true
```

### Proximity Logic
Several sensing methods were evaluated before selecting ultrasonic detection for consistent, contactless presence measurement. I implemented threshold logic and timed activation sequences in Arduino to prevent oscillation, allow cooling cycles, and create spatially staged morphing behavior rather than binary motion.
### Fabrication Strategy
The biomimetic surface, generated parametrically in Grasshopper, introduced variable depth and curvature that complicated printing. G-code was iteratively refined to maintain structural integrity while minimizing while-print risk of failiure. Component housing, frame fabrication, and system integration were developed in parallel to ensure assembly coherence.

![System Diagram](/images/projects/morph/diagram-morph-6.png)

### System Architecture Design
At each technical obstacle, the solution simplified rather than complicated the system. Heavy mechanisms were replaced by material intelligence, external motion by embedded actuation. The result is a responsive surface achieved through integration, not addition.

## Core Concept
The formal idea came from not so deep into oceans, The Coral Reefs, the mesmerizing creatures in danger of mass death caused by human activities, with the hope that this symbol might remind ourselves to be more thoughtful on how we treat our environemet.
![Interactive Morphing Wall](/images/projects/morph/morph-concept-1.png)


```extlink
title: Partner's Portfolio
url: https://issuu.com/mitrarc/docs/mitra-bagheri
openInNew: true
```