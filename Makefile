run:
	docker run -d -p 80:80 --env-file ./.env --name chat-app-client chat-app-client
stop:
	docker stop chat-app-client