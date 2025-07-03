package main

import (
	"self-project/ask-me/internal/controllers"
	"self-project/ask-me/pkg/database"

	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()
	router := gin.Default()

	//List routes
	router.GET("/api/questions", controllers.IndexQuestion)
	router.POST("/api/questions", controllers.StoreQuestion)
	router.Run()
}
