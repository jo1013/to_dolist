// database/mysql.go
package database

import (
	"fmt"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func Init() {
	user := beego.AppConfig.String("mysqluser")
	pass := beego.AppConfig.String("mysqlpass")
	host := beego.AppConfig.String("mysqlhost")
	port := beego.AppConfig.String("mysqlport")
	db := beego.AppConfig.String("mysqldb")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&loc=Local",
		user, pass, host, port, db)

	// Register driver
	err := orm.RegisterDriver("mysql", orm.DRMySQL)
	if err != nil {
		panic(err)
	}

	// Register default database
	err = orm.RegisterDataBase("default", "mysql", dsn)
	if err != nil {
		panic(err)
	}

	// Create tables
	err = orm.RunSyncdb("default", false, true)
	if err != nil {
		panic(err)
	}
}
