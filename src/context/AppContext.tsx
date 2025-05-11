// src/context/AppContext.tsx
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

// ——— Datos iniciales ———
const initialRequests: Request[] = [
  {
    id: '1',
    title: 'Mejorar drenaje pluvial en Paseo del Pedregal',
    description: 'Durante lluvias fuertes, la zona sufre inundaciones. Se necesita intervención para mejorar el drenaje pluvial.',
    location: [29.054100, -110.980900],
    imageUrl: 'https://images.unsplash.com/photo-1552083375-1447ce886485',
    authorName: 'Lucía Romero',
    date: '2024-11-02',
    category: 'Infraestructura',
    supports: 17,
    comments: [
      {
        id: 'c1',
        author: 'Andrés Ruiz',
        text: 'Es urgente, cada año hay daños en las casas.',
        date: '2024-11-03',
      },
    ],
  },
  {
    id: '2',
    title: 'Solicitamos reforestación en la colonia La Manga',
    description: 'La zona ha perdido árboles en los últimos años. Pedimos un plan de reforestación con especies nativas.',
    location: [29.017890, -110.956220],
    authorName: 'Raúl Espinoza',
    date: '2024-11-04',
    category: 'Medio Ambiente',
    supports: 32,
    comments: [],
  },
];

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Centro Cultural del Sur',
    description: 'Espacio dedicado a actividades culturales, artísticas y recreativas en el sector sur de Hermosillo.',
    location: [29.015300, -111.004200],
    imageUrl: 'https://inba.gob.mx/multimedia/espacios-culturales/68/68-EC-BG-teatro_julio_castillo.jpg',
    institution: 'Instituto Municipal de Cultura',
    status: 'planning',
    startDate: '2025-01-10',
    endDate: '2025-10-30',
    likes: 65,
    dislikes: 5,
    comments: [],
  },
  {
    id: '2',
    title: 'Mercado de productores KM0',
    description: 'Desarrollo de un espacio comercial para venta directa de productos regionales y orgánicos en la colonia Las Quintas.',
    location: [29.083320, -110.965470],

    institution: 'Secretaría de Economía Social',
    status: 'in-progress',
    startDate: '2024-08-01',
    endDate: '2025-03-15',
    likes: 98,
    dislikes: 7,
    comments: [
      {
        id: 'c1',
        author: 'María Félix',
        text: 'Gran iniciativa, esto impulsará a los productores locales.',
        date: '2024-09-01',
      },
    ],
  },
];

const initialUser: User = {
  id: '1',
  name: 'Usuario Demo',
  points: 50,
  isAdmin: true,
};

// ——— Contexto ———
export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentUser, setCurrentUser] = useState<User>(initialUser);

  const addRequest = (request: Omit<Request, 'id' | 'date' | 'supports' | 'comments'>) => {
    const newRequest: Request = {
      ...request,
      id: `req-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      supports: 0,
      comments: [],
    };
    setRequests([...requests, newRequest]);
    setCurrentUser({ ...currentUser, points: currentUser.points + 10 });
  };

  const addProject = (project: Omit<Project, 'id' | 'likes' | 'dislikes' | 'comments'>) => {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      likes: 0,
      dislikes: 0,
      comments: [],
    };
    setProjects([...projects, newProject]);
  };

  const supportRequest = (requestId: string) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, supports: req.supports + 1 } : req
      )
    );
    setCurrentUser({ ...currentUser, points: currentUser.points + 2 });
  };

  const likeProject = (projectId: string) => {
    setProjects(
      projects.map((proj) =>
        proj.id === projectId ? { ...proj, likes: proj.likes + 1 } : proj
      )
    );
    setCurrentUser({ ...currentUser, points: currentUser.points + 1 });
  };

  const dislikeProject = (projectId: string) => {
    setProjects(
      projects.map((proj) =>
        proj.id === projectId ? { ...proj, dislikes: proj.dislikes + 1 } : proj
      )
    );
  };

  const addComment = (type: 'request' | 'project', id: string, text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: currentUser.name,
      text,
      date: new Date().toISOString().split('T')[0],
    };
    if (type === 'request') {
      setRequests(
        requests.map((req) =>
          req.id === id ? { ...req, comments: [...req.comments, newComment] } : req
        )
      );
    } else {
      setProjects(
        projects.map((proj) =>
          proj.id === id ? { ...proj, comments: [...proj.comments, newComment] } : proj
        )
      );
    }
    setCurrentUser({ ...currentUser, points: currentUser.points + 3 });
  };

  const deleteRequest = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
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
        deleteProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ Export necesario para usar el contexto sin errores
export const useAppContext = () => useContext(AppContext);
