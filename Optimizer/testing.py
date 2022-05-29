from optimizer import Optimizer

# times=[0.428571428571429, 1.07142857142857, 1.28571428571429, 1.71428571428571, 2.14285714285714, 2.78571428571429, 3, 3.42857142857143, 3.85714285714286, 4.5, 4.71428571428571, 5.14285714285714, 5.57142857142857, 5.78571428571429, 6.21428571428571, 6.42857142857143, 6.85714285714286, 7.28571428571429]
#times = [0.23219955, 0.81269841, 1.30031746, 1.9969161,  2.36843537, 3.08825397, 3.62231293, 4.17959184, 4.89941043, 5.27092971, 5.96752834, 6.5015873, 6.98920635, 7.68580499, 8.03410431]

# Clave cubana Fernan
# times = [0.23219955, 0.60371882, 1.16099773, 1.55573696, 1.83437642, 2.39165533]

# Regueton Fernan
times = [0.53405896, 0.99845805, 1.41641723, 1.71827664, 2.18267574, 2.62385488,
 2.92571429, 3.39011338, 3.85451247, 4.31891156, 4.57433107, 4.99229025,
 5.31736961, 5.80498866]

op = Optimizer(sequence_times=times, balls=3, loop=True)

print(op.solve())

print(op.get_solution())

##################################################################################################################################################
