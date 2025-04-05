@echo off
cd app

:: Clean up existing directories
rmdir /s /q auth diary mood dreams common 2>nul

:: Create component directories
cd components
mkdir common
mkdir auth
mkdir diary
mkdir mood
mkdir dreams
cd ..

:: Create screen directories
cd screens
mkdir auth
mkdir diary
mkdir mood
mkdir dreams
cd ..

:: Create lib directories
cd lib
mkdir supabase
mkdir utils
cd ..

echo Directory structure created successfully! 