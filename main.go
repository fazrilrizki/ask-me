package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/message", func(w http.ResponseWriter, r *http.Request) {
		// Set the content type to application/json
		w.Header().Set("Content-Type", "application/json")
		// A simple fix for CORS during development
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Create a simple data structure
		response := map[string]string{"message": "Hello from the Go backend! 👋"}

		// Encode the data as JSON and send it as the response
		json.NewEncoder(w).Encode(response)
	})

	// Start the server on port 8080
	log.Println("Go server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
