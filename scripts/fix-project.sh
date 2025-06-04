#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
print_message() {
    echo -e "${2}${1}${NC}"
}

# Функция для проверки команды
check_command() {
    if [ $? -eq 0 ]; then
        print_message "✓ $1 passed" "$GREEN"
        return 0
    else
        print_message "✗ $1 failed" "$RED"
        return 1
    fi
}

# Функция для вывода разделителя
print_separator() {
    echo "----------------------------------------"
}

# Очистка консоли
clear

print_message "Starting comprehensive project check..." "$BLUE"
print_separator

# Проверка Node.js версии
print_message "\nChecking Node.js version..." "$YELLOW"
NODE_VERSION=$(node -v)
print_message "Node.js version: $NODE_VERSION" "$GREEN"

# Проверка npm версии
print_message "\nChecking npm version..." "$YELLOW"
NPM_VERSION=$(npm -v)
print_message "npm version: $NPM_VERSION" "$GREEN"

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

# Проверка размера бандла
print_message "\nChecking bundle size..." "$YELLOW"
npm run build:analyze
check_command "Bundle analysis"

# Проверка тестов
print_message "\nRunning tests..." "$YELLOW"
npm run test
check_command "Tests"

# Проверка покрытия тестами
print_message "\nChecking test coverage..." "$YELLOW"
npm run test:coverage
check_command "Test coverage"

# Проверка сборки
print_message "\nChecking production build..." "$YELLOW"
npm run build
check_command "Production build"

# Проверка предпросмотра
print_message "\nStarting preview server..." "$YELLOW"
npm run preview &
PREVIEW_PID=$!

# Ждем запуска сервера
sleep 5

# Проверяем доступность сервера
if curl -s http://localhost:4173 > /dev/null; then
    print_message "Preview server is running" "$GREEN"
else
    print_message "Preview server failed to start" "$RED"
fi

# Останавливаем сервер предпросмотра
kill $PREVIEW_PID

# Итоговый результат
print_separator
print_message "\nProject check completed!" "$BLUE"
print_message "Node.js version: $NODE_VERSION" "$GREEN"
print_message "npm version: $NPM_VERSION" "$GREEN"
print_separator

# Проверка размера проекта
print_message "\nProject size:" "$YELLOW"
du -sh . | cut -f1

# Проверка количества файлов
print_message "\nFile count:" "$YELLOW"
find . -type f -not -path "*/node_modules/*" -not -path "*/dist/*" | wc -l

print_separator
print_message "\nAll checks completed! 🎉" "$GREEN" 