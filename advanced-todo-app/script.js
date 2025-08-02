// Advanced Todo App - Main JavaScript File
class AdvancedTodoApp {
    constructor() {
        this.tasks = [];
        this.categories = [];
        this.currentView = 'all';
        this.currentCategory = null;
        this.currentPriorityFilter = '';
        this.currentSortBy = 'created';
        this.searchQuery = '';
        this.editingTaskId = null;
        
        this.init();
    }

    // Initialize the application
    init() {
        this.loadData();
        this.bindEvents();
        this.setupTheme();
        this.render();
        this.showToast('Welcome to Advanced Todo App!', 'Your tasks are ready to manage.', 'success');
    }

    // Event Bindings
    bindEvents() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.switchView(e.target.closest('.nav-item').dataset.view));
        });
        
        // Search
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        document.getElementById('clearSearch').addEventListener('click', () => this.clearSearch());
        
        // Filters
        document.getElementById('priorityFilter').addEventListener('change', (e) => this.handlePriorityFilter(e.target.value));
        document.getElementById('sortBy').addEventListener('change', (e) => this.handleSort(e.target.value));
        
        // Add task
        document.getElementById('addTaskBtn').addEventListener('click', () => this.openTaskModal());
        
        // Task modal
        document.getElementById('modalClose').addEventListener('click', () => this.closeTaskModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeTaskModal());
        document.getElementById('taskForm').addEventListener('submit', (e) => this.handleTaskSubmit(e));
        
        // Category modal
        document.getElementById('addCategoryBtn').addEventListener('click', () => this.openCategoryModal());
        document.getElementById('categoryModalClose').addEventListener('click', () => this.closeCategoryModal());
        document.getElementById('categoryCancelBtn').addEventListener('click', () => this.closeCategoryModal());
        document.getElementById('categoryForm').addEventListener('submit', (e) => this.handleCategorySubmit(e));
        
        // Color presets
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', (e) => {
                document.getElementById('categoryColor').value = e.target.dataset.color;
            });
        });
        
        // Data export/import
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
        document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
        document.getElementById('importFile').addEventListener('change', (e) => this.importData(e));
        
        // Modal overlay clicks
        document.getElementById('taskModal').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) this.closeTaskModal();
        });
        document.getElementById('categoryModal').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) this.closeCategoryModal();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    // Keyboard shortcuts
    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'n':
                    e.preventDefault();
                    this.openTaskModal();
                    break;
                case 'f':
                    e.preventDefault();
                    document.getElementById('searchInput').focus();
                    break;
                case 's':
                    e.preventDefault();
                    this.exportData();
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            this.closeTaskModal();
            this.closeCategoryModal();
        }
    }

    // Theme Management
    setupTheme() {
        const savedTheme = localStorage.getItem('todo-theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('todo-theme', theme);
        
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Data Management
    loadData() {
        const savedTasks = localStorage.getItem('todo-tasks');
        const savedCategories = localStorage.getItem('todo-categories');
        
        this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
        this.categories = savedCategories ? JSON.parse(savedCategories) : this.getDefaultCategories();
        
        // Ensure tasks have IDs and created dates
        this.tasks.forEach(task => {
            if (!task.id) task.id = this.generateId();
            if (!task.createdAt) task.createdAt = new Date().toISOString();
        });
    }

    saveData() {
        localStorage.setItem('todo-tasks', JSON.stringify(this.tasks));
        localStorage.setItem('todo-categories', JSON.stringify(this.categories));
    }

    getDefaultCategories() {
        return [
            { id: 'work', name: 'Work', color: '#3b82f6' },
            { id: 'personal', name: 'Personal', color: '#10b981' },
            { id: 'shopping', name: 'Shopping', color: '#f59e0b' },
            { id: 'health', name: 'Health', color: '#ef4444' }
        ];
    }

    // Task Management
    createTask(taskData) {
        const task = {
            id: this.generateId(),
            title: taskData.title.trim(),
            description: taskData.description.trim(),
            category: taskData.category || null,
            priority: taskData.priority || 'medium',
            dueDate: taskData.dueDate || null,
            dueTime: taskData.dueTime || null,
            tags: taskData.tags ? taskData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.tasks.unshift(task);
        this.saveData();
        this.render();
        this.showToast('Task Created', `"${task.title}" has been added to your tasks.`, 'success');
    }

    updateTask(taskId, taskData) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return;
        
        const task = this.tasks[taskIndex];
        task.title = taskData.title.trim();
        task.description = taskData.description.trim();
        task.category = taskData.category || null;
        task.priority = taskData.priority || 'medium';
        task.dueDate = taskData.dueDate || null;
        task.dueTime = taskData.dueTime || null;
        task.tags = taskData.tags ? taskData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
        task.updatedAt = new Date().toISOString();
        
        this.saveData();
        this.render();
        this.showToast('Task Updated', `"${task.title}" has been updated.`, 'success');
    }

    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return;
        
        const task = this.tasks[taskIndex];
        this.tasks.splice(taskIndex, 1);
        this.saveData();
        this.render();
        this.showToast('Task Deleted', `"${task.title}" has been removed.`, 'warning');
    }

    toggleTaskComplete(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) return;
        
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
        
        this.saveData();
        this.render();
        
        const message = task.completed ? 'Task completed!' : 'Task reopened';
        const type = task.completed ? 'success' : 'warning';
        this.showToast(message, `"${task.title}"`, type);
    }

    duplicateTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) return;
        
        const duplicatedTask = {
            ...task,
            id: this.generateId(),
            title: `${task.title} (Copy)`,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.tasks.unshift(duplicatedTask);
        this.saveData();
        this.render();
        this.showToast('Task Duplicated', `"${duplicatedTask.title}" has been created.`, 'success');
    }

    // Category Management
    createCategory(categoryData) {
        const category = {
            id: this.generateId(),
            name: categoryData.name.trim(),
            color: categoryData.color
        };
        
        this.categories.push(category);
        this.saveData();
        this.renderCategories();
        this.renderTaskModal();
        this.showToast('Category Created', `"${category.name}" category has been added.`, 'success');
    }

    deleteCategory(categoryId) {
        const categoryIndex = this.categories.findIndex(cat => cat.id === categoryId);
        if (categoryIndex === -1) return;
        
        const category = this.categories[categoryIndex];
        
        // Remove category from tasks
        this.tasks.forEach(task => {
            if (task.category === categoryId) {
                task.category = null;
            }
        });
        
        this.categories.splice(categoryIndex, 1);
        this.saveData();
        this.render();
        this.showToast('Category Deleted', `"${category.name}" category has been removed.`, 'warning');
    }

    // View Management
    switchView(view) {
        this.currentView = view;
        this.currentCategory = null;
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        // Update active category
        document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
        
        this.renderTasks();
    }

    switchCategory(categoryId) {
        this.currentView = 'category';
        this.currentCategory = categoryId;
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        
        // Update active category
        document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
        if (categoryId) {
            document.querySelector(`[data-category="${categoryId}"]`).classList.add('active');
        }
        
        this.renderTasks();
    }

    // Search and Filter
    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        const clearBtn = document.getElementById('clearSearch');
        clearBtn.style.display = query ? 'block' : 'none';
        this.renderTasks();
    }

    clearSearch() {
        document.getElementById('searchInput').value = '';
        this.searchQuery = '';
        document.getElementById('clearSearch').style.display = 'none';
        this.renderTasks();
    }

    handlePriorityFilter(priority) {
        this.currentPriorityFilter = priority;
        this.renderTasks();
    }

    handleSort(sortBy) {
        this.currentSortBy = sortBy;
        this.renderTasks();
    }

    // Task Filtering and Sorting
    getFilteredTasks() {
        let filteredTasks = [...this.tasks];
        
        // Filter by view
        switch (this.currentView) {
            case 'today':
                const today = new Date().toDateString();
                filteredTasks = filteredTasks.filter(task => 
                    task.dueDate && new Date(task.dueDate).toDateString() === today
                );
                break;
            case 'upcoming':
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                filteredTasks = filteredTasks.filter(task => 
                    task.dueDate && new Date(task.dueDate) > new Date() && !task.completed
                );
                break;
            case 'completed':
                filteredTasks = filteredTasks.filter(task => task.completed);
                break;
            case 'category':
                filteredTasks = filteredTasks.filter(task => task.category === this.currentCategory);
                break;
            default:
                // 'all' - no additional filtering
                break;
        }
        
        // Filter by priority
        if (this.currentPriorityFilter) {
            filteredTasks = filteredTasks.filter(task => task.priority === this.currentPriorityFilter);
        }
        
        // Filter by search query
        if (this.searchQuery) {
            filteredTasks = filteredTasks.filter(task => 
                task.title.toLowerCase().includes(this.searchQuery) ||
                task.description.toLowerCase().includes(this.searchQuery) ||
                task.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
            );
        }
        
        // Sort tasks
        filteredTasks.sort((a, b) => {
            switch (this.currentSortBy) {
                case 'dueDate':
                    if (!a.dueDate && !b.dueDate) return 0;
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                case 'priority':
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                case 'alphabetical':
                    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
                default: // 'created'
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });
        
        return filteredTasks;
    }

    // Modal Management
    openTaskModal(taskId = null) {
        this.editingTaskId = taskId;
        const modal = document.getElementById('taskModal');
        const form = document.getElementById('taskForm');
        const title = document.getElementById('modalTitle');
        
        if (taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (!task) return;
            
            title.textContent = 'Edit Task';
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskCategory').value = task.category || '';
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskDueDate').value = task.dueDate || '';
            document.getElementById('taskDueTime').value = task.dueTime || '';
            document.getElementById('taskTags').value = task.tags.join(', ');
        } else {
            title.textContent = 'Add New Task';
            form.reset();
            document.getElementById('taskPriority').value = 'medium';
        }
        
        modal.style.display = 'flex';
        document.getElementById('taskTitle').focus();
    }

    closeTaskModal() {
        document.getElementById('taskModal').style.display = 'none';
        this.editingTaskId = null;
    }

    openCategoryModal() {
        const modal = document.getElementById('categoryModal');
        document.getElementById('categoryForm').reset();
        document.getElementById('categoryColor').value = '#3b82f6';
        modal.style.display = 'flex';
        document.getElementById('categoryName').focus();
    }

    closeCategoryModal() {
        document.getElementById('categoryModal').style.display = 'none';
    }

    // Form Handlers
    handleTaskSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const taskData = {
            title: formData.get('taskTitle') || document.getElementById('taskTitle').value,
            description: formData.get('taskDescription') || document.getElementById('taskDescription').value,
            category: formData.get('taskCategory') || document.getElementById('taskCategory').value,
            priority: formData.get('taskPriority') || document.getElementById('taskPriority').value,
            dueDate: formData.get('taskDueDate') || document.getElementById('taskDueDate').value,
            dueTime: formData.get('taskDueTime') || document.getElementById('taskDueTime').value,
            tags: formData.get('taskTags') || document.getElementById('taskTags').value
        };
        
        if (!taskData.title.trim()) {
            this.showToast('Error', 'Task title is required.', 'error');
            return;
        }
        
        if (this.editingTaskId) {
            this.updateTask(this.editingTaskId, taskData);
        } else {
            this.createTask(taskData);
        }
        
        this.closeTaskModal();
    }

    handleCategorySubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const categoryData = {
            name: formData.get('categoryName') || document.getElementById('categoryName').value,
            color: formData.get('categoryColor') || document.getElementById('categoryColor').value
        };
        
        if (!categoryData.name.trim()) {
            this.showToast('Error', 'Category name is required.', 'error');
            return;
        }
        
        // Check for duplicate names
        if (this.categories.some(cat => cat.name.toLowerCase() === categoryData.name.toLowerCase())) {
            this.showToast('Error', 'A category with this name already exists.', 'error');
            return;
        }
        
        this.createCategory(categoryData);
        this.closeCategoryModal();
    }

    // Data Export/Import
    exportData() {
        const data = {
            tasks: this.tasks,
            categories: this.categories,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Data Exported', 'Your tasks have been exported successfully.', 'success');
    }

    importData(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                
                if (!data.tasks || !Array.isArray(data.tasks)) {
                    throw new Error('Invalid file format');
                }
                
                // Merge imported data
                const importedTasks = data.tasks.map(task => ({
                    ...task,
                    id: task.id || this.generateId()
                }));
                
                const importedCategories = data.categories || [];
                
                // Ask user how to handle import
                if (confirm('Do you want to replace all existing data? Click Cancel to merge with existing data.')) {
                    this.tasks = importedTasks;
                    this.categories = [...this.getDefaultCategories(), ...importedCategories];
                } else {
                    // Merge data
                    this.tasks = [...this.tasks, ...importedTasks];
                    importedCategories.forEach(importedCat => {
                        if (!this.categories.some(cat => cat.name === importedCat.name)) {
                            this.categories.push(importedCat);
                        }
                    });
                }
                
                this.saveData();
                this.render();
                this.showToast('Data Imported', `Successfully imported ${importedTasks.length} tasks.`, 'success');
                
            } catch (error) {
                this.showToast('Import Error', 'Failed to import data. Please check the file format.', 'error');
            }
        };
        
        reader.readAsText(file);
        e.target.value = ''; // Reset file input
    }

    // Rendering
    render() {
        this.renderCategories();
        this.renderTaskModal();
        this.renderTasks();
        this.updateCounts();
    }

    renderCategories() {
        const container = document.getElementById('categoriesList');
        container.innerHTML = '';
        
        this.categories.forEach(category => {
            const categoryEl = document.createElement('button');
            categoryEl.className = 'category-item';
            categoryEl.dataset.category = category.id;
            categoryEl.innerHTML = `
                <div class="category-color" style="background-color: ${category.color}"></div>
                <span>${category.name}</span>
                <button class="task-action delete" onclick="event.stopPropagation(); app.deleteCategory('${category.id}')" title="Delete category">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            categoryEl.addEventListener('click', () => this.switchCategory(category.id));
            container.appendChild(categoryEl);
        });
    }

    renderTaskModal() {
        const categorySelect = document.getElementById('taskCategory');
        const currentValue = categorySelect.value;
        
        categorySelect.innerHTML = '<option value="">No Category</option>';
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
        
        categorySelect.value = currentValue;
    }

    renderTasks() {
        const container = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        container.style.display = 'block';
        emptyState.style.display = 'none';
        container.innerHTML = '';
        
        filteredTasks.forEach(task => {
            const taskEl = this.createTaskElement(task);
            container.appendChild(taskEl);
        });
    }

    createTaskElement(task) {
        const taskEl = document.createElement('div');
        taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskEl.dataset.taskId = task.id;
        
        const category = this.categories.find(cat => cat.id === task.category);
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let dueDateClass = '';
        let dueDateText = '';
        if (dueDate) {
            const dueDateTime = new Date(dueDate);
            dueDateTime.setHours(0, 0, 0, 0);
            
            if (dueDateTime < today) {
                dueDateClass = 'overdue';
                dueDateText = 'Overdue';
            } else if (dueDateTime.getTime() === today.getTime()) {
                dueDateClass = 'today';
                dueDateText = 'Today';
            } else {
                dueDateText = this.formatDate(dueDate);
            }
            
            if (task.dueTime) {
                dueDateText += ` at ${task.dueTime}`;
            }
        }
        
        taskEl.innerHTML = `
            <div class="task-header">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="app.toggleTaskComplete('${task.id}')">
                    ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="task-content">
                    <div class="task-title">${this.escapeHtml(task.title)}</div>
                    ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                    <div class="task-meta">
                        ${category ? `
                            <div class="task-category">
                                <div class="category-color" style="background-color: ${category.color}"></div>
                                ${category.name}
                            </div>
                        ` : ''}
                        <div class="task-priority ${task.priority}">${task.priority}</div>
                        ${dueDate ? `<div class="task-due-date ${dueDateClass}"><i class="fas fa-calendar"></i> ${dueDateText}</div>` : ''}
                        ${task.tags.length > 0 ? `
                            <div class="task-tags">
                                ${task.tags.map(tag => `<span class="task-tag">${this.escapeHtml(tag)}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-action" onclick="app.openTaskModal('${task.id}')" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-action" onclick="app.duplicateTask('${task.id}')" title="Duplicate task">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="task-action delete" onclick="app.deleteTask('${task.id}')" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        return taskEl;
    }

    updateCounts() {
        const allTasks = this.tasks;
        const today = new Date().toDateString();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        document.getElementById('allCount').textContent = allTasks.length;
        document.getElementById('todayCount').textContent = allTasks.filter(task => 
            task.dueDate && new Date(task.dueDate).toDateString() === today
        ).length;
        document.getElementById('upcomingCount').textContent = allTasks.filter(task => 
            task.dueDate && new Date(task.dueDate) > new Date() && !task.completed
        ).length;
        document.getElementById('completedCount').textContent = allTasks.filter(task => task.completed).length;
    }

    // Toast Notifications
    showToast(title, message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.removeToast(toast));
        
        container.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => this.removeToast(toast), 5000);
    }

    removeToast(toast) {
        if (toast.parentNode) {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }

    // Utility Functions
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application
const app = new AdvancedTodoApp();

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}