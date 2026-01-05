# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Frontend: React.js application (existing project) Backend: Node.js with Express.js Database: MongoDB Atlas

The system provides the following major functionalities:
Data creation through forms Retrieval of data from backend APIs Updating existing records Deleting records Serving static resources such as images Validation and error handling

Operating Environment
Frontend: React.js Backend: Node.js with Express.js Database: MongoDB Atlas API Testing Tool: Postman Browser: Microsoft Edge

MongoDB Atlas must be used for database storage Data exchange must be in JSON format REST API architecture is followed

The React application shall fetch data from backend APIs using fetch() or async/await. The system shall use useEffect() to load backend data on component mount. Static data and LocalStorage usage shall be completely removed. The UI shall display error messages for failed API requests. The system shall submit form data from React to the backend using POST APIs. The system shall perform frontend validation before API submission. The backend shall perform server-side validation. The system shall display success or error messages based on API responses. Forms shall reset after successful submission.

All APIs are tested using Postman. The system shall return appropriate success and error responses.

Student Marks Card Upload API
Features Added
Multi-file Upload: Upload 1-8 semester marks cards (PDF, JPG, PNG) in single request
Secure Storage: Random filenames prevent path traversal and collisions
Validation: File type, size (≤2MB), count (≤8) enforced
Error Handling: Comprehensive HTTP status codes and JSON responses

API Endpoints
POST /api/students/upload-marksheets
Upload required marks cards (1-8 files)

Content-Type: multipart/form-data

Body: form-data marksheets: [File] sem1.pdf marksheets: [File] sem2.jpg marksheets: [File] sem3.png till 8 files

{ "success": true, "count": 8, "files": [ { "originalName": "3rd Sem.pdf", "filename": "marksheet-e9853dcdcad38ea376803599d2ff47f1.pdf", "mimetype": "application/pdf", "size": 374970, "path": "/uploads/marksheets/marksheet-e9853dcdcad38ea376803599d2ff47f1.pdf" }, ............. till 8 files } 400 - Invalid file type { "success": false, "error": "Only PDF, JPG, and PNG files are allowed" }

400 - File too large { "success": false, "error": "File size exceeds 2MB limit" }

400 - Too many files { "success": false, "error": "Maximum 8 files allowed" }

400 - No files { "success": false, "error": "No files uploaded" }
