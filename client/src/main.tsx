import { createRoot } from "react-dom/client";
import { Amplify } from 'aws-amplify';
import App from "./App";
import "./index.css";
import amplifyConfig from './amplifyconfiguration';

// Configure Amplify
Amplify.configure(amplifyConfig);

createRoot(document.getElementById("root")!).render(<App />);
