# stock-calculator

## Run production build
```
docker-compose -f docker-compose-server.yaml up --build -V
```

## Manually dump SQL data
```
docker exec -i stock-calculator-database mysql -uroot stock_calculator < ./db/dump/init.sql
```