package main

import (
	"log"
	"net/http"
	"self-project/ask-me/pkg/database"
	"self-project/ask-me/pkg/environment"
)

func main() {
	env, err := environment.Load()
	if err != nil {
		log.Fatal(err)
	}

	database.Connect(env)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
