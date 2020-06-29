# idea for generating synthetic data
#
# ultimately: give a sequence of numbers (365 days), and which month
# has the highest value
# - NOTE - we might be doing 360 days (even length months)
# monthLens =  [31,28,31,30,31,30,31,31,30,31,30,31]

# Max can be confounded with min and with average.
#    - Max value should not be in the month with the least value as the range may be too highly salient
#   - Max value should not be in the month with the greatest mean as mean may be too highly salient
#

"""
Generate ratio data based on an interval comparison

Strategy:
* Identify threshold from the provided set of bounds
* Choose a direction to deviate from that threshold by delta
* Choose a category to assign that value
* Populate the remaining categories

Created on 8/1/2013

@author: dalbers (modified from gleicher)
"""

import numpy as N
import math
import basis as B
from numpy import linspace
from scipy.interpolate import UnivariateSpline
import random
import months
import matplotlib.pyplot as plt
#import matplotlib.mlab as msave
import csv
import pylab
import copy
import os
import shutil
import math
#import glob



# put all the data gen default parameters here so we can easily adjust them
# and document them without mucking with the code
# this is a list of tuples. first is the parameter name. second is value
# everything else is ignored (good for documentation)
# note: these can be used a keyword arguments to DataGen()
defaultCategories = 5
defaultAnswers = 1
datagenDefaults = [
    # in case we want to try different year lengths or data ranges
    #("daysyear", 360, "number of days in a signal"),
    ("numOptions", 3, "number of options in the question"),
    ("delta", .01, "difference to the threshold boundary"),
    ("direction", 1.0, "whether the value is above (1.0) or below (-1.0) the boundary"),
    # parameters for the curve that gets used to satisfy the constraints
    ("categories", ["Intellectual Disability", "Severe and Persistent Mental Illness", "Brain Injury", "Stroke", "Alzheimers"], "categories of the data"),
    ("thresholds", [.33, .66], "the question thresholds"),
    ("minValue", .05, "minimum data values")
    ]

class DataGen:
    def __init__(self, **kwargs):
        """
        we try to keep all parameters of the generation process as member
        variables so we can go back and tune them as necessary

        the constructor takes keyword arguments to set parameters see the
        defaults list datagenDefaults

        the driver function actually causes the data to be generated.
        the random noise generation (including month selection) is done at
        driver time, so that multiple calls to driver will yield different
        signals

        to get the signal, use the val method
        """
        # data generation parameters - get from above list (easier to document)
        # this needs to happen first, since we need daysyear
        for t in datagenDefaults:
            self.__dict__[t[0]] = t[1]
        for t in kwargs:
            if t not in self.__dict__:
                print ("WARNING: unknown parameter ",t)
            self.__dict__[t] = kwargs[t]
        # some things based on those
        self.numCategories = len(self.categories)
        self.values = []
        self.attempts = 0
        self.thresholdIdx = 0

    def driver(self):
        """This actually does a data generation process
        """
        # Reset the parameters of the data generation
        self.values = [0 for i in range(0, self.numCategories)]
        self.winningCategory = random.randint(0, self.numCategories-1)
        self.direction = 1.0 if random.random() < .5 else -1.0
        self.thresholdIdx = random.randint(0, len(self.thresholds)-1)

        # Choose the fixed answer values
        self.values[self.winningCategory] = round(self.direction * self.delta + self.thresholds[self.thresholdIdx], 2)
        print("winning value " + str(self.values[self.winningCategory]))

        # Fill in the remaining values
        for i in range(0, self.numCategories):
            if (i == self.winningCategory):
                continue
            elif self.values.count(0) == 1:
                self.values[i] = round(1.0 - sum(self.values), 2)
            else:
                remainingVals = self.numCategories - i - defaultAnswers
                self.values[i] = round(random.uniform(self.minValue, 1.0 - sum(self.values) - remainingVals * self.minValue), 2)
            print(self.values)

        if (not self.verify()):
            if (self.attempts < 100):
                self.attempts += 1
                self.driver()
            else:
                print("Failed to converge")
                self.attempts = 0
                self.values = []
                return

    def verify(self):
        # verify that the total values adds to 1
        print("current total is " + str(sum(self.values)))
        if (abs(sum(self.values) - 1.0) > .001):
            print ("Values don't sum to 1")
            return False

        # verify that no value is lower than the minimum
        for v in range(0, len(self.values)):
            if self.values[v] < self.minValue:
                print("Value less than minimum value for " + self.categories[v])
                return False

        # verify that the chosen value is within delta of the desired boundary
        if abs(abs(self.values[self.winningCategory] - self.thresholds[self.thresholdIdx]) - self.delta) > .001:
           print("Failed bounds check: " + str(self.values[self.winningCategory]))
           return False

        return True

# functional interface to the class
def datagen():
    d = DataGen()
    d.driver()
    return d


