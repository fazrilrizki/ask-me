package main

import (
	"fmt"
	"self-project/ask-me/internal/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	database, err := gorm.Open(mysql.Open("root:herd@tcp(localhost:3306)/ask-me"))
	if err != nil {
		panic(err)
	}

	database.AutoMigrate(&models.Question{})
	database.AutoMigrate(&models.Answer{})

	fmt.Printf("Migrate success!")
}
