# blockchainForHealthcare20221001

# Prerequisite
1. Windows 10 machine or virtual machine (Processors: All CPUs)
2. Google Chrome
3. Git
4. Node.js v16.19.0 (Gallium)
5. Yarn (Use cmd to run this code to install: npm install --global yarn)
6. Truffle (Use cmd to run this code to install: npm install -g truffle)
7. Already following the videos in this playlist, from part 1 to part 7

https://www.youtube.com/playlist?list=PL54V-i7zW55d1VKxEkp9DCPt5k_zE6m3X

After following the videos, your pc should already have:

i. Google Chrome with Metamask

8. Github Desktop

# Installation
0. Make sure you meet the prerequisites
1. Use Github Desktop app to clone this repo into your github folder

https://github.com/Nksheng/blockchainForHealthcare20221001

2. Open your browser, and make sure MetaMask extension is logged in.
3. Go to metamask
4. Add Kaleido network to Metamask with the info from the WhatsApp group
5. Add accounts to Metamask by using two NODE files and relevant info from the WhatsApp group
6. Open cmd from this 'repo/Blockchain For Healthcare 20221001' folder
7. Type yarn install
8. Type yarn start
9. In the browser, go to localhost:4200 and click on admin
10. here is the dashboard of EHR Project

# FAQ
Q1: What if I want to open this project on Mac?

Mac users can try to prepare a VirtualBox Windows 10 virtual machine or equivalant. Windows Activation is not mandatory. With this virtual machine, Mac users can follow the steps above to open the project.

Q2: Why I cannot add doctor?

Due to a reported issue at github (https://github.com/shamil-t/ehr-blockchain/issues/15), a proper IPFS config is required to perform this feature properly. Check the installation section, step 1, to make sure your IPFS config ia set up correctly.

Q3: Why the virtual machine need to access all CPUs?

Node.js will not function properly and can produce error like assertion time error if not all CPUs are used. To reduce the chance of the assertion time error, the virtual machine have to access all CPUs to run properly. Before a yarn command is run, make sure the clock is sync by checking FAQ Q4.

Q4: Assertion failed when yarn install, what should I do?

Go to Windows settings, Time & Language, Date & time. Then sync the time again by click Sync Now button under Synchronise the clock.
