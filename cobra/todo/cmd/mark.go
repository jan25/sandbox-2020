package cmd

import (
	"fmt"

	"github.com/jan25/sandbox-2020/cobra/todo/data"
	"github.com/spf13/cobra"
)

// markCmd represents the mark command
var markCmd = &cobra.Command{
	Use:   "mark [name]",
	Short: "Mark a todo as done",
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) == 0 {
			return fmt.Errorf("Provide name to update a todo")
		}
		name := args[0]
		done, _ := cmd.Flags().GetBool("done")
		if err := data.MarkDone(name, done); err != nil {
			return err
		}
		return nil
	},
}

// Here you will define your flags and configuration settings.
func init() {
	rootCmd.AddCommand(markCmd)

	markCmd.Flags().BoolP("done", "d", true, "true to mark todo as done, false to mark as undone")
}
