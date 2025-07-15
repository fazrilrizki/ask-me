package controllers

import (
	"net/http"
	"self-project/ask-me/internal/models"
	"self-project/ask-me/pkg/database"

	"github.com/gin-gonic/gin"
)

func IndexQuestion(c *gin.Context) {
	var questions []models.Question

	err := database.DB.
		Preload("Answers").
		Order("created_at desc").
		Find(&questions).Error

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"questions": questions})
}

func StoreQuestion(c *gin.Context) {
	var question models.Question

	if err := c.ShouldBindJSON(&question); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	database.DB.Create(&question)
	c.JSON(http.StatusCreated, gin.H{"question": question})
}
