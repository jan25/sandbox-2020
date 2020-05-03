package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"

	"context"
)

// wrapper type for context key types
type contextKey string

// some helper constants for headers and context value parsing
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

	srv := http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	idleConnsClosed := make(chan struct{})
	go func() {
		// wait for interrupt signals to shutdown
		interrupts := make(chan os.Signal, 1)
		signal.Notify(interrupts, os.Interrupt)
		signal.Notify(interrupts, syscall.SIGTERM)
		<-interrupts

		log.Printf("Shutting down server..")

		// Give 5 seconds to shutdown
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel() // cancel early if shutdown finished earlier
		if err := srv.Shutdown(ctx); err != nil {
			// error in shutdown or context timed out
			log.Printf("Error from server Shutdown. err = %v", err)
		}

		close(idleConnsClosed)
	}()

	if err := srv.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatalf("HTTP ListenAndServe err: %v", err)
	}

	// wait for connections to be closed after shutdown
	<-idleConnsClosed
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := ctx.Value(contextKey(requestID))
	w.Write([]byte("root: hello child!\n"))
	w.Write([]byte("waiting for reply..\n"))

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
	// sleep to delay response
	time.Sleep(3 * time.Second)
	w.Write([]byte("child: saying hello back to root\n"))
}

func randID() string {
	return strconv.Itoa(rand.Int())
}
