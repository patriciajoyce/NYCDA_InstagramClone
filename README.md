# NYCDA_InstagramClone

## Contributors/Feature Owners
- Elena - FrontEnd Framework (html5)
- Joy - Server/API (express.js)
- Oz - Database/Model (SQLite)

## Features Achieved
- Authenticating Users
- Creating Posts
- Supporting Followers
- Supporting Feeds       


## Instructions

1. Clone the repository

2. Start server

		-- open Terminal
		-- cd to folder
		-- npm install
		-- npm start

3. Welcome to instaOZsome! -> Open index.html file to start on login page

		-- Create an account -or- Sign into account(use fake account info):
			- Username: Oz
			- Password: password
		// find login code in main.js file //
		// option to rmember log in information	//
		// be aware that both username and password are case sensitive //

4. Server should console "is authenticated []" if login is successful.

5. Once you have logged in, navigate page like so:

		-- Open into "Home" (home.html): AKA your feed. This is where you can view posts of the users you follow

		-- Click on "Profile" (profile.html): This is where you access your basic instaOzsome actions, such as, deactivating your account and creating a post by uploading a file from your machine.

		-- Click on "Find Some Friends" (findFriends.html). Here you can view other users that are registered into the instaOzsome database WITH the options to follow or unfollow them. You can see their email and username that are in the datebase, as well.

		-- Logout, BYE!
