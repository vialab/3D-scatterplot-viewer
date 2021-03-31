# 3D-scatterplot-view

Dependencies:
- NodeJS
- npm (comes with Node)

To prepare to run the previewer, open the Dist folder in the terminal and run ```npm install```

To run the previewer, run ```node .``` in a terminal from the dist folder. This will start the web server on localhost:8080

When you open localhost:8080 in your web browser, the previewer will have the Iris dataset loaded in.
It will display a fully interactable 3D scatterplot as well as the orthographic views for each side of the cube (scroll to see them).

To add a dataset to the viewer, add the dataset's file into the folder Dist/datasets. Datasets are expected to formatted as comma separated values (csv).

To load the dataset into the viewer, fill out the form at the top of the page. The fields are as follows:

- Dataset name
  - The file name of the dataset to load (contained in Dist/datasets).

- Dataset Dimension
  - The amount of values in each entry of the dataset. Inputting the wrong value here will have unexpected results..
  
- Data Point Offsets
  - The offset from the beginning of each entry which to load the x, y, and z values. None of the offsets should be the same, nor should they be greater than or equal to the dataset's dimension, or unexpected results will occur. These values are 0-indexed.
 
 Click the Load button to load the dataset. There is no indicator while the dataset is loading, but there will be an error message if it fails.

The default view should look like this:

![ScreenShot](3d-scatterplot-view.PNG)
