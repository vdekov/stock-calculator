# stock-calculator
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

## Manually import SQL data
```
docker exec -i stock-calculator-database mysql -uroot stock_calculator < ./db/dump/init.sql
```