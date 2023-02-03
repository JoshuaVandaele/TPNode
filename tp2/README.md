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

Find a watchlist by name
- find
  - name=WATCHLISTNAME

Add a movie to a watchlist
- addmovie
  - name=WATCHLISTNAME
  - id=MOVIE_ID

Remove a movie from a watchlist
- removemovie
  - name=WATCHLISTNAME
  - id=MOVIE_ID

Lists the movies in a watchlist
- listmovies
  - name=WATCHLISTNAME
  - *lang=LANGUAGE (en, fr, etc)*
  - *rating=RATING*
  - *year=RELEASEYEAR*