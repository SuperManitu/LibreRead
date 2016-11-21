build:
	@docker build docker -t libreread

run:
	@docker run libreread

run-dev:
	@docker run -v $(CURDIR):/LibreRead libreread 
