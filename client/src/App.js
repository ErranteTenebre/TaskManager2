import {
  WelcomePage,
  AuthPage,
  RegisterPage,
  Dashboard,
  TasksPage,
  ProjectsPage,
  ProjectPage,
  WorkspaceSettings,
} from "Pages";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { Sidebar } from "Components/Sidebar";
import { Navbar } from "Components/Navbar";
import { AuthContext } from "Context/AuthContext";

import { SnackbarProvider } from "notistack";
import { useContext } from "react";

const projects = [
  {
    id: "1",
    name: "Проект1",
  },
  {
    id: "2",
    name: "Проект2",
  },
  {
    id: "3",
    name: "Проект3",
  },
];

function Layout() {
  const { isUserLogged } = useContext(AuthContext);
  return isUserLogged ? (
    <div className="page">
      <div className="main-page-container">
        <Sidebar projects={projects}></Sidebar>

        <div className="main-page-content">
          <Navbar></Navbar>
          <div className="content-inner">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="page">
      <Outlet></Outlet>
    </div>
  );
}

function App() {
  const { isUserLogged } = useContext(AuthContext);
  return (
    <>
      <SnackbarProvider />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout></Layout>}>
            {isUserLogged ? (
              <>
                <Route
                  path="/workspace/:id/dashboard"
                  element={<Dashboard />}
                />
                <Route path="/workspace/:id/tasks" element={<TasksPage />} />
                <Route
                  path="/workspace/:id/projects"
                  element={<ProjectsPage />}
                />
                <Route
                  path="/workspace/:id/projects/:id"
                  element={<ProjectPage />}
                />
                <Route
                  path="/workspace/:id/settings"
                  element={<WorkspaceSettings />}
                />
                <Route path="/random" element={<WorkspaceSettings />} />
              </>
            ) : (
              <>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </>
            )}
          </Route>
          <Route
            path="*"
            element={
              <Navigate to={isUserLogged ? `workspace/1/dashboard` : "auth"} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
