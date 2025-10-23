from fastapi import APIRouter, Depends, HTTPException, Request, status, Response
from fastapi.responses import HTMLResponse, JSONResponse
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import json

from app.database import get_db
from app.models.user import User
from app.models.product import Product, ProductVariant
from app.models.category import Category
from app.models.order import Order
from app.core.dependencies import get_admin_user

router = APIRouter(
    prefix="/admin-dashboard",
    tags=["admin-dashboard"],
    dependencies=[Depends(get_admin_user)],  # All endpoints require admin access
)


@router.get("/summary", response_class=JSONResponse)
async def admin_dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """
    Get admin dashboard summary for charts and graphs
    """
    # Get user registration by day (last 7 days)
    today = datetime.now().date()
    last_week = today - timedelta(days=7)
    
    # User registration data
    user_data = []
    for i in range(7):
        day = last_week + timedelta(days=i+1)
        day_start = datetime.combine(day, datetime.min.time())
        day_end = datetime.combine(day, datetime.max.time())
        
        count = db.query(User).filter(
            User.created_at >= day_start,
            User.created_at <= day_end
        ).count()
        
        user_data.append({
            "date": day.strftime("%Y-%m-%d"),
            "count": count
        })
    
    # Product categories data
    categories = db.query(Category).all()
    category_data = []
    for category in categories:
        product_count = db.query(Product).filter(Product.category_id == category.id).count()
        category_data.append({
            "name": category.name,
            "count": product_count
        })
    
    # Product distribution data
    active_products = db.query(Product).filter(Product.is_active == True).count()
    inactive_products = db.query(Product).filter(Product.is_active == False).count()
    featured_products = db.query(Product).filter(Product.is_featured == True).count()
    
    product_distribution = [
        {"name": "Active Products", "value": active_products},
        {"name": "Inactive Products", "value": inactive_products},
        {"name": "Featured Products", "value": featured_products}
    ]
    
    return {
        "user_registration": user_data,
        "product_categories": category_data,
        "product_distribution": product_distribution
    }


@router.get("/charts", response_class=HTMLResponse)
async def admin_dashboard_charts(
    request: Request,
    current_user: User = Depends(get_admin_user)
):
    """
    Get admin dashboard with charts and graphs
    """
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Tantuka Admin Dashboard - Charts</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <body class="bg-gray-100">
        <div class="min-h-screen flex flex-col">
            <header class="bg-indigo-600 text-white shadow">
                <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 class="text-2xl font-bold">Tantuka Admin Dashboard - Charts</h1>
                    <div>
                        <a href="/admin" class="text-white hover:underline">Back to Admin</a>
                    </div>
                </div>
            </header>
            
            <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <!-- User Registration Chart -->
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">User Registration (Last 7 Days)</h3>
                        <canvas id="userChart" height="200"></canvas>
                    </div>
                    
                    <!-- Product Distribution Chart -->
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Product Distribution</h3>
                        <canvas id="productDistChart" height="200"></canvas>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Products by Category</h3>
                    <canvas id="categoryChart" height="100"></canvas>
                </div>
            </main>
            
            <footer class="bg-white">
                <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p class="text-center text-gray-500 text-sm">
                        &copy; 2025 Tantuka E-Commerce. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
        
        <script>
            // Fetch dashboard data
            async function fetchDashboardData() {
                const response = await fetch('/api/v1/admin-dashboard/summary', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('adminToken')
                    }
                });
                return await response.json();
            }
            
            // Initialize charts when data is loaded
            async function initCharts() {
                try {
                    const data = await fetchDashboardData();
                    
                    // User Registration Chart
                    const userCtx = document.getElementById('userChart').getContext('2d');
                    new Chart(userCtx, {
                        type: 'line',
                        data: {
                            labels: data.user_registration.map(item => item.date),
                            datasets: [{
                                label: 'New Users',
                                data: data.user_registration.map(item => item.count),
                                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                                borderColor: 'rgba(79, 70, 229, 1)',
                                borderWidth: 2,
                                tension: 0.3
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        precision: 0
                                    }
                                }
                            }
                        }
                    });
                    
                    // Product Distribution Chart
                    const prodDistCtx = document.getElementById('productDistChart').getContext('2d');
                    new Chart(prodDistCtx, {
                        type: 'doughnut',
                        data: {
                            labels: data.product_distribution.map(item => item.name),
                            datasets: [{
                                data: data.product_distribution.map(item => item.value),
                                backgroundColor: [
                                    'rgba(79, 70, 229, 0.7)',
                                    'rgba(220, 38, 38, 0.7)',
                                    'rgba(5, 150, 105, 0.7)'
                                ]
                            }]
                        }
                    });
                    
                    // Category Chart
                    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
                    new Chart(categoryCtx, {
                        type: 'bar',
                        data: {
                            labels: data.product_categories.map(item => item.name),
                            datasets: [{
                                label: 'Products',
                                data: data.product_categories.map(item => item.count),
                                backgroundColor: 'rgba(79, 70, 229, 0.7)'
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        precision: 0
                                    }
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.error('Error loading dashboard data:', error);
                }
            }
            
            // Store token from URL if present
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            if (token) {
                localStorage.setItem('adminToken', token);
            }
            
            // Initialize charts
            document.addEventListener('DOMContentLoaded', initCharts);
        </script>
    </body>
    </html>
    """