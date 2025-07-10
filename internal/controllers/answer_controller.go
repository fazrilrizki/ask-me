package controllers

import (
	"net/http"
	"self-project/ask-me/internal/models"
	"self-project/ask-me/pkg/database"

	"github.com/gin-gonic/gin"
)

func StoreAnswer(c *gin.Context) {
	var answer models.Answer

	if err := c.ShouldBindJSON(&answer); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	database.DB.Create(&answer)
	c.JSON(http.StatusCreated, gin.H{"answer": answer})
}
