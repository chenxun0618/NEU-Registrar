##############      FRONT END TESTING README + INSTRUCTIONS     #########

Version 1.0 by Aditya Parmar

Introduction:

Testing this app is done through a combination of js plugins which can be found on npm; testing is done through the command line with karma.



Setup:

First, all necessary plugins must be installed on your machine to run tests.

If you do not already have node package manager (henceforth npm) you should acquire it as it will expedite the process immensely.

They are:
AngularJS, angular-route, angular-mocks, karma, jasmine, karma-jasmine, jasmine-core, karma-cli, karma-coverage (if you wish to view a coverage report).

They can be installed with the following commands

npm install -g angularjs
npm install -g angular-route
npm install -g angular-mocks
npm install -g karma
npm install -g jasmine
npm install -g karma
npm install -g karma-jasmine
npm install -g jasmine-core
npm install -g karma-cli
npm install -g karma-coverage

(these may require admin level privileges, so run accordingly if prompted)

once these are installed successfully, verify their presence, you must now create a config file for karma.

option 1: use the provided config file, karma.conf.js in the project, and replace the paths in the file to those relative to your computer

option 2: open a command prompt and enter the following command to create a configuration file required to run karma.

karma init <config-file-name>

enter the parameters as you are prompted to do so to create a custom config file. (not recommended)



Execution:

once this is done, navigate to the folder where the config file is located, and run the following command:

karma start.

if you were successful, the screen should say something like this on top:

Karma v1.6.0 server started at http://0.0.0.0:9876/

to access coverage, a file called coverage should have been created on your computer, and within it, index.html contains the coverage report.
