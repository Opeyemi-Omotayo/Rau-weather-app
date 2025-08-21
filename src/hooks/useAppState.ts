import { useContext } from 'react';
import { AppStateContext } from '@/contexts/appState';

export const useAppState = () => useContext(AppStateContext)