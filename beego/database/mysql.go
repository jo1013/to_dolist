package database

import (
	"fmt"
	"os"
	"time"

	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func Init() {
	time.Sleep(10 * time.Second) // MySQL 시작 대기

	// 환경변수에서 값을 가져옴
	user := os.Getenv("MYSQL_USER")
	pass := os.Getenv("MYSQL_PASSWORD")
	dbname := os.Getenv("MYSQL_DATABASE")
	host := "to_dolist-mysql-1" // Docker network에서의 서비스 이름
	port := "3306"

	fmt.Printf("DB Config - User: %s, Host: %s, Port: %s, DB: %s\n",
		user, host, port, dbname)

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user, pass, host, port, dbname)

	fmt.Printf("DSN: %s\n", dsn)

	maxRetries := 30
	for i := 0; i < maxRetries; i++ {
		fmt.Printf("Attempting database connection %d/%d...\n", i+1, maxRetries)

		err := orm.RegisterDriver("mysql", orm.DRMySQL)
		if err != nil {
			fmt.Printf("Failed to register driver: %v\n", err)
			time.Sleep(time.Second * 2)
			continue
		}

		err = orm.RegisterDataBase("default", "mysql", dsn)
		if err != nil {
			fmt.Printf("Failed to connect: %v\n", err)
			time.Sleep(time.Second * 2)
			continue
		}

		o := orm.NewOrm()
		var result int
		err = o.Raw("SELECT 1").QueryRow(&result)
		if err != nil {
			fmt.Printf("Failed to ping database: %v\n", err)
			time.Sleep(time.Second * 2)
			continue
		}

		err = orm.RunSyncdb("default", false, true)
		if err != nil {
			fmt.Printf("Failed to sync database: %v\n", err)
			time.Sleep(time.Second * 2)
			continue
		}

		fmt.Println("Successfully connected to database!")
		return
	}

	panic("Failed to connect to database after multiple attempts")
}
