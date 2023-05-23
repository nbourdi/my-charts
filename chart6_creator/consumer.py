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

#series = [(1, 2, 3, 4, 5, 6, 7, 8, 9), (10, 24, 9, 17, 5, 31, 23, 15, 8)]

y_value = np.array(series[1])
x_value = np.array(series[0])

y_value = [int(x) for x in y_value] #they're strings, to plot them need integers
x_value = [int(x) for x in x_value]


fig, ax = plt.subplots()
plt.stem(x_value, y_value)

plt.xlabel(tit2)
plt.ylabel(tit1)
plt.title(tit1 + ' by' + tit2)

#plt.show()
plt.savefig('foo.png')
svg_io = io.StringIO()
plt.savefig(svg_io, format='svg')
svg_string = svg_io.getvalue()
svg_io.close()
print(svg_string)