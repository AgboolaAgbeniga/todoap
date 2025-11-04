# Todo App 📝

A modern, feature-rich todo application built with React Native, Expo, and Convex backend. Features drag-and-drop reordering, theme switching, and real-time synchronization across devices.

## ✨ Features

- ✅ **Complete CRUD Operations**: Create, read, update, and delete todos
- 🔄 **Real-time Sync**: Powered by Convex for instant synchronization
- 🎯 **Drag & Drop**: Intuitive long-press drag reordering with visual feedback
- 🌙 **Theme Switching**: Light/dark mode with system preference detection
- 📱 **Cross-platform**: Works on iOS, Android, and Web
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 🔍 **Filtering**: Filter by all, active, or completed todos
- 💾 **Persistent Storage**: Data persists across app restarts and devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- A Convex account ([sign up here](https://www.convex.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd todoap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev --once --configure new --project todoapp
   ```

4. **Configure environment variables**

   Copy the generated `.env.local` file and ensure it contains:
   ```env
   CONVEX_DEPLOYMENT=<your-deployment-url>
   EXPO_PUBLIC_CONVEX_URL=<your-convex-url>
   ```

5. **Seed sample data (optional)**
   ```bash
   npx convex run todos:seedTodos
   ```

6. **Start the development server**
   ```bash
   npx expo start
   ```

## 📱 Usage

### Basic Operations
- **Add Todo**: Type in the input field and press Enter or tap the checkbox
- **Complete Todo**: Tap the circle checkbox next to any todo
- **Edit Todo**: Tap on the todo text to edit inline
- **Delete Todo**: Tap the ✕ button to delete a todo
- **Clear Completed**: Use the "Clear Completed" button to remove all finished todos

### Advanced Features
- **Reorder Todos**: Long-press any todo item to enter drag mode, then drag to reorder
- **Filter Todos**: Use the filter tabs (All, Active, Completed) at the bottom
- **Theme Toggle**: Tap the sun/moon icon in the header to switch themes
- **Clear Input**: Tap the cancel icon (✕) in the input field to clear text

## 🛠️ Build Commands

### Development
```bash
# Start Expo development server
npx expo start

# Start with specific platform
npx expo start --android
npx expo start --ios
npx expo start --web
```

### Production Build
```bash
# Build for production
npx expo build:android
npx expo build:ios
```

### Convex Commands
```bash
# Start Convex development server
npx convex dev

# Deploy to production
npx convex deploy

# Run Convex functions
npx convex run <function-name>

# View Convex dashboard
npx convex dashboard
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Convex Configuration
CONVEX_DEPLOYMENT=<your-deployment-name>
EXPO_PUBLIC_CONVEX_URL=<your-convex-url>

# Optional: Custom Convex URL for self-hosted
# CONVEX_SELF_HOSTED_URL=<your-custom-url>
```

### Convex Setup

1. **Initialize Convex project**:
   ```bash
   npx convex dev --configure new --project todoapp
   ```

2. **Database Schema**: The schema is defined in `convex/schema.ts` with the following structure:
   ```typescript
   todos: defineTable({
     text: v.string(),
     completed: v.boolean(),
     createdAt: v.number(),
     order: v.number(),
   })
   ```

3. **Available Functions**:
   - `getTodos`: Fetch all todos ordered by position
   - `addTodo`: Create a new todo
   - `toggleTodo`: Toggle completion status
   - `editTodo`: Update todo text
   - `deleteTodo`: Remove a todo
   - `clearCompleted`: Remove all completed todos
   - `reorderTodos`: Update todo order for drag-and-drop
   - `seedTodos`: Populate sample data

## 📁 Project Structure

```
todoap/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with Convex provider
│   └── index.tsx          # Main todo screen
├── components/            # Reusable UI components
│   ├── TodoInput.tsx      # Todo creation input
│   ├── TodoItem.tsx       # Individual todo item
│   ├── FilterTabs.tsx     # Todo filtering tabs
│   └── ThemeSwitcher.tsx  # Theme toggle button
├── contexts/              # React contexts
│   └── ThemeContext.tsx   # Theme management
├── convex/                # Convex backend
│   ├── schema.ts          # Database schema
│   ├── todos.ts           # Todo CRUD operations
│   └── _generated/        # Auto-generated types
├── hooks/                 # Custom React hooks
│   └── useTodos.ts        # Todo state management
├── lib/                   # Utility libraries
│   └── convex.ts          # Convex client configuration
└── assets/                # Static assets
    └── images/            # Icons and images
```

## 🎨 Customization

### Themes
The app supports light and dark themes. Theme colors are defined in `contexts/ThemeContext.tsx`. To add custom themes:

1. Add new color schemes to the theme definitions
2. Update the `ThemeType` interface
3. Modify the theme switching logic

### Styling
The app uses inline styles with StyleSheet. Global styles are in `global.css` for web compatibility.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed 

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - React Native framework
- [Convex](https://www.convex.dev/) - Real-time backend
- [React Native Draggable FlatList](https://github.com/computerjazz/react-native-draggable-flatlist) - Drag and drop functionality
- [Frontend Mentor](https://www.frontendmentor.io/) - Design inspiration
