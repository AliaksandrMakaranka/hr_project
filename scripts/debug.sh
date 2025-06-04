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

# Функция для вывода справки
show_help() {
    print_message "Debug script usage:" "$YELLOW"
    echo "  ./debug.sh [option]"
    echo ""
    echo "Options:"
    echo "  lint     - Debug ESLint"
    echo "  types    - Debug TypeScript"
    echo "  build    - Debug Vite build"
    echo "  all      - Run all debug checks"
    echo "  help     - Show this help message"
}

# Проверка наличия аргумента
if [ $# -eq 0 ]; then
    show_help
    exit 1
fi

# Очистка консоли
clear

case "$1" in
    "lint")
        print_message "Debugging ESLint..." "$YELLOW"
        npm run debug:lint
        ;;
    "types")
        print_message "Debugging TypeScript..." "$YELLOW"
        npm run debug:types
        ;;
    "build")
        print_message "Debugging Vite build..." "$YELLOW"
        npm run debug:build
        ;;
    "all")
        print_message "Running all debug checks..." "$YELLOW"
        echo "----------------------------------------"
        
        print_message "\nDebugging ESLint..." "$YELLOW"
        npm run debug:lint
        
        print_message "\nDebugging TypeScript..." "$YELLOW"
        npm run debug:types
        
        print_message "\nDebugging Vite build..." "$YELLOW"
        npm run debug:build
        ;;
    "help")
        show_help
        ;;
    *)
        print_message "Unknown option: $1" "$RED"
        show_help
        exit 1
        ;;
esac 