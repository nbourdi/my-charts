from json import dumps
from matplotlib.backends.backend_svg import FigureCanvasSVG
import matplotlib.pyplot as plt
import numpy as np
import sys
import io

arg_string = sys.argv[1]
arg_x_value = arg_string.split(',')

length = arg_x_value[0]
length = int(length)
x_tit = arg_x_value[1]
y_tit = []
for i in range(2, 2 + length):
    y_tit.append(arg_x_value[i])
x = []
y = []

idx = 2 + length
arg_x_value = arg_x_value[idx:]
for idx, value in enumerate(arg_x_value):
    if idx % (length + 1) == 0:
        x.append(value)
    else:
        y.append(value)

y_all = {tit: [int(y[i]) for i in range(index, len(y), len(y_tit))] for index, tit in enumerate(y_tit)}

fig, ax = plt.subplots()
ax.stackplot(x, y_all.values(),
             labels=y_all.keys(), alpha=0.8)
ax.legend(loc='upper left')
ax.set_xlabel(x_tit)
plt.savefig('foo.png')
plt.close()

plt.savefig('foo.png')
svg_bytes = io.BytesIO()
canvas = FigureCanvasSVG(fig)
canvas.print_svg(svg_bytes)
plt.close()

svg_string = svg_bytes.getvalue().decode()
#print(svg_string)'''