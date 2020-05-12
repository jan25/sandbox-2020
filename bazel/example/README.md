## Practising Prometheus style metric collection concepts while setting up sample project for bazel

WIP to setup bazel for all three components in one workspace.

`/server` has a simple HTTP server serving one endpoint. Start the server using:

```
cd server
go run main.go
```

Hit server endpoint using:

```
curl localhost:8080/password?keywords=abc,xyz&len=10
```

Start metric collector with below commands and visualize request metric histogram in terminal:

```
cd metrics
go run scraper.go

HTTP Request count metric
(Latest scrapped metric last)
|**************************
|*******************
|*******
|**************
|***************
|************************
|***********************
|*****************
|********************
|***********
```

Generate synthetic load with helper script:

```
cd load-generator
sh naive.sh localhost:8080/password
```

Made use of https://golang.org/pkg/expvar/ stdlib for clientside metric state and http exporter handler.
