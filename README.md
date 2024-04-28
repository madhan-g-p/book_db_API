| METHOD   | API                 | PARAMS               |
|----------|---------------------|----------------------|
| GET      | /book-entry         |      -               |
| GET      | /book-entry/:isbn   |   isbn               |
| POST     | /book-entry         | title,author,        |
|          |                     | isbn,publication_date|
| PUT      | /book-entry         | title,author,        |
|          |                     | isbn,publication_date|
| DELETE   |/book-entry/:isbn    | isbn                 |

# The above 4 methods are implemented with postgres database evaluator just need to run dbConnection/setupDB.js fileto setup database tables