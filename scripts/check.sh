#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
print_message() {
    echo -e "${2}${1}${NC}"
}

# Функция для проверки команды
check_command() {
    if [ $? -eq 0 ]; then
        print_message "✓ $1 passed" "$GREEN"
    else
        print_message "✗ $1 failed" "$RED"
        exit 1
    fi
}

# Очистка консоли
clear

print_message "Starting project checks..." "$YELLOW"
echo "----------------------------------------"

# Проверка зависимостей
print_message "\nChecking dependencies..." "$YELLOW"
npm run check:deps
check_command "Dependencies check"

# Проверка типов
print_message "\nChecking TypeScript types..." "$YELLOW"
npm run check:types
check_command "TypeScript check"

# Проверка линтера
print_message "\nRunning ESLint..." "$YELLOW"
npm run check:lint
check_command "ESLint check"

# Проверка форматирования
print_message "\nChecking code formatting..." "$YELLOW"
npm run check:format
check_command "Prettier check"

# Проверка мертвого кода
print_message "\nChecking for dead code..." "$YELLOW"
npm run check:dead
check_command "Dead code check"

# Проверка сборки
print_message "\nChecking build..." "$YELLOW"
npm run check:build
check_command "Build check"

# Итоговый результат
echo "----------------------------------------"
print_message "\nAll checks completed successfully! 🎉" "$GREEN" 