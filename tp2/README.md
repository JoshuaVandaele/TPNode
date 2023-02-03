# API Endpoints
`/users/`  
Create a new user
- create
  - name=USERNAME
  
Edit an existing user
- edit
  - oldname=OLD_USERNAME
  - newname=NEW_USERNAME
  
Find an existing user by name
- find
  - name=USERNAME

`/users/USERNAME/watchlist`  
Create a watchlist
- create
  - name=WATCHLISTNAME
  
Delete a watchlist
- delete
  - name=WATCHLISTNAME

Add a movie to a watchlist
- add
  - name=WATCHLISTNAME
  - id=MOVIE_ID

Remove a movie from a watchlist
- remove
  - name=WATCHLISTNAME
  - id=MOVIE_ID

Find a watchlist by name
- find
  - name=WATCHLISTNAME