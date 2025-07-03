package database

import (
	"self-project/ask-me/internal/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	database, err := gorm.Open(mysql.Open("root:fazril@tcp(localhost:3306)/ask-me"))
	if err != nil {
		panic(err)
	}

	database.AutoMigrate(&models.Question{})

	DB = database
}
