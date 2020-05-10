package passwords

import (
	"math/rand"
	"strings"
)

const defaultLen = 10

// GeneratePassword generates simple randomised passwords
func GeneratePassword(keywords []string, l int) string {
	kw := strings.Join(keywords, "")
	if len(kw) == 0 {
		kw = "abcdefghijklmno"
	}
	if l == 0 {
		l = 10
		if l > len(kw) {
			l = len(kw)
		}
	}

	pwd := ""
	for l > 0 {
		pwd += string(kw[rand.Int()%len(kw)])
		l--
	}
	return pwd
}
