## Blogs For Everybody!

**“Blogs for Everybody!”** or *Bfore* is a minimalist blog cum notepad which has simple
user interface and simpler authentication. 
From the hassles of storing and sharing a scribble to penning down text articles with or without some handshake
protection is what has been the intent behind designing this application.
Built on MEAN stack, scalability or extensibility would hardly be an issue in future
where we expect to take along this project. 

## Overview

*First off, it's sloppy! Excuse me but the excuse of bad Angular isn't it being a HelloWorld project.*

This online submission system supports following users
- **Poster**
- **Peer**

###### Functionalities for a Poster
- Save & share his writings with anyone he wishes to. All he needs to do is
share the ‘secret code’.
- Revisit his blogs/scribbles to attend to the recent comments
- Edit his previous posts through the use of a second ‘secret code’ (for
authentication).

###### Functionalities of a Peer
- View any of the posts of which he has the code.
- Comment on those posts.

*The best part about this is that a peer and a poster can be a peer and poster!*

###### Technologies Involved
- Angular CLI v1.5.0
- MongoDB Enterprise v3.4.9
- npm v5.5.1
- node v9.1.0
- express
- body-parser
- [nthline](https://www.npmjs.com/package/node-nthline)
- jQuery  - duh!

Unused modules - bootbox and popups

###### What It Has and What It Doesn't
- [x] Read-only-save Feature
- [x] RW-save Feature
- [x] Comments Section
- [ ] Restructuring into appropriate components (Sorry for the cringe!)
- [ ] Decent Looks ( Not the excuse for minimalism!)
- [ ] E2Es 
- [ ] Icon file
- [x] Things that I cannot see 'cuz of naivity!

## How To Use

Run the following in the order

- Open a terminal and start `mongod` server at the default port (27017)
- Open up another terminal. Navigate to the `bfore` folder.
- Run `node server`.
- Fire up the browser and hit `http://localhost:3000`


> This project was developed for my course **Advanced Web Technologies** of VIIth semester at BMSCE, Bangalore.

> This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.
