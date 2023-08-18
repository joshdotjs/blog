import numpy as np
import matplotlib.pyplot as plt

# Generate an array of x values
x = np.linspace(0, 2 * np.pi, 1000)

# Compute the corresponding y values
y = np.sin(x)

# Plot the sine wave
plt.plot(x, y)
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.show()