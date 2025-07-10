package routes

import (
	"self-project/ask-me/internal/controllers"

	"github.com/gin-gonic/gin"
)

func ListRoutes(router *gin.Engine) {
	router.GET("/api/questions", controllers.IndexQuestion)
	router.POST("/api/questions", controllers.StoreQuestion)

	router.POST("/api/answer", controllers.StoreAnswer)

	router.Run()
}
