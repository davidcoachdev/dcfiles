package main

import (
	"golang.org/x/crypto/bcrypt"
	"log"
)

func hashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash), err
}

func verifyPassword(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func main() {
	password := "mySecurePassword123"
	
	// Hash password
	hash, err := hashPassword(password)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Hash:", hash)
	
	// Verify password
	if verifyPassword(hash, password) {
		log.Println("Password is correct")
	}
}
