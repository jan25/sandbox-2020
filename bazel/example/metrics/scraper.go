package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"time"

	tm "github.com/buger/goterm"
)

// Scrapes metrics from service running on same host (localhost:8080)
// Prints scrapped metrics to STDOUT as histogram

const (
	maxHistogramLen = 10
	rowLen          = 25
	targetURL       = "http://localhost:8080/debug/vars"
)

var histogram = make([]int, 0)

func main() {
	scrapeMetrics()

	ch := make(chan struct{})
	interrupt := make(chan os.Signal)
	defer close(interrupt)
	signal.Notify(interrupt, os.Interrupt)

	t := time.NewTicker(2 * time.Second)

	go func() {
		for {
			select {
			case <-t.C:
				scrapeMetrics()
				drawHistogram()
			case <-interrupt:
				close(ch)
				return
			}
		}
	}()

	<-ch
}

func drawHistogram() {
	tm.Clear()
	tm.MoveCursor(1, 1)

	if len(histogram) == 0 {
		tm.Println("No metrics to show.")
	} else {
		tm.Println("HTTP Request count metric")
		tm.Println("(Latest scrapped metric last)")
		for _, l := range histogram {
			tm.Println("|" + strings.Repeat("*", l))
		}
	}

	tm.Flush()
}

func scrapeMetrics() {
	resp, err := http.Get(targetURL)
	if err != nil {
		log.Fatal(err)
	}

	bytes, err := ioutil.ReadAll(resp.Body)
	resp.Body.Close()
	var vals map[string]interface{}
	if err := json.Unmarshal(bytes, &vals); err != nil {
		log.Fatal(err)
	}

	requests, ok := vals["requests"].(float64) // int64 didn't work
	if !ok {
		fmt.Println("'requests' metric not found in scrapped metrics.")
		return
	}
	histogram = append(histogram, int(requests))

	if len(histogram) > maxHistogramLen {
		histogram = histogram[len(histogram)-maxHistogramLen:]
	}
}
