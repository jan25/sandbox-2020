package data

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/mitchellh/go-homedir"
)

const filePath = "todo/todo.json"

// Todo stores metadata for todo item
type Todo struct {
	Name string
	Done bool
}

func newTodo(name string) *Todo {
	return &Todo{
		Name: name,
		Done: false,
	}
}

func (t *Todo) markDone(done bool) {
	t.Done = done
}

// Fsdb refers to todo records stored
// on disk/filesystem
type Fsdb struct {
	M map[string]*Todo
}

var f *Fsdb

func newFsdb() *Fsdb {
	return &Fsdb{
		M: make(map[string]*Todo),
	}
}

func InitFsdb() {
	path := fullFilePath()

	// create file if not exists
	if _, err := os.Stat(path); os.IsNotExist(err) {
		err := os.MkdirAll(filepath.Dir(path), os.ModePerm)
		check(err)

		f, err := os.Create(path)
		check(err)

		_, err = f.Write([]byte("{}"))
		check(err)

		f.Close()
	}

	readFile()
}

func fullFilePath() string {
	homeDir, err := homedir.Dir()
	check(err)

	return filepath.Join(homeDir, filePath)
}

func readFile() {
	path := fullFilePath()

	bytes, err := ioutil.ReadFile(path)
	check(err)

	f = newFsdb()
	err = json.Unmarshal(bytes, &f.M)
	check(err)
}

func writeFile() {
	path := fullFilePath()

	bytes, err := json.Marshal(f.M)
	check(err)

	err = ioutil.WriteFile(path, bytes, os.ModePerm)
	check(err)
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func GetAllTodos() {
	if len(f.M) == 0 {
		fmt.Println("No todos available!")
		return
	}

	for name, todo := range f.M {
		fmt.Println(name, todo.Done)
	}
}

func AddTodo(name string) {
	f.M[name] = newTodo(name)

	writeFile()
}

func MarkDone(name string, done bool) error {
	t, ok := f.M[name]
	if !ok {
		return fmt.Errorf("Invalid name %s", name)
	}
	t.Done = done

	writeFile()
	return nil
}
