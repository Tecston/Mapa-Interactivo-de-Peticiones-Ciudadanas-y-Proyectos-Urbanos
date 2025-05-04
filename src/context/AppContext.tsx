import React, { useState, createContext, useContext } from 'react';
export interface Request {
  id: string;
  title: string;
  description: string;
  location: [number, number];
  imageUrl?: string;
  authorName: string;
  date: string;
  category: string;
  supports: number;
  comments: Comment[];
}
export interface Project {
  id: string;
  title: string;
  description: string;
  location: [number, number];
  imageUrl?: string;
  institution: string;
  status: 'planning' | 'in-progress' | 'completed';
  startDate: string;
  endDate?: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}
export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}
export interface User {
  id: string;
  name: string;
  points: number;
  isAdmin: boolean;
}
interface AppContextType {
  requests: Request[];
  projects: Project[];
  currentUser: User;
  addRequest: (request: Omit<Request, 'id' | 'date' | 'supports' | 'comments'>) => void;
  addProject: (project: Omit<Project, 'id' | 'likes' | 'dislikes' | 'comments'>) => void;
  supportRequest: (requestId: string) => void;
  likeProject: (projectId: string) => void;
  dislikeProject: (projectId: string) => void;
  addComment: (type: 'request' | 'project', id: string, text: string) => void;
  deleteRequest: (id: string) => void;
  deleteProject: (id: string) => void;
}
const initialRequests: Request[] = [{
  id: '1',
  title: 'Necesitamos un parque infantil',
  description: 'Esta zona carece de espacios recreativos para niños. Un parque mejoraría la calidad de vida.',
  location: [19.432608, -99.133209],
  imageUrl: 'https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  authorName: 'María González',
  date: '2023-10-15',
  category: 'Recreación',
  supports: 24,
  comments: [{
    id: 'c1',
    author: 'Juan Pérez',
    text: 'Totalmente de acuerdo, hace mucha falta.',
    date: '2023-10-16'
  }]
}, {
  id: '2',
  title: 'Reparación urgente de baches',
  description: 'La calle principal tiene baches peligrosos que han causado accidentes.',
  location: [19.435608, -99.137209],
  authorName: 'Carlos Rodríguez',
  date: '2023-10-12',
  category: 'Infraestructura',
  supports: 45,
  comments: []
}];
const initialProjects: Project[] = [{
  id: '1',
  title: 'Renovación Plaza Central',
  description: 'Proyecto de renovación completa de la plaza central con nuevas áreas verdes y mobiliario urbano.',
  location: [19.432108, -99.131209],
  imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  institution: 'Secretaría de Desarrollo Urbano',
  status: 'in-progress',
  startDate: '2023-09-01',
  endDate: '2024-03-01',
  likes: 78,
  dislikes: 12,
  comments: [{
    id: 'c1',
    author: 'Ana López',
    text: '¿Cuándo estará finalizada la primera etapa?',
    date: '2023-10-05'
  }]
}, {
  id: '2',
  title: 'Ciclovía Norte-Sur',
  description: 'Construcción de ciclovía que conectará el norte y sur de la ciudad.',
  location: [19.437608, -99.133209],
  institution: 'Secretaría de Movilidad',
  status: 'planning',
  startDate: '2024-01-15',
  likes: 120,
  dislikes: 25,
  comments: []
}];
const initialUser: User = {
  id: '1',
  name: 'Usuario Demo',
  points: 50,
  isAdmin: false
};
export const AppContext = createContext<AppContextType>({} as AppContextType);
export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const addRequest = (request: Omit<Request, 'id' | 'date' | 'supports' | 'comments'>) => {
    const newRequest: Request = {
      ...request,
      id: `req-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      supports: 0,
      comments: []
    };
    setRequests([...requests, newRequest]);
    // Add points to user for creating a request
    setCurrentUser({
      ...currentUser,
      points: currentUser.points + 10
    });
  };
  const addProject = (project: Omit<Project, 'id' | 'likes' | 'dislikes' | 'comments'>) => {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      likes: 0,
      dislikes: 0,
      comments: []
    };
    setProjects([...projects, newProject]);
  };
  const supportRequest = (requestId: string) => {
    setRequests(requests.map(req => req.id === requestId ? {
      ...req,
      supports: req.supports + 1
    } : req));
    // Add points to user for supporting a request
    setCurrentUser({
      ...currentUser,
      points: currentUser.points + 2
    });
  };
  const likeProject = (projectId: string) => {
    setProjects(projects.map(proj => proj.id === projectId ? {
      ...proj,
      likes: proj.likes + 1
    } : proj));
    // Add points to user for liking a project
    setCurrentUser({
      ...currentUser,
      points: currentUser.points + 1
    });
  };
  const dislikeProject = (projectId: string) => {
    setProjects(projects.map(proj => proj.id === projectId ? {
      ...proj,
      dislikes: proj.dislikes + 1
    } : proj));
  };
  const addComment = (type: 'request' | 'project', id: string, text: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      author: currentUser.name,
      text,
      date: new Date().toISOString().split('T')[0]
    };
    if (type === 'request') {
      setRequests(requests.map(req => req.id === id ? {
        ...req,
        comments: [...req.comments, newComment]
      } : req));
    } else {
      setProjects(projects.map(proj => proj.id === id ? {
        ...proj,
        comments: [...proj.comments, newComment]
      } : proj));
    }
    // Add points to user for commenting
    setCurrentUser({
      ...currentUser,
      points: currentUser.points + 3
    });
  };
  const deleteRequest = (id: string) => {
    setRequests(requests.filter(req => req.id !== id));
  };
  const deleteProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };
  return <AppContext.Provider value={{
    requests,
    projects,
    currentUser,
    addRequest,
    addProject,
    supportRequest,
    likeProject,
    dislikeProject,
    addComment,
    deleteRequest,
    deleteProject
  }}>
      {children}
    </AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);