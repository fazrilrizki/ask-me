package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	database, err := gorm.Open(mysql.Open("root:herd@tcp(localhost:3306)/ask-me"))
	if err != nil {
		panic(err)
	}

	DB = database
}
