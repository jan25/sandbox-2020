package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"strings"

	"context"
)

type contextKey string

const (
	requestID     = "requestID"
	tracingheader = "customtracingheader" // "traceid-parentid"
	traceID       = "traceId"
	parentID      = "parentId"
	traceSep      = "-"
)

func setRequestContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set unique ID for current request
		ctx := r.Context()
		id := randID()
		ctx = context.WithValue(ctx, contextKey(requestID), id)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func tracingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Parse trace headers
		ctx := r.Context()
		xID := r.Header.Get(tracingheader)
		if xID == "" {
			t := randID()
			ctx = context.WithValue(ctx, contextKey(traceID), t)
			ctx = context.WithValue(ctx, contextKey(parentID), "nil")
		} else {
			parts := strings.Split(xID, traceSep)
			ctx = context.WithValue(ctx, contextKey(traceID), parts[0])
			ctx = context.WithValue(ctx, contextKey(parentID), parts[1])
		}

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Log request and trace info
		ctx := r.Context()
		path := r.RequestURI
		printRequestLine(ctx, path)

		next.ServeHTTP(w, r.WithContext(ctx))

		id := ctx.Value(contextKey(requestID))
		log.Printf("[%s] End of request. path: %s", id, path)
	})
}

func printRequestLine(ctx context.Context, path string) {
	id := ctx.Value(contextKey(requestID))
	log.Printf("[%s] Start of request. path: %s", id, path)

	t := ctx.Value(contextKey(traceID))
	p := ctx.Value(contextKey(parentID))
	log.Printf("traceID=%s; parentID:%s", t, p)
}

func createHandler(h http.Handler) http.Handler {
	return setRequestContext(tracingMiddleware(loggingMiddleware(h)))
}

func main() {
	rh := createHandler(http.HandlerFunc(rootHandler))
	ch := createHandler(http.HandlerFunc(childHandler))

	mux := http.NewServeMux()
	mux.Handle("/", rh)
	mux.Handle("/child", ch)

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := ctx.Value(contextKey(requestID))
	w.Write([]byte("root: hello child!\n"))

	req, err := http.NewRequest("GET", "http://localhost:8080/child", nil)
	if err != nil {
		log.Fatal(err)
		w.Write([]byte("Error calling /child"))
		return
	}

	tid := ctx.Value(contextKey(traceID))
	header := fmt.Sprintf("%s%s%s", tid, traceSep, id)
	req.Header.Set(tracingheader, header)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
		w.Write([]byte("Error calling /child"))
		return
	}
	defer resp.Body.Close()

	msg, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
		w.Write([]byte("Error reading response from /child"))
		return
	}
	w.Write(msg)
}

func childHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("child: say hello to root\n"))
}

func randID() string {
	return strconv.Itoa(rand.Int())
}
