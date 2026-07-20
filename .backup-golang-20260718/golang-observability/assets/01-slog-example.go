package main

import (
	"log/slog"
	"os"
)

func main() {
	// Create logger
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	// Log with levels
	logger.Info("Application started")
	logger.Debug("Debug information", "key", "value")
	logger.Warn("Warning message", "error", "something went wrong")
	logger.Error("Error occurred", "error", "critical issue")

	// Structured logging
	logger.Info("User action",
		"user_id", 123,
		"action", "login",
		"timestamp", "2024-01-01T00:00:00Z",
	)
}
