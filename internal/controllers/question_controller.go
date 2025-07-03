package controllers

import (
	"net/http"
	"self-project/ask-me/internal/models"
	"self-project/ask-me/pkg/database"

	"github.com/gin-gonic/gin"
)

func StoreQuestion(c *gin.Context) {
	var question models.Question

	if err := c.ShouldBindJSON(&question); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	database.DB.Create(&question)
	c.JSON(http.StatusCreated, gin.H{"question": question})
}
