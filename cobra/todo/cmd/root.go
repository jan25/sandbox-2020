package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var cfgFile string

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "todo",
	Short: "Your todo tracker",
	Long: `Your Todo tracker

Add your todos to this tool. You can update them as they are done.
You can also list all todos you have created or search by keywords.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("root.Run called")
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize((initConfig))

	initFsdb()

	fmt.Println("root.init called")
}

func initConfig() {
	fmt.Println("root.initConfig called")
}
