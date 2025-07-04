package main

import (
	"log"
	"self-project/ask-me/pkg/config"
	"self-project/ask-me/pkg/database"
	"self-project/ask-me/pkg/environment"
	"self-project/ask-me/pkg/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	if _, err := environment.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	database.Connect()
	router := gin.Default()
	config.SetupCORS(router)

	//List routes
	routes.ListRoutes(router)
}
