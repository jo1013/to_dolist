package main

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql" // MySQL driver import
)

func init() {
	orm.RegisterDataBase("default", "mysql", "user:password@tcp(localhost:3306)/dbname?charset=utf8")
	orm.RunSyncdb("default", false, true)

	// Enable session management
	beego.BConfig.WebConfig.Session.SessionOn = true
}

// func init() {
// 	// Initialize the database settings
// 	orm.RegisterDriver("sqlite3", orm.DRSqlite)
// 	orm.RegisterDataBase("default", "sqlite3", "file:data.db?cache=shared&mode=rwc", 30)

// 	// Enable automatic database migration
// 	orm.RunSyncdb("default", false, true)

// 	// Enable session management
// 	beego.BConfig.WebConfig.Session.SessionOn = true
// }

func main() {
	beego.Run()
}
