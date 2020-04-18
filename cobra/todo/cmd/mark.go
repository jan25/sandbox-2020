package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// markCmd represents the mark command
var markCmd = &cobra.Command{
	Use:   "mark",
	Short: "Mark a todo as done",
	RunE: func(cmd *cobra.Command, args []string) error {
		name := args[0]
		done, _ := cmd.Flags().GetBool("done")
		if err := markDone(name, done); err != nil {
			return err
		}
		fmt.Printf("Success! Marked %s as done=%v \n", name, done)
		return nil
	},
}

func init() {
	rootCmd.AddCommand(markCmd)

	// Here you will define your flags and configuration settings.

	markCmd.Flags().BoolP("done", "d", true, "true to mark todo as done, false to mark as undone")
}
