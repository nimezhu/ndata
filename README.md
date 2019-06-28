# Nucleome Data

*Nucleome Data* is a GUI Client Application for *Nucleome Browser* users to host bigWig, bigBed and .hic data from local drive or internet, and browsing them in *Nucleome Browser* with other available data. 
If you are looking for a command line tool to host data in servers instead of your personal computer, please visit this website [Nucleome Server](https://github.com/nimezhu/cnbData) instead.

## Quick Start
Please download the example file and the correspoding executable binary file for your computer OS. This example file for demostration contains a web link of hg19 MTA ChIP Seq peaks bigBed file from [Encode Project](https://www.encodeproject.org/). In this case, with only a few clicks, user can browsing these peaks in *Nucleome Browser*.

### Download Input Example File
- [Example Input File](https://vis.nucleome.org/static/ndata/cnb.xlsx)

### Download Binary Executable Program

- [Linux](https://vis.nucleome.org/static/ndata/current/linux/ndata)

- [Windows](https://vis.nucleome.org/static/ndata/current/win64/ndata.exe)

- [MacOS](https://vis.nucleome.org/static/ndata/current/mac/ndata)

### Start Nucleome Data Service

In Mac or Linux, start a terminal and change work directory to where you put the `ndata` file. Start this program with command line below.

`chmod 755 ndata`

`./ndata`

in Windows 

Just double click `ndata.exe`.

Then follow the steps in GUI Application to add input file and start data service.


## Input Excel 
### Format
The input for Nucleome Data is a simplified Excel/Sheets version for [trackHub](https://genome.ucsc.edu/goldenpath/help/hgTrackHubHelp.html) format. 

For each track, we just need to know what is its name and where the file is.

“shortLabel” , “uri,metaLink,longLabel”



## Manage data

### Remote bigWig and bigBed Indexes
*Nucleome Data* will create a directory `.cnbData` in your `$HOME` directory. All the remote bigWig and bigBed's indexes will be fetched and stored into `.cnbData/index` according to the URIs. On average the index file size is one percent of the original file. Unfortunately these local index won't be automatically updated if the file in corresponding web link changes. If that happens, please delete the index file manually. 

