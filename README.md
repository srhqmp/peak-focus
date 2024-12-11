# [Peak Focus](https://peak-focus.vercel.app/)

[**Peak Focus**](https://peak-focus.vercel.app/) is a web application built using **Next.js** and **Tailwind CSS**, inspired by [Pomofocus](https://pomofocus.io/). The project helps you boost productivity by managing focus and break intervals effectively.

## Features

- **Pomodoro Timer**: Start, pause, and reset timers for focus and break sessions.
- **Task Management**: Organize tasks and track their progress during focus sessions.
- **Audio Notifications**: Receive sound alerts when sessions end (powered by `use-sound`).
- **Drag-and-Drop Tasks**: Easily reorder tasks using `react-sortablejs`.
- **Responsive Design**: Built with Tailwind CSS for seamless viewing on all devices.

---

## Tech Stack

- **Next.js** (v15.0.2): Framework for server-rendered React applications.
- **React** (v18.3.1): UI library.
- **Tailwind CSS** (v3.4.1): Utility-first CSS framework for styling.
- **SortableJS**: Drag-and-drop functionality for task management.
- **use-sound**: Play audio alerts when timers finish.
- **TypeScript**: Type-safe development.

---

## Getting Started

### Prerequisites
Make sure you have **Node.js** and **npm** (or **yarn**) installed on your machine:

- [Node.js](https://nodejs.org/) (v18+ recommended)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/srhqmp/peak-focus.git
   cd peak-focus
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

- `npm run dev` - Run the development server.
- `npm run build` - Build the project for production.
- `npm run start` - Start the production server.
- `npm run lint` - Run ESLint to check for code quality.

---

## Dependencies

| Package            | Version |
|--------------------|---------|
| next               | 15.0.2  |
| react              | 18.3.1  |
| tailwindcss        | 3.4.1   |
| use-sound          | 4.0.3   |
| react-sortablejs   | 6.1.4   |
| sortablejs         | 1.15.3  |
| uuid               | 11.0.3  |

---

## Future Improvements

- Add session history tracking.
- Implement user authentication to save tasks and settings.
- Introduce dark mode toggle.
- Mofify timer durations.
- Display visual progress.
- Generate weekly reports.

---

## Acknowledgments
- Inspired by [Pomofocus](https://pomofocus.io/)
- Built to practice **Next.js** and **Tailwind CSS** skills.
