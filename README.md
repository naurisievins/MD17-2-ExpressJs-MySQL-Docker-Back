# Blog app backend + MySQL

<b>Run MySQL in Docker:</b>


`docker run --name=nrnk-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_ROOT_HOST=% -d nrnk/mysql-server`


`docker exec -it nrnk-mysql bash`


`mysql -uroot -p`


Enter password: `123456`


`CREATE DATABASE blog;`


type `\q` to exit mysql


type `exit` to exit bash


Change directory to where 'blog.sql' file from this repo is located `cd ...`


`docker exec -i nrnk-mysql mysql -uroot -p123456 blog < blog.sql`


<b>Run Backend:</b>\
`npm i` and then `npm run start:nodemon`

Run Frontend: https://github.com/naurisievins/MD17-1-React-Front