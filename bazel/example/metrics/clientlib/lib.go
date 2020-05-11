package clientlib

import (
	"expvar"
	"net/http"
)

var requests *expvar.Int

func init() {
	if requests == nil {
		requests = expvar.NewInt("requests")
	}
}

// Middleware wraps handlers to collect metrics
func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requests.Add(1)
		next.ServeHTTP(w, r)
	})
}

// CollectorMiddleware is used for metric collector endpoints
func CollectorMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)
		requests.Set(0)
	})
}
