package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// listCmd represents the list command
var listCmd = &cobra.Command{
	Use:   "list",
	Short: "List your Todos",
	Run: func(cmd *cobra.Command, args []string) {
		getAllTodos()
		fmt.Println("list.Run called")
	},
}

func init() {
	rootCmd.AddCommand(listCmd)
	fmt.Println("list.init called")
}
