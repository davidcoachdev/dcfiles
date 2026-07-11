package main

import (
	"context"
	"fmt"
	"time"
)

func fetchData(ctx context.Context, url string) (string, error) {
	// Create a timeout context
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	// Simulate API call
	select {
	case <-time.After(2 * time.Second):
		return "data", nil
	case <-ctx.Done():
		return "", ctx.Err()
	}
}

func main() {
	ctx := context.Background()
	data, err := fetchData(ctx, "https://api.example.com")
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Data:", data)
	}
}
