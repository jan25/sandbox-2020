load("@io_bazel_rules_go//go:def.bzl", "go_binary", "go_library", "go_test")
go_library(
name = "go_default_library",
	srcs = ["test.go"],
	importpath = "github.com/netspringio/netspring/examples/golang",
	visibility = ["//visibility:private"],
)
go_binary(
	name = "golang",
	embed = [":go_default_library"],
	visibility = ["//visibility:public"],
)
