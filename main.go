package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"runtime"
	"sync"

	"github.com/nimezhu/data"
	"github.com/zserge/lorca"
)

const (
	VERSION = "0.0.1"
	DIR     = ".cnbData"
)

type nbRunner struct {
	sync.Mutex
	data *data.SimpleWorkbook
}

//TODO fucntion for NbConfig
// Load Data For NbConfig

func (c *nbRunner) GetJson(a string) error {
	c.Lock()
	defer c.Unlock()
	fmt.Println("Get Data")
	err := json.Unmarshal([]byte(a), &c.data)
	if err != nil {
		return err
	}
	return nil
}
func (c *nbRunner) Run() {
	c.Lock()
	defer c.Unlock()
	fmt.Println(c.data.SheetNames)
	fmt.Println("Run")
	//di := data.ParseSimpleWb(c.data)
	startServer(c.data, 8611)
	//TODO Start Runner Data Loader
	//TODO Start Runner Data Checker
}
func (c *nbRunner) Stop() {
	c.Lock()
	defer c.Unlock()
}
func main() {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	ui, err := lorca.New("", "", 480, 320, args...)
	if err != nil {
		log.Fatal(err)
	}
	defer ui.Close()

	// A simple way to know when UI is ready (uses body.onload event in JS)
	ui.Bind("start", func() {
		log.Println("UI is ready")
	})

	// Create and bind Go object to the UI
	c := &nbRunner{}
	ui.Bind("sendJson", c.GetJson)
	ui.Bind("nbRun", c.Run)
	ui.Bind("nbStop", c.Stop)
	//ui.Bind("", c.Value)

	// Load HTML.
	// You may also use `data:text/html,<base64>` approach to load initial HTML,
	// e.g: ui.Load("data:text/html," + url.PathEscape(html))

	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		log.Fatal(err)
	}
	defer ln.Close()

	//router := mux.NewRour()
	//router.Handler(BindataServer("www"))
	//server := &http.Server{"127.0.0.1:8080", Handler: router}
	//	go http.Serve(ln, http.FileServer(FS))

	go http.Serve(ln, BindataServer("www"))

	ui.Load(fmt.Sprintf("http://%s", ln.Addr()))

	// You may use console.log to debug your JS code, it will be printed via
	// log.Println(). Also exceptions are printed in a similar manner.
	//ui.Eval(`
	//		console.log("Hello, world!");
	//	console.log('Multiple values:', [1, false, {"x":5}]);
	// `)

	// Wait until the interrupt signal arrives or browser window is closed
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
	case <-sigc:
	case <-ui.Done():
	}

	log.Println("exiting...")
}
