package data

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/hackebrot/turtle"
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
		fmt.Printf("%s No todos available!\n", getEmoji("zero"))
		return
	}

	for name, todo := range f.M {
		emoji := "white_check_mark"
		if !todo.Done {
			emoji = "apple"
		}
		fmt.Printf("%s %s\n", getEmoji(emoji), name)
	}
}

func AddTodo(name string) {
	f.M[name] = newTodo(name)

	writeFile()
	fmt.Printf("%s Added %s!\n", getEmoji("green_apple"), name)
}

func MarkDone(name string, done bool) error {
	t, ok := f.M[name]
	if !ok {
		return fmt.Errorf("Invalid name %s", name)
	}
	t.Done = done

	writeFile()
	doneStr := "done"
	if !done {
		doneStr = "undone"
	}
	fmt.Printf("%s Success! Marked %s as %s\n", getEmoji("white_check_mark"), name, doneStr)
	return nil
}

func getEmoji(name string) string {
	if emoji, ok := turtle.Emojis[name]; ok {
		return " " + emoji.Char + " "
	}
	return ""
}
