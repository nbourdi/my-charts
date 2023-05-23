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
data3 = []

tit1 = arg_x_value[0]
tit2 = arg_x_value[1]
tit3 = arg_x_value[2]
for value in arg_x_value[3::3]:
    data1.append(value)

for value in arg_x_value[4::3]:
    data2.append(value)

for value in arg_x_value[5::3]:
    data3.append(value)

series = [data1, data2, data3]

y = np.array(series[0])
x = np.array(series[1])
color = np.array(series[2])

y = [float(x) for x in y] #they're strings, to plot them need integers
x = [float(x) for x in x]
color = [int(x) for x in color]
#x = [0.1, 0.3, 0.2, 0.5, 0.8, 0.6, 0.4, 0.7, 0.9, 0.3]
#y = [0.5, 0.7, 0.4, 0.9, 0.2, 0.3, 0.6, 0.1, 0.8, 0.4]
#color = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2]
#size = [50, 100, 75, 120, 60, 90, 80, 110, 70, 95]
#size = []
fig, ax = plt.subplots()

scatter = ax.scatter(x, y, c=color) #, s=size

legend1 = ax.legend(*scatter.legend_elements(),
                    loc="lower left", title="Classes")
ax.add_artist(legend1)

#if(len(size) > 0 ):
 #   handles, labels = scatter.legend_elements(prop="sizes", alpha=0.6)
 #   legend2 = ax.legend(handles, labels, loc="upper right", title="Sizes")

#legend2 = ax.legend(handles, labels, loc="upper right", title="Sizes")

plt.savefig('foo.png')
svg_io = io.StringIO()
plt.savefig(svg_io, format='svg')
svg_string = svg_io.getvalue()
svg_io.close()
print(svg_string)