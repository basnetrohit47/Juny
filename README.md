# NewTab Chrome Extension

This is a Chrome Extension built with React, TypeScript, React Query, Zustand, and MUI (Material UI) components. The extension is designed to enhance the new tab page experience by providing a beautiful background, a to-do list, and a quick way to add and manage your favorite websites.

## Features

- **Favorite Sites**: Easily add, view, and manage your favorite websites.
- **Beautiful Background**: A new, beautiful background every day.
- **To-Do List**: Keep track of your tasks and manage your daily activities.
- **IndexedDB**: Data persistence is handled using IndexedDB for local storage.
- **Tailwind CSS**: For quick, responsive, and customizable styling.
- **MUI Components**: User-friendly interface using Material UI (MUI) components.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that provides static typing.
- **React Query**: Data fetching and caching library for React.
- **Zustand**: A small, fast state-management library for React.
- **IndexedDB**: Client-side database used for persistent data storage.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Material UI (MUI)**: React UI components for modern, responsive layouts.

---

## 📸 Demo

### Juny Chrome Extension:

![Juny Demo](public/juny-screen.png)

---

## Installation

To get started with the extension, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/newtab-chrome-extension.git
```

### 2. Navigate to the project directory

```bash
cd newtab-chrome-extension
```

### 3. Install dependencies

Make sure you have `Node.js` and `npm` (or `yarn`) installed on your machine. Then run:

```bash
npm install
```

or if you're using `yarn`:

```bash
yarn install
```

### 4. Build the Extension

```bash
npm run build
```

or if you're using `yarn`:

```bash
yarn build
```

### 5. Load the extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer Mode" by toggling the switch at the top right.
3. Click on "Load unpacked" and select the `build` folder inside your project directory.

The extension should now be active and running!

## Usage

### Favorite Sites:

- You can add and manage your favorite websites directly from the extension's UI.
- These websites are stored in `IndexedDB` and persist even after closing the browser.

### Beautiful Background:

- Every time you open a new tab, you'll be greeted with a beautiful background image.
- The background changes automatically every day to give a fresh experience.

### To-Do List:

- Add tasks to your to-do list, mark them as completed, or delete them.
- Your tasks are stored locally using IndexedDB for persistent data storage.

## Development

To run the extension in development mode, follow these steps:

1. Start the development server:

   ```bash
   npm run start
   ```

2. Open `chrome://extensions/` in your browser.
3. Enable "Developer Mode" and click on "Load unpacked".
4. Select the `public` directory (or the directory where the build is located).
5. You can now view changes live as you modify the code.

## Testing

To run tests (if applicable):

```bash
npm test
```

This will run the tests using your configured testing setup.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [React Query](https://react-query.tanstack.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

Feel free to open issues, contribute, or reach out for suggestions!
