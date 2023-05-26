from json import dumps
from matplotlib.backends.backend_svg import FigureCanvasSVG
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sys
import io

arg_string = sys.argv[1]
arg_values = arg_string.split(',')

data1 = []
data2 = []

tit1 = arg_values[0]
tit2 = arg_values[1]

for value in arg_values[2::2]:
    data1.append(value)

for value in arg_values[3::2]:
    data2.append(value)

series = [data1, data2]

#series = [('red', 'blue', 'red', 'red', 'blue', 'green', 'yellow', 'magenta'), ('M', 'F', 'F', 'M', 'F', 'F', 'M', 'F')]

characteristics = np.array(series[0])
values = np.array(series[1])

dataset = pd.DataFrame({'char': characteristics, 'values': values})

data = {}

for value in dataset['values'].unique():
    arr = []
    for color in dataset['char'].unique():
        counts = dataset[(dataset['values'] == value) & (dataset['char'] == color)]['char'].count()
        arr.append(counts)
    data[value] = np.array(arr)

chars = np.array(dataset['char'].unique())

width = (1.8 / chars.size)

fig, ax = plt.subplots()
bottom = np.zeros(chars.size)

for val, val_count in data.items():
    p = ax.bar(chars, val_count, width, label=val, bottom=bottom)
    bottom += val_count
    ax.bar_label(p, label_type='center')

ax.set_title(tit1 + ' by ' + tit2)
ax.legend()

#plt.show()
plt.savefig('foo.png')
svg_io = io.StringIO()
plt.savefig(svg_io, format='svg')
svg_string = svg_io.getvalue()
svg_io.close()
print(svg_string)