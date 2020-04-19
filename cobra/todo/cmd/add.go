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
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) == 0 {
			return fmt.Errorf("Provide name to add new todo")
		}
		name := args[0]
		data.AddTodo(name)
		fmt.Printf("Successfuly added %s!\n", name)
		return nil
	},
}

func init() {
	rootCmd.AddCommand(addCmd)
}
