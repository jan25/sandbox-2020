package cmd

import (
	"fmt"

	"github.com/jan25/sandbox-2020/cobra/todo/data"
	"github.com/spf13/cobra"
)

// listCmd represents the list command
var listCmd = &cobra.Command{
	Use:   "list",
	Short: "List your Todos",
	Long:  "View all your Todos or search for specific Todos.",
	Run: func(cmd *cobra.Command, args []string) {
		data.GetAllTodos()
		fmt.Println("list.Run called")
	},
}

func init() {
	rootCmd.AddCommand(listCmd)
	fmt.Println("list.init called")
}
