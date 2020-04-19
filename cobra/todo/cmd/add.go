package cmd

import (
	"fmt"

	"github.com/jan25/sandbox-2020/cobra/todo/data"
	"github.com/spf13/cobra"
)

// addCmd represents the add command
var addCmd = &cobra.Command{
	Use:   "add [name]",
	Short: "Add a new todo",
	Run: func(cmd *cobra.Command, args []string) {
		name := args[0]
		data.AddTodo(name)
		fmt.Printf("Successfuly added %s \n", name)
	},
}

func init() {
	rootCmd.AddCommand(addCmd)
}
