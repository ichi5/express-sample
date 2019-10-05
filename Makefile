start:
	docker-compose up -d --build

stop:
	docker-compose stop

login:
	mysql -h 127.0.0.1 -P 13306 -u root -proot express_db_local
