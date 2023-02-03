# API Endpoints
/users/
- create
  - name=USERNAME
- edit
  - oldname=OLD_USERNAME
  - newname=NEW_USERNAME
- find
  - name=USERNAME

/users/USERNAME/watchlist
- create
  - name=WATCHLISTNAME
- delete
  - name=WATCHLISTNAME
- add
  - name=WATCHLISTNAME
  - id=MOVIE_ID
- remove
  - name=WATCHLISTNAME
  - id=MOVIE_ID
- find
  - name=WATCHLISTNAME