from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pathlib import Path
import os

from app.models.user import User
from app.core.dependencies import get_admin_user

# Create templates directory if it doesn't exist
templates_dir = Path("/home/nilabh/Projects/Tantuka/backend/app/templates")
templates_dir.mkdir(parents=True, exist_ok=True)

# Set up templates
templates = Jinja2Templates(directory=str(templates_dir))

router = APIRouter(
    prefix="/admin-ui",
    tags=["admin-ui"],
    dependencies=[Depends(get_admin_user)],  # All endpoints require admin access
)


@router.get("/", response_class=HTMLResponse)
async def admin_dashboard_ui(
    request: Request,
    current_user: User = Depends(get_admin_user)
):
    """
    Admin Dashboard UI
    """
    # This is a simple HTML response
    # In a real application, you would use Jinja2 templates
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Tantuka Admin Dashboard</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
        <div class="min-h-screen flex flex-col">
            <header class="bg-indigo-600 text-white shadow">
                <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 class="text-2xl font-bold">Tantuka Admin Panel</h1>
                    <div>
                        <span>Welcome, {current_user.first_name} {current_user.last_name}</span>
                    </div>
                </div>
            </header>
            
            <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Dashboard cards -->
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900">API Documentation</h3>
                            <p class="mt-1 text-sm text-gray-600">Access the full API documentation</p>
                            <div class="mt-4">
                                <a href="/docs" class="text-indigo-600 hover:text-indigo-800">
                                    View Documentation →
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900">Products</h3>
                            <p class="mt-1 text-sm text-gray-600">Manage product catalog</p>
                            <div class="mt-4">
                                <a href="/docs#/products" class="text-indigo-600 hover:text-indigo-800">
                                    Manage Products →
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900">Users</h3>
                            <p class="mt-1 text-sm text-gray-600">Manage user accounts</p>
                            <div class="mt-4">
                                <a href="/docs#/users" class="text-indigo-600 hover:text-indigo-800">
                                    Manage Users →
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900">Orders</h3>
                            <p class="mt-1 text-sm text-gray-600">View and process orders</p>
                            <div class="mt-4">
                                <a href="/docs#/orders" class="text-indigo-600 hover:text-indigo-800">
                                    Manage Orders →
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900">Categories</h3>
                            <p class="mt-1 text-sm text-gray-600">Organize product categories</p>
                            <div class="mt-4">
                                <a href="/docs#/categories" class="text-indigo-600 hover:text-indigo-800">
                                    Manage Categories →
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900">System Health</h3>
                            <p class="mt-1 text-sm text-gray-600">Monitor system status</p>
                            <div class="mt-4">
                                <a href="/docs#/admin/system-health" class="text-indigo-600 hover:text-indigo-800">
                                    View Status →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-8">
                    <h2 class="text-xl font-semibold text-gray-800">Admin API Quick Links</h2>
                    <div class="mt-4 bg-white shadow overflow-hidden rounded-lg">
                        <ul class="divide-y divide-gray-200">
                            <li class="px-6 py-4">
                                <a href="/docs#/admin/dashboard" class="text-indigo-600 hover:text-indigo-800">
                                    Dashboard Statistics
                                </a>
                            </li>
                            <li class="px-6 py-4">
                                <a href="/docs#/admin/users" class="text-indigo-600 hover:text-indigo-800">
                                    All Users
                                </a>
                            </li>
                            <li class="px-6 py-4">
                                <a href="/docs#/products" class="text-indigo-600 hover:text-indigo-800">
                                    Product Management
                                </a>
                            </li>
                            <li class="px-6 py-4">
                                <a href="/docs#/categories" class="text-indigo-600 hover:text-indigo-800">
                                    Category Management
                                </a>
                            </li>
                        </ul>
                    </div>
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
    </body>
    </html>
    """