# dat-hansard

First, thanks to [Open Australia](http://openaustralia.org) for making this data so easily available.

My purpose in making this is to make [Dat](http://dat.land) archives of the data

## Datasets

* Members information
* House of Representatives Hansard transcripts
* Senate Hansard transcripts

The archived datasets are listed above. You can clone them yourself by just running:

```
# These clone commands just do a one-time download of the data (in total about 1.1G)

dat clone 429826844b9804dd0188bb67f5eec8a9071014055f2d18e73e2dbc0aa741af61 members
dat clone 78c03a7a9b8dd0c3e3aad36cdea9f463b1ec50b9dae14f6522fbbf8ea0a4a2bf senate_debates
dat clone b53782dc9ca0c8d04d17532349939c75b77f9074b35a8830afe4107c0181f227 representatives_debates

# And then sync them to pick up new changes & so that there are more peers out there mirroring the data

dat sync members
dat sync senate_debates
dat sync representatives_debates

```

If you find that these archives have fallen behind, no one is mirroring them, etc. then it might be time to run this software yourself and create new archives. But for now, the best thing would be to mirror them by installing dat and running the commands above.

## Installation

```
npm install -g dat-hansard
```

## Running the script

```
# Will create archives as directories in the current working directory
dat-hansard 
# Will create archives as directories in /path/somewhere
dat-hansard -d /path/somewhere
```