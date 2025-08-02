# Advanced Todo App

A comprehensive, feature-rich todo list application with modern UI and advanced functionality. Built with vanilla JavaScript, HTML5, and CSS3.

![Advanced Todo App](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)

## ✨ Features

### Core Functionality
- ✅ **Task Management**: Create, edit, delete, and complete tasks
- 📝 **Rich Task Details**: Title, description, due date/time, priority levels
- 🏷️ **Tags System**: Add custom tags to organize tasks
- 📂 **Categories**: Create custom categories with color coding
- ✅ **Task Completion**: Mark tasks as complete/incomplete with visual feedback

### Advanced Features
- 🔍 **Smart Search**: Search tasks by title, description, or tags
- 🎯 **Multiple Views**: All tasks, Today, Upcoming, Completed
- 📊 **Filtering**: Filter by priority (High, Medium, Low)
- 🔄 **Sorting**: Sort by creation date, due date, priority, or alphabetically
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark/Light Theme**: Toggle between themes with persistent preference
- 💾 **Data Persistence**: Automatic local storage with no data loss
- 📤 **Export/Import**: Backup and restore your data as JSON files
- 🔄 **Task Duplication**: Quickly duplicate existing tasks
- 🎨 **Custom Categories**: Create categories with custom colors
- 🍞 **Toast Notifications**: Real-time feedback for all actions
- ⌨️ **Keyboard Shortcuts**: Quick actions via keyboard

### User Experience
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations
- 🔔 **Visual Indicators**: Overdue tasks, today's tasks, priority colors
- 📊 **Task Counters**: Real-time counts for different views
- 🎯 **Focus Management**: Proper focus handling for accessibility
- 🎪 **Smooth Animations**: Subtle animations and transitions

## 🚀 Quick Start

### Option 1: Simple Setup (Recommended)
1. **Download/Clone** the repository
2. **Navigate** to the `advanced-todo-app` directory
3. **Run** a local server:
   ```bash
   # Using Python (if installed)
   python3 -m http.server 8000
   
   # Or using Node.js (if installed)
   npx http-server -p 8000
   
   # Or using PHP (if installed)
   php -S localhost:8000
   ```
4. **Open** your browser and go to `http://localhost:8000`

### Option 2: Direct File Access
1. **Download** the repository
2. **Open** `index.html` directly in your web browser
3. **Note**: Some features may be limited when opening directly

## 📖 Usage Guide

### Getting Started
1. **Add Your First Task**: Click the "Add Task" button or use `Ctrl+N` (Cmd+N on Mac)
2. **Fill Task Details**: Add title, description, category, priority, due date, and tags
3. **Save**: Click "Save Task" to create your task

### Navigation
- **All Tasks**: View all your tasks
- **Today**: Tasks due today
- **Upcoming**: Future tasks that aren't completed
- **Completed**: All completed tasks
- **Categories**: Click any category to filter tasks

### Search and Filter
- **Search**: Use the search box to find tasks by title, description, or tags
- **Priority Filter**: Filter tasks by High, Medium, or Low priority
- **Sort Options**: Sort by creation date, due date, priority, or alphabetically

### Task Management
- **Complete Task**: Click the checkbox next to any task
- **Edit Task**: Click the edit icon (pencil) on any task
- **Duplicate Task**: Click the copy icon to create a duplicate
- **Delete Task**: Click the trash icon to remove a task

### Categories
- **Create Category**: Click "Add Category" in the sidebar
- **Choose Colors**: Select from preset colors or use the color picker
- **Delete Category**: Click the trash icon next to any category

### Data Management
- **Export Data**: Click the download icon in the header to backup your data
- **Import Data**: Click the upload icon to restore from a backup file
- **Automatic Saving**: All changes are automatically saved to your browser

### Keyboard Shortcuts
- `Ctrl+N` / `Cmd+N`: Add new task
- `Ctrl+F` / `Cmd+F`: Focus search box
- `Ctrl+S` / `Cmd+S`: Export data
- `Escape`: Close any open modal

