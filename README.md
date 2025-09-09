# CRUD Operations with Appwrite

A modern, full-stack web application built with Next.js and Appwrite for managing interpretations (terms and their meanings). This project demonstrates CRUD operations using Appwrite as the backend database.

## Features

- **View Interpretations**: Display a list of all stored interpretations
- **Create New**: Add new terms and their interpretations
- **Edit Existing**: Update existing interpretations
- **Delete**: Remove interpretations from the database
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Updates**: Instant UI updates after operations

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Appwrite (Database, Authentication)
- **Deployment**: Vercel-ready

## Prerequisites

Before running this application, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn package manager
- An Appwrite account and project

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd appwrite-crud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Appwrite**

   a. Create a new project in your Appwrite console

   b. Create a database and a collection for interpretations

   c. Add the following attributes to your collection:
      - `term` (string)
      - `interpretation` (string)

   d. Update permissions to allow read/write access

4. **Configure environment variables**

   Create a `.env.local` file in the root directory and add your Appwrite configuration:

   ```env
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   ```

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Viewing Interpretations
- The home page displays all stored interpretations
- Each interpretation shows the term and its meaning
- Loading states and error handling are included

### Creating New Interpretations
- Click the "+ Add New" button in the header
- Fill in the term and interpretation fields
- Submit to save to the database

### Editing Interpretations
- Click the "Edit" button on any interpretation card
- Modify the fields as needed
- Save changes to update the database

### Deleting Interpretations
- Click the "Delete" button on any interpretation card
- Confirm deletion to remove from the database

## API Routes

The application includes the following API endpoints:

- `GET /api/interpretations` - Fetch all interpretations
- `POST /api/interpretations` - Create a new interpretation
- `GET /api/interpretations/[id]` - Fetch a specific interpretation
- `PUT /api/interpretations/[id]` - Update an interpretation
- `DELETE /api/interpretations/[id]` - Delete an interpretation

## Project Structure

```
appwrite-crud/
├── app/
│   ├── api/
│   │   └── interpretations/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── create/
│   │   └── page.tsx
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── appwrite_client.ts
├── public/
│   └── (assets)
├── package.json
└── README.md
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## Acknowledgments

- [Appwrite](https://appwrite.io/) for the backend-as-a-service
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
