package models

import "time"

type Answer struct {
	Id         int64     `gorm:"primaryKey" json:"id"`
	QuestionId int64     `json:"question_id"`                                                                  // Foreign key field
	Question   Question  `gorm:"foreignKey:QuestionId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"-"` // relation
	UserName   string    `gorm:"type:varchar(255)" json:"user_name"`
	Answer     string    `gorm:"type:varchar(255)" json:"answer"`
	CreatedAt  time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
