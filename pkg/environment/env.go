package environment

import "github.com/joho/godotenv"

func Load() (string, error) {
	fileEnv := ".env"
	err := godotenv.Load(fileEnv)
	if err != nil {
		return "", err
	}
	return fileEnv, nil
}
