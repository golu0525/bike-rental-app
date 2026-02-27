#!/usr/bin/env pwsh

# Test Backend API Endpoints

Write-Host "=== Testing Bike Rental API ===" -ForegroundColor Green
Write-Host ""

# Test 1: Health Check
Write-Host "1. Testing Health Check: GET /" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest "http://localhost:5000/" -UseBasicParsing
    Write-Host "✅ Status: $($response.StatusCode)"
    Write-Host "✅ Response: $($response.Content)"
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Get Bikes
Write-Host "2. Testing Bikes List: GET /api/bikes" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest "http://localhost:5000/api/bikes" -UseBasicParsing
    Write-Host "✅ Status: $($response.StatusCode)"
    Write-Host "✅ Response: $($response.Content)"
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Signup
Write-Host "3. Testing Signup: POST /api/auth/signup" -ForegroundColor Cyan
try {
    $body = @{
        name = "Test User"
        email = "testuser@example.com"
        password = "password123"
        location = "Mumbai"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest "http://localhost:5000/api/auth/signup" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body `
        -UseBasicParsing
    
    Write-Host "✅ Status: $($response.StatusCode)"
    Write-Host "✅ Response: $($response.Content)"
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 4: Login
Write-Host "4. Testing Login: POST /api/auth/login" -ForegroundColor Cyan
try {
    $body = @{
        email = "testuser@example.com"
        password = "password123"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest "http://localhost:5000/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body `
        -UseBasicParsing
    
    Write-Host "✅ Status: $($response.StatusCode)"
    Write-Host "✅ Response: $($response.Content)"
    
    # Extract token for next test
    $data = $response.Content | ConvertFrom-Json
    $token = $data.token
    Write-Host "✅ Token obtained: $($token.Substring(0, 20))..." -ForegroundColor Yellow
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== Testing Complete ===" -ForegroundColor Green
