import { useContext, createContext, useState } from "react";
import { MoreVertical, ChevronLast, ChevronFirst, Folder } from "lucide-react";
import { MdAssignment, MdDashboard } from "react-icons/md";

import styles from "./sidebar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { IoSettings } from "react-icons/io5";

import { useSelector } from "react-redux";
import { Logo } from "Components/Logo";
import { DataContext } from "Context/DataContext";
import { WorkspaceContext } from "Context/WorkspaceContext";

const SidebarContext = createContext();

export function Sidebar({ projects }) {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const location = useLocation();

  const { selectedWorkspace } = useContext(WorkspaceContext);

  return (
    <aside
      className={`${styles.wrapper} ${
        expanded ? styles.expanded : styles.minimized
      }`}
    >
      <nav className={styles.nav}>
        <div className={styles.top}>
          {/* <img
            src=""
            className={`${styles.logo} ${
              expanded ? styles.expanded : styles.hidden
            }`}
            alt="Логотип"
          /> */}
          <Logo
            className={`${styles.logo} ${
              expanded ? styles.expanded : styles.hidden
            }`}
          ></Logo>
          <button
            onClick={() => setExpanded(!expanded)}
            className={styles.toggleButton}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className={styles.items}>
            {location.pathname.startsWith("/workspace/settings")
              ? SidebarDataWorkspace.map((sidebarItem, i) => (
                  <SidebarItem
                    key={i}
                    icon={sidebarItem.icon}
                    text={sidebarItem.text}
                    href={sidebarItem.href}
                  ></SidebarItem>
                ))
              : selectedWorkspace
              ? SidebarDataTasks.map((sidebarItem, i) => (
                  <SidebarItem
                    key={i}
                    icon={sidebarItem.icon}
                    text={sidebarItem.text}
                    href={`/workspace/${selectedWorkspace.id}${sidebarItem.href}`}
                  ></SidebarItem>
                ))
              : ""}
            <div
              className={`${styles.projectsToggleButton} ${styles.sidebarContainer}`}
            >
              {" "}
              Проекты
            </div>
            <ul className={styles.items}>
              {projects.map((project) => (
                <SidebarItem
                  icon={<Folder />}
                  key={project.id}
                  text={project.name}
                  href={`/projects/${project.id}`}
                />
              ))}
            </ul>
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, href }) {
  const location = useLocation();
  const { expanded, activeItem, setActiveItem } = useContext(SidebarContext);
  return (
    <Link
      to={href}
      className={`${styles.item} ${styles.sidebarContainer} ${
        expanded ? styles.expanded : styles.hidden
      } ${location.pathname === href ? styles.active : ""}`}
    >
      {icon}
      <span>{text}</span>

      {!expanded && <div className={styles.label}>{text}</div>}
    </Link>
  );
}

const SidebarDataTasks = [
  {
    icon: <MdDashboard size={20}></MdDashboard>,
    text: "Дашборд",
    href: "/dashboard",
  },
  {
    icon: <MdAssignment size={20}></MdAssignment>,
    text: "Все задачи",
    href: "/tasks",
  },
  {
    icon: <Folder size={20}></Folder>,
    text: "Все проекты",
    href: "/projects",
  },
];

const SidebarDataWorkspace = [
  {
    icon: <IoSettings size={20}></IoSettings>,
    text: "Настройки",
    href: "/workspace/settings",
  },
];
