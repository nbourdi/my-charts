from json import dumps
from matplotlib.backends.backend_svg import FigureCanvasSVG
import matplotlib.pyplot as plt
import numpy as np
import sys
import io

arg_string = sys.argv[1]
arg_x_value = arg_string.split(',')

data1 = []
data2 = []

tit1 = arg_x_value[0]
tit2 = arg_x_value[1]

for value in arg_x_value[2::2]:
    data1.append(value)

for value in arg_x_value[3::2]:
    data2.append(value)

series = [data1, data2]

#radii = [5.0, 8, 3.0, 6.2, 4.5, 9.1, 2.7, 7.3]
#width = [0.5, 0.8, 0.3, 0.7, 0.6, 0.9, 0.3, 0.2]

radius = np.array(series[0])
width = np.array(series[1])

radius = [float(x) for x in radius] #they're strings, to plot them need floats
width = [float(x) for x in width]

N = len(radius)

theta = np.linspace(0.0, 2 * np.pi, N, endpoint=False)
colors = plt.cm.viridis(np.array(radius) / 10.)

fig, ax = plt.subplots(subplot_kw={'projection': 'polar'})
ax.bar(theta, radius, width=width, bottom=0.0, color=colors, alpha=0.5)
ax.set(title=tit1 + ' by ' + tit2)

#plt.show()
plt.savefig('foo.png')
svg_io = io.StringIO()
plt.savefig(svg_io, format='svg')
svg_string = svg_io.getvalue()
svg_io.close()
print(svg_string)