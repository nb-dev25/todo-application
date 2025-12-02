# Frontend To-Do Application | Shona Prince Technologies

A **premium, professionally branded** To-Do application built with React and TypeScript for Shona Prince Technologies. This application showcases advanced frontend development skills with a sleek monochromatic design, smooth animations, and exceptional user experience.

## 🎨 Design Highlights

- **Professional Branding**: Integrated SPT logo and monochromatic color scheme (black, white, grey)
- **Modern Minimalist UI**: Clean, professional design matching Starlink-inspired aesthetics
- **Smooth Animations**: Carefully crafted animations and micro-interactions throughout
- **Premium Typography**: Using Inter font family for a clean, professional look
- **Responsive Design**: Flawless experience on all devices (mobile, tablet, desktop)
- **Visual Feedback**: Hover effects, loading states, and transitions that delight users
- **Accessibility**: ARIA labels and semantic HTML for inclusive design

## Features

### Core Functionality
- ✅ **To-Do List Display**: View all your todos with title, description, and completion status
- ✅ **Add New To-Do**: Create new todo items with a simple form
- ✅ **Update To-Do**: Edit existing todos through a modal interface
- ✅ **Mark as Complete**: Toggle completion status with a checkbox
- ✅ **Delete To-Do**: Remove todos with confirmation

### Mock API Integration
- ✅ **GET Request**: Fetch initial todo list with simulated network delay
- ✅ **POST Request**: Create new todos with proper error handling
- ✅ **PUT Request**: Update existing todos (title, description, completion status)
- ✅ **DELETE Request**: Remove todos from the list
- ✅ **Simulated Delays**: Realistic network latency simulation (400-800ms)
- ✅ **Error Simulation**: 10% failure rate to demonstrate error handling

### State Management & UI/UX
- ✅ **Loading States**: Spinner indicators during API calls
- ✅ **Error Handling**: Clear error messages with dismiss functionality
- ✅ **Strict TypeScript**: Full type safety with no `any` types
- ✅ **Reusable Components**: Well-structured, modular component architecture
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices

### React Fundamentals
- ✅ **Modern Hooks**: Uses `useState` and `useEffect` appropriately
- ✅ **Component Lifecycles**: Proper side effect management
- ✅ **Best Practices**: Clean, maintainable, and well-commented code

## 🛠 Technology Stack

- **React 18.2.0**: Modern React with hooks
- **TypeScript 5.2.2**: Strict type-safe JavaScript
- **Vite 5.0.8**: Lightning-fast build tool and dev server
- **CSS3 Advanced**: Custom responsive styling with:
  - CSS Grid & Flexbox
  - CSS Animations & Transitions
  - Monochromatic color system
  - Professional shadows and borders
  - Custom cubic-bezier timing functions
- **Google Fonts**: Inter font family for premium typography
- **Branding**: Shona Prince Technologies logo and color scheme

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── AddToDoForm.tsx  # Form for creating new todos
│   │   ├── EditModal.tsx    # Modal for editing todos
│   │   ├── ToDoItem.tsx     # Individual todo item component
│   │   ├── ToDoList.tsx     # List of todos component
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   └── ErrorMessage.tsx  # Error display component
│   ├── services/
│   │   └── mockApi.ts       # Mock API service with simulated delays
│   ├── types/
│   │   └── todo.ts          # TypeScript interfaces and types
│   ├── App.tsx              # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Installation

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)

### Steps

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - The application will be available at `http://localhost:5173`
   - The terminal will display the exact URL

## Available Scripts

- `npm run dev`: Start the development server with hot module replacement
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint to check code quality

## Usage

### Creating a Todo

1. Fill in the "Title" and "Description" fields in the "Add New To-Do" form
2. Click the "Add Todo" button
3. The new todo will appear in the list below

### Editing a Todo

1. Click the "Edit" button on any todo item
2. A modal will open with the current todo details
3. Modify the title, description, or completion status
4. Click "Save Changes" to update

### Marking as Complete

1. Click the checkbox next to any todo item
2. The todo will be marked as complete/incomplete
3. Completed todos are visually distinguished with a strikethrough

### Deleting a Todo

1. Click the "Delete" button on any todo item
2. Confirm the deletion in the dialog
3. The todo will be removed from the list

## Code Quality

- **TypeScript**: Strict mode enabled with no implicit `any`
- **ESLint**: Configured for React and TypeScript best practices
- **Code Comments**: Comprehensive JSDoc comments throughout
- **Error Handling**: Proper try-catch blocks with user-friendly messages
- **Accessibility**: ARIA labels and semantic HTML

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Production Build

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready for deployment.

## Key Implementation Details

### Mock API Service

The `mockApi.ts` service simulates a real REST API:
- **Delays**: 400-800ms to mimic network latency
- **Error Rate**: 10% random failure rate for testing error handling
- **Data Persistence**: Uses in-memory storage (resets on page refresh)

### State Management

The application uses React's built-in state management:
- `useState` for local component state
- `useEffect` for side effects (fetching data on mount)
- Proper state updates to trigger re-renders

### Component Architecture

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components are designed to be reusable
- **Props Typing**: All props are strictly typed with TypeScript interfaces

## Future Enhancements

Potential improvements for production:
- Backend API integration
- User authentication
- Data persistence (localStorage or database)
- Todo categories/tags
- Due dates and reminders
- Search and filter functionality
- Drag-and-drop reordering

## License

This project is created for assessment purposes.

## Author

Built as part of the Frontend To-Do Application Competency Task for Shona Prince Technologies.

---

**Note**: This application uses mock data and simulated API calls. In a production environment, you would replace the `mockApi` service with actual API calls to a backend server.

