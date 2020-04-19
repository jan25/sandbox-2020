package cmd

import (
	"fmt"
	"os"

	"github.com/jan25/sandbox-2020/cobra/todo/data"
	"github.com/spf13/cobra"
)

var cfgFile string

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "todo",
	Short: "Your todo tracker",
	Long: `Your Todo tracker

Track your todos with this tool. You can update them as they are done.
You can also list all todos you have created or search by keywords.`,
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

// init is called for all childCmd before reaching rootCmd
// all of it is before Run is called
func init() {
	// add to list of initalizers
	cobra.OnInitialize((initConfig))

	// initialise database
	data.InitFsdb()
}

func initConfig() {
	// Initilizes config before Run() is called
	// fmt.Println("root.initConfig called")
}
