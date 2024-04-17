import (
	"os"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func init() {
	// 환경 변수에서 데이터베이스 연결 정보 읽기
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")

	dsn := dbUser + ":" + dbPass + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?charset=utf8"
	orm.RegisterDataBase("default", "mysql", dsn)

	orm.RunSyncdb("default", false, true)
	beego.BConfig.WebConfig.Session.SessionOn = true
}

func main() {
	beego.Run()
}