##############################################################################
## Data Generation and writeout

#Stimulus types -- true types will be generated
stimulusTypes = [("line",True),("scatter",True),("scrambled_scatter",True),
                ("color", True),("scrambled_color",True),("woven",True)]

#jnd_set: list of jnd values to generate
deltas = [.01, .02, .03, .04, .05, .10, .15]
gammas = [.01, .02, .03, .04, .05, .10, .15]

class StimulusBuilder:
    def __init__(self, outfile, **kwargs):
        #Clear the output directory
        if os.path.isdir(outfile):
            shutil.rmtree(outfile)
        os.mkdir(outfile)
        #Build the parameter set
        noiseNum = 0
        for param in stimulusTypes:
            self.__dict__[param[0]] = param[1]
        for t in kwargs:
            if t not in self.__dict__:
                print ("WARNING: unknown parameter ",t)
            self.__dict__[t] = kwargs[t]

        #Process the parameters
        for jnd in deltas:
            print ("delta = " + str(jnd))

            for gamma in gammas:
                print("gamma = " + str(gamma))
                #just do it n times to get a random sampling of winning months
                for m in range(0,defaultCategories):
                    dir_struct = self.buildDataSeries(outfile, jnd, gamma)
                #Draw the stimulus
                #if (self.line):
                #self.graphit(dir_struct[2])
                #    if not(os.path.isdir(outfile+"\\l_0_"+dir_struct[0])):
                #        os.mkdir(outfile+"\\"+"l_0_"+dir_struct[0])
                #    plt.savefig(outfile+"\\"+"l_0_"+dir_struct[0]+"\\"+dir_struct[1]+".png")
        #if (self.scatter or self.scrambled_scatter):
        #os.system("java -jar ScatterplotGenerator.jar %s " % outfile)
        #if (self.color or self.scrambled_color or self.woven):
        #os.system("java -jar ColorfieldGenerator.jar %s %s %s %s" %(outfile, self.color, self.scrambled_color, self.woven))



    def buildDataSeries(self, outfile, delta, gamma):
        #build the generator
        d = DataGen(delta=delta,gamma=gamma)#,maxV=(50,70),minV=(25,40)) #swapped peakJ for maxJ
        d.driver()
        if len(d.values) == 0:
            return None

        #build the data file
        #maxIdx = d.monthavs.index(N.max(d.monthavs))
        thresh = 0
        while thresh < len(d.thresholds) and d.values[d.winningCategory] > d.thresholds[thresh]:
            print(thresh, d.thresholds, d.winningCategory)
            thresh += 1
        dir_nmb = str(thresh) + "_" + str(d.winningCategory) + "_" + str(delta).zfill(3)
        #file_nmb = str(d.peakpos).zfill(2) + "_" + str(maxIdx).zfill(2)

        #Save the data values
        #msave.save(outfile+"\\"+dir_nmb+"_file_"+file_nmb+".txt",d.val())
        with open(outfile+"/"+dir_nmb+".csv", mode='w+') as csv_file:
            data_writer = csv.writer(csv_file, delimiter=',')
            data_writer.writerow(['name' , 'parent', 'value', 'image', 'color'])
            data_writer.writerow(['Category', "",""])
            for i in range(0, len(d.values)):
             #Add row1, row2 for chart drawing purpose, 1/31/2020
                row1 = ['Category','Category','Category','Category','Category',]
                row2 = ['../image/humanfill1.png', '../image/humanfill2.png', '../image/humanfill3.png', '../image/humanfill4.png', '../image/humanfill5.png']
                row3 = ['#a50026', '#f46d43', '#fee090','#74add1', '#313695']
                data_writer.writerow([d.categories[i], row1[i], d.values[i],row2[i], row3[i]])
            csv_file.close()
            print("wrote file: " + outfile+"\\"+dir_nmb+".csv")
        return [dir_nmb, d.values]

##############################################################################
## Graphing function

    def graphit(self, x=False,stripe="0.75",fsize=(6,4)):
        indicator = len(x)
        f = plt.figure(1,figsize=fsize)
        f.clf()
        for a in range(1,defaultMths):
            plt.axvline(a*defaultMLen,color=stripe)     #span, not line
        pylab.plot(x)
        f.axes[0].set_xlim(0,indicator)
        f.axes[0].set_ylim(0,500)
        f.axes[0].set_xticks( [ i*defaultMths+defaultMths/2 for i in range(0,defaultMths)])
        f.axes[0].set_xticklabels(monthNames)
        pylab.show()
        return f

monthNames = ["1998","1999","2000","2001","2002","2003",
              "2004","2005","2006","2007","2008","2009",
              "2010", "2011", "2012", "2013", "2014", "2015"]

def run(outfile):
    b = StimulusBuilder(outfile)

run("../Data/ratio1")
