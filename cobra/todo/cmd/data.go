package cmd

import "fmt"

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

func initFsdb() {
	// TODO read from disk
	m := map[string]*Todo{
		"first thing":  newTodo("first thing"),
		"second thing": newTodo("second thing"),
	}
	f = &Fsdb{
		M: m,
	}
}

func getAllTodos() {
	for name, todo := range f.M {
		fmt.Println(name, todo)
	}
}

func addTodo(name string) {
	f.M[name] = newTodo(name)
}

func markDone(name string, done bool) error {
	t, ok := f.M[name]
	if !ok {
		return fmt.Errorf("Invalid name %s", name)
	}
	t.Done = done

	writeToDisk()

	return nil
}

func writeToDisk() {
	// TODO
}
