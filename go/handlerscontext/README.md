## Sample http server with logging, tracing and graceful shutdown

`go run main.go` to start the server and `curl localhost:8080` in different terminal to see logs printed from server. Example logs:

```
2020/05/03 16:05:15 [5577006791947779410] Start of request. path=/
2020/05/03 16:05:15 traceID=8674665223082153551; parentID: nil
2020/05/03 16:05:15 [6129484611666145821] Start of request. path=/child
2020/05/03 16:05:15 traceID=8674665223082153551; parentID:5577006791947779410
2020/05/03 16:05:15 [6129484611666145821] End of request. path=/child
2020/05/03 16:05:15 [5577006791947779410] End of request. path=/
```

`main.go` makes use of middlewares to inject and extract request info into global Context, which are avaible throught out request lifecycle.

Server can be stopped with Interrupt(`ctrl+C`) or with other signals, so cleaning up resources before shutdown is useful.

For e.g. duing k8s pods rolling updates, new pods are created to replace old ones, old ones receive `SIGTERM` and if not handled well open connections could fail. Instead server can wait until all active requests are finished and idle connections are closed. There might be additional support needed for this to work well - Readiness endpoint to fail when `SIGTERM` is received and Liveness need to work with presense of some /tmp file probe which can be cleaned up after all connections are closed.

### Useful resources

https://www.alexedwards.net/blog/making-and-using-middleware

https://www.alexedwards.net/blog/a-recap-of-request-handling

https://www.youtube.com/watch?v=LSzR0VEraWw&list=WL&index=15&t=0s

https://medium.com/over-engineering/graceful-shutdown-with-go-http-servers-and-kubernetes-rolling-updates-6697e7db17cf

https://golang.org/pkg/net/http/#Server.Shutdown
