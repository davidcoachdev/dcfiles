package main

import (
	"errors"
	"fmt"
)

// ✅ GOOD: Wrap errors with %w
func readFile(path string) ([]byte, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("failed to read file %s: %w", path, err)
	}
	return data, nil
}

// Usage
func main() {
	_, err := readFile("missing.txt")
	if err != nil {
		// Can use errors.Is() to check the underlying error
		if errors.Is(err, os.ErrNotExist) {
			fmt.Println("File not found")
		}
	}
}
