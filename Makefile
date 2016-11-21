build:
	@docker build docker -t libreread

run:
	@docker run -p 3000:3000 libreread

run-dev:
	@docker run -p 3000:3000 -v $(CURDIR):/LibreRead libreread 
