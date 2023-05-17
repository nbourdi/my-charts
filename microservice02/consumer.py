from json import dumps
#from pymongo import MongoClient
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sys


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
# print(tit2)
#print(data)'''
#series = [('red', 'blue', 'red', 'red', 'blue', 'green', 'yellow', 'magenta'), ('M', 'F', 'F', 'M', 'F', 'F', 'M', 'F')]

#print("consumer.py talking")

characteristics = np.array(series[0])
values = np.array(series[1])

dataset = pd.DataFrame({'char': characteristics, 'values': values})

data = {}

for value in dataset['values'].unique():
    arr = []
    for color in dataset['char'].unique():
        counts = dataset[(dataset['values'] == value) & (dataset['char'] == color)]['char'].count()
        arr.append(counts)
    print(arr)
    data[value] = np.array(arr)

print(data)
chars = np.array(dataset['char'].unique())
print(chars)
width = (1.8 / 1.2)

fig, ax = plt.subplots()
bottom = np.zeros(chars.size)

for val, val_count in data.items():
    p = ax.bar(chars, val_count, width, label=val, bottom=bottom)
    bottom += val_count
    ax.bar_label(p, label_type='center')

#ax.set_title(tit1, ' by ', tit2)
ax.legend()

plt.show()
plt.savefig('foo.png')