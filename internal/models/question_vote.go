package models

import "time"

type QuestionVote struct {
	ID         uint   `gorm:"primaryKey"`
	VisitorID  string `json:"visitor_id" gorm:"size:255;uniqueIndex:idx_visitor_question"`
	QuestionID uint   `json:"question_id" gorm:"uniqueIndex:idx_visitor_question"`
	Question   Question
	VoteType   string    `json:"vote_type" gorm:"type:enum('up','down')"`
	CreatedAt  time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
