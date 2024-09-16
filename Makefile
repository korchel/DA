# Быстрая пересборка только измененного кода
restart-fast:
	sudo docker-compose up -d --no-deps --build app

logs:
	sudo docker-compose logs

stop:
	sudo docker-compose stop

start:
	sudo docker-compose start

run:
	sudo docker-compose up --build -d

run-f:
	sudo docker-compose up -d

down:
	sudo docker-compose down

log:
	sudo docker-compose logs

status:
	sudo docker-compose ps -a