package controllers

import (
	"net/http"
	"self-project/ask-me/internal/models"
	"self-project/ask-me/pkg/database"
	"strconv"

	"github.com/gin-gonic/gin"
)

func StoreAnswer(c *gin.Context) {
	var answer models.Answer

	id, err := strconv.Atoi(c.Param("question_id"))
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Invalid question_id"})
		return
	}

	if err := c.ShouldBindJSON(&answer); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	answer.QuestionId = int64(id)
	database.DB.Create(&answer)
	c.JSON(http.StatusCreated, gin.H{"answer": answer})
}
