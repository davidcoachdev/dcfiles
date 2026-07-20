package main

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
)

type User struct {
	ID    int
	Name  string
	Email string
}

func getUser(db *sql.DB, id int) (*User, error) {
	user := &User{}
	err := db.QueryRow("SELECT id, name, email FROM users WHERE id = $1", id).
		Scan(&user.ID, &user.Name, &user.Email)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func createUser(db *sql.DB, name, email string) (int, error) {
	var id int
	err := db.QueryRow(
		"INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
		name, email,
	).Scan(&id)
	return id, err
}

func main() {
	db, err := sql.Open("postgres", "postgres://user:pass@localhost/dbname")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Set connection pool
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)

	// Use database
	user, err := getUser(db, 1)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("User: %+v", user)
}
