package models

import "time"

type Question struct {
	Id        int64     `gorm:"primaryKey" json:"id"`
	UserName  string    `gorm:"type:varchar(255)" json:"user_name"`
	Question  string    `gorm:"type:varchar(255)" json:"question"`
	Answers   []Answer  `gorm:"foreignKey:QuestionId" json:"answers"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
