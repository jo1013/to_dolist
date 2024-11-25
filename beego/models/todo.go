package models

import (
	"github.com/astaxie/beego/orm"
)

type Todo struct {
	Id          int    `json:"id" orm:"auto"`
	Title       string `json:"title" orm:"size(100)"`
	Description string `json:"description" orm:"type(text)"`
	Completed   bool   `json:"completed" orm:"default(false)"`
	Priority    string `json:"priority" orm:"column(priority);default(MEDIUM)"`
}

func init() {
	orm.RegisterModel(new(Todo))
}
