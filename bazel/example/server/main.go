package main

import (
	"expvar"
	"log"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/jan25/sandbox-2020/bazel/example/metrics/clientlib"
	"github.com/jan25/sandbox-2020/bazel/example/server/passwords"
)

// A simple password generator service

func main() {
	requests = expvar.NewInt("requests")

	mux := http.NewServeMux()
	mux.Handle("/debug/vars", clientlib.CollectMiddleware(expvar.Handler()))
	mux.Handle("/password", clientlib.Middleware(generatePassword))

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}

func generatePassword(w http.ResponseWriter, r *http.Request) {
	params, err := url.ParseQuery(r.URL.RawQuery)
	if err != nil {
		panic(err)
	}

	kw := params.Get("keywords")
	l, err := strconv.Atoi(params.Get("len"))
	if err != nil {
		l = 0
	}

	pwd := passwords.GeneratePassword(strings.Split(kw, ","), l)
	if _, err := w.Write([]byte(pwd)); err != nil {
		panic(err)
	}
}
