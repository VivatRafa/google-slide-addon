import { createRoot } from 'react-dom/client';
import UploadSidebar from './components/UploadSidebar';

import './styles.css';

const container = document.getElementById('index');
const root = createRoot(container);
root.render(<UploadSidebar />);
