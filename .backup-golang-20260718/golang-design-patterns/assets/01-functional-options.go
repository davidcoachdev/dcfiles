package main

type Config struct {
	Host    string
	Port    int
	Timeout int
}

type Option func(*Config)

func WithHost(host string) Option {
	return func(c *Config) {
		c.Host = host
	}
}

func WithPort(port int) Option {
	return func(c *Config) {
		c.Port = port
	}
}

func WithTimeout(timeout int) Option {
	return func(c *Config) {
		c.Timeout = timeout
	}
}

func NewConfig(opts ...Option) *Config {
	c := &Config{
		Host:    "localhost",
		Port:    8080,
		Timeout: 30,
	}
	for _, opt := range opts {
		opt(c)
	}
	return c
}

func main() {
	cfg := NewConfig(
		WithHost("0.0.0.0"),
		WithPort(3000),
		WithTimeout(60),
	)
	println(cfg.Host, cfg.Port, cfg.Timeout)
}
