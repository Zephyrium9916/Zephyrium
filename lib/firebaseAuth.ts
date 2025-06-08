import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';

export const auth = getAuth(app);
