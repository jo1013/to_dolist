
	// 환경 변수에서 데이터베이스 연결 정보 읽기
	// dbUser := os.Getenv("DB_USER")
	// dbPass := os.Getenv("DB_PASSWORD")
	// dbName := os.Getenv("DB_NAME")
	// dbHost := os.Getenv("DB_HOST")
	// dbPort := os.Getenv("DB_PORT")

	// dsn := dbUser + ":" + dbPass + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?charset=utf8"
	// orm.RegisterDataBase("default", "mysql", dsn)

	// orm.RunSyncdb("default", false, true)
	// beego.BConfig.WebConfig.Session.SessionOn = true
// main.go
package main

import (
	"github.com/astaxie/beego"
	_ "github.com/jo1013/to_dolist/app/routers" // 실제 모듈 이름으로 대체
)

func main() {
	beego.Run()
}
