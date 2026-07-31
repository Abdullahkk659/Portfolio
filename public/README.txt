me.jpg                        900x1200 — treated portrait used by the hero card
me.webp                       same image, ~half the weight
me-cutout.png                 transparent PNG of the same grade
abdullah-abdul-qudoos-cv.pdf  served by the Download CV button

The photo treatment (cutout, cool duotone, neon rim light, background) is baked into the
file, which is why globals.css sets `filter:none` on the portrait. Adding a CSS grayscale
filter back would strip the neon.
