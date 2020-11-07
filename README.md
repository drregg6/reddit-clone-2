# Title
> A quick blurb of the purpose of this app. Who was it built by, who was it built for, why was it built, and what does it use?

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [License](#license)
* [Contact](#contact)

## General info
A longer version of the description featuring details of the project. It might explain what the user is capable of doing. It could highlight the technologies used in the project. It could detail the flow of the project, like CRUD, and how it interacts with certain tech. User restrictions. Etc.

## Screenshots
![screenshot](./src/images/imagename.png)

## Technologies
* Node - version 12.3.1
* React - version 16.13.1
* Sass - version 1.26.5

## Setup
1. Clone the repo
```sh
git clone https://github.com/drregg6/repository.git
```
2. Install NPM packages
```sh
npm install
```
3. [Get API key, Highlight changes that need to be made, etc...]

## Features
List of features ready and TODOs for future development
* ADD FEATURE
* ADD FEATURE
* ADD FEATURE

To-do list:
* ADD TODO
* ADD TODO
* ADD TODO

## Status
Project is: _in progress_, _launched_, or _done_

## Inspiration
The project is a inspired by [Vishang](https://dev.to/vish448/create-react-project-without-create-react-app-3goh)

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Dave Regg - [@daveregg](https://www.twitter.com/daveregg) - dave.r.regg@gmail.com

Project Link: [Title goes here](URL goes here)

# Full Stack Reddit Clone with Firebase Firestore, Vue.js/Vuex, Bulma

* [x] Generate Vue App
* [x] Create Firebase Project
* [x] Add Firebase Auth
  * https://firebase.google.com/docs/auth/web/google-signin
  * https://firebase.google.com/docs/auth/web/manage-users
* [x] Save user on login
      * [x] Update Rules
* [x] Add a few subreddits in Firestore
  * philadelphia
  * programming
  * pics
  * funny
* [x] Show Subreddits on Home Page
* [x] Show Single Subreddit
* [x] New Post Form
  * Update Rules
* [x] Display Posts on Subreddit Page
  * Types: Image/Text/Url


## Extra
* [x] Hide submit form if not logged in
* [x] Show Usernames
* [x] Show User Images
* [x] Format Dates
* [x] Fix card formatting
* [x] Search/Filter Posts
* [x] UpVote/DownVote Posts
  * Update Rules
  * [ ] Order by total score
  * [ ] Order by created
* [ ] Add comment to Post
  * Update Rules
* [ ] User Profile
  * [ ] Show Submitted Posts
  * [ ] Show UpVoted Posts
  * [ ] Show Comments
* [x] Edit Post
* [ ] Edit Comment
* [ ] UpVote/DownVote Comment
* [ ] Reply to Comment
* [ ] Display Error Image if bad link/error
* [ ] Cloud Function Score Aggregator (?)
  * https://firebase.google.com/docs/firestore/solutions/aggregation#solution_cloud_functions
* [x] Delete Post
  * [x] Cloud Function "Cascade Delete" comments
* [ ] Upload Images to Firebase storage

## Resources

* https://angularfirebase.com/tag/firestore/

![](./ERD.png)