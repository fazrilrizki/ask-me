package models

type Question struct {
	Id       int64  `gorm:"primaryKey" json:"id"`
	Question string `gorm:"type:varchar(255)" json:"question"`
}
