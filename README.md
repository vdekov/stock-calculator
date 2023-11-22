# stock-calculator

## Short info
The application is based on:
 - client: Vite (React + TypeScript), Vitest (testing framework) 
 - server: NestJS (powered by NodeJS 20.9), Jest (testing framework)
 - database: MySQL 5.7

The history data in the database can be accessed for the following period:
 - From: `Mon Nov 06 2023 18:53:16 GMT+0200 (Eastern European Standard Time)`
 - To: `Sat Nov 18 2023 19:13:15 GMT+0200 (Eastern European Standard Time)`

## Run in production mode
```
docker-compose -f docker-compose.prod.yml up --build -V
```

## Run in development mode
```
docker-compose up --build
```

## Usage
 - client access: http://localhost:5173
 - server access: http://localhost:3000
 - mysql access: localhost:3307 (user `root` without password)

**Note:** Make sure all three system ports `3000`, `3307` and `5173` are free to use.

## Manually import SQL data
By default the database will be populated on the initial start of the MySQL container,
but in case you need to do it manually, you can run the following command:
```
docker exec -i stock-calculator-database mysql -uroot stock_calculator < ./db/dump/init.sql
```

## Tests
 - client: 100% coverage
 - server: 65.48% coverage