package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// addCmd represents the add command
var addCmd = &cobra.Command{
	Use:   "add [name]",
	Short: "Add a new todo",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("add todo %s \n", args[0])
		name := args[0]
		addTodo(name)
		fmt.Printf("Successfuly added %s \n", name)
	},
}

func init() {
	rootCmd.AddCommand(addCmd)
}
