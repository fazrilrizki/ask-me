package models

type Question struct {
	Id       int64  `gorm:"primaryKey" json:"id"`
	UserName string `gorm:"type:varchar(255)" json:"user_name"`
	Question string `gorm:"type:varchar(255)" json:"question"`
}