## 🎨 Themes

The app supports both light and dark themes:
- **Light Theme**: Clean, bright interface perfect for daytime use
- **Dark Theme**: Easy on the eyes for low-light environments
- **Automatic Persistence**: Your theme preference is remembered

Toggle themes using the moon/sun icon in the header.

## 📱 Responsive Design

The app is fully responsive and works great on:
- **Desktop**: Full sidebar with all features
- **Tablet**: Optimized layout with adjusted spacing
- **Mobile**: Stacked layout with touch-friendly interactions

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS Variables
- **JavaScript ES6+**: Modern JavaScript with classes and modules
- **Local Storage**: Browser-based data persistence
- **Font Awesome**: Icons for enhanced UI
- **Google Fonts**: Inter font family for clean typography

### Browser Support
- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

### File Structure
```
advanced-todo-app/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and themes
├── script.js           # JavaScript application logic
├── package.json        # Project metadata
└── README.md          # This documentation
```

### Data Storage
- **Local Storage**: Tasks and categories are stored in browser's local storage
- **JSON Format**: Data is stored in structured JSON format
- **Export Format**: Backup files include version info and export date

## 🎯 Advanced Usage

### Custom Categories
1. Click "Add Category" in the sidebar
2. Enter a name for your category
3. Choose a color (preset or custom)
4. Use categories to organize related tasks

### Task Tags
- Add multiple tags separated by commas
- Use tags for additional organization (e.g., "urgent", "work", "personal")
- Search works across tags for easy filtering

### Due Date Management
- Set both date and time for precise scheduling
- Visual indicators show overdue (red) and today's tasks (orange)
- Sort by due date to prioritize time-sensitive tasks

### Data Backup Strategy
1. **Regular Exports**: Export your data monthly or before major changes
2. **Multiple Backups**: Keep several backup files with dates
3. **Cross-Device**: Use export/import to sync between devices

## 🛠️ Customization

### Modifying Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3b82f6;    /* Main theme color */
    --success-color: #10b981;    /* Success/complete color */
    --warning-color: #f59e0b;    /* Warning/today color */
    --danger-color: #ef4444;     /* Error/overdue color */
}
```

### Adding New Features
The code is well-structured and documented. Key areas:
- **Task Management**: `createTask()`, `updateTask()`, `deleteTask()`
- **Filtering**: `getFilteredTasks()` method
- **UI Rendering**: `render()`, `renderTasks()`, `renderCategories()`
- **Data Persistence**: `saveData()`, `loadData()`

## 🐛 Troubleshooting

### Common Issues

**Tasks not saving:**
- Ensure you're running on a local server or modern browser
- Check browser console for any JavaScript errors

**Import not working:**
- Verify the JSON file format is correct
- Ensure the file was exported from this app or follows the same structure

**Responsive issues:**
- Clear browser cache and reload
- Ensure you're using a supported browser version

### Getting Help
If you encounter issues:
1. Check the browser console for error messages
2. Verify you're using a supported browser
3. Try refreshing the page or clearing browser data

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional export formats (CSV, PDF)
- Cloud synchronization
- Recurring tasks
- Task collaboration features
- Mobile app version

## 🔮 Future Enhancements

Planned features for future versions:
- 📊 **Analytics Dashboard**: Task completion statistics and productivity insights
- 🔄 **Recurring Tasks**: Set up repeating tasks with various intervals
- 👥 **Collaboration**: Share tasks and categories with others
- 📱 **PWA Support**: Install as a mobile app with offline functionality
- ☁️ **Cloud Sync**: Synchronize data across devices
- 🎵 **Sound Notifications**: Audio alerts for due tasks
- 📈 **Progress Tracking**: Visual progress bars and completion rates
- 🌍 **Internationalization**: Support for multiple languages

---

**Made with ❤️ for productivity enthusiasts**

*Version 1.0.0 - Built with modern web technologies*