import { UserPlus } from "lucide-react";
import styles from "./workspacePanel.module.scss";

import { useEffect, useState } from "react";
import { IoCheckmark, IoPeople, IoSettings } from "react-icons/io5";
import { getInitials } from "Utils/generalUtils";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedWorkspaceId } from "store/actions/workspaceActions"; // Путь к вашему действию
import { useLocation, useNavigate } from "react-router-dom";

const workspaceBaseUrl = "/workspace";

const workspaces = [
  {
    id: 0,
    name: "Мое рабочее пространство",
  },
  {
    id: 1,
    name: "Чисто прикольное пространство",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
  {
    id: 5,
    name: "5",
  },
];

const options = [
  {
    icon: (
      <IoSettings
        size={16}
        className={styles["workspacePanel__dropdown-option-icon"]}
      ></IoSettings>
    ),
    href: `${workspaceBaseUrl}/settings`,
    text: "Настройки",
  },
  {
    icon: (
      <IoPeople
        size={16}
        className={styles["workspacePanel__dropdown-option-icon"]}
      ></IoPeople>
    ),
    href: `${workspaceBaseUrl}/humans`,
    text: "Люди",
  },
  {
    icon: (
      <UserPlus
        size={16}
        className={styles["workspacePanel__dropdown-option-icon"]}
      ></UserPlus>
    ),
    href: `${workspaceBaseUrl}/invite`,
    text: "Пригласить",
  },
];

const WorkspacePanel = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedWorkspaceId = useSelector(
    (state) => state.workspace.selectedWorkspaceId
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles["workspacePanel"]}>
      <div className={styles["workspacePanel__container"]}>
        <button
          className={styles["workspacePanel__button"]}
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <WorkspacePanelItem
            workspaceId={selectedWorkspaceId}
            workspaceName={workspaces[selectedWorkspaceId].name}
            disabled
          ></WorkspacePanelItem>
        </button>

        <div
          className={`${styles["workspacePanel-dropdown"]} ${
            isDropdownOpen
              ? styles["workspacePanel__dropdown_open"]
              : styles["workspacePanel__dropdown_hidden"]
          }`}
        >
          <WorkspacePanelItem
            workspaceId={selectedWorkspaceId}
            workspaceName={workspaces[selectedWorkspaceId].name}
            disabled
          ></WorkspacePanelItem>

          <WorkspaceOptions>
            {options.map((option) => {
              return (
                <WorkspaceOption
                  icon={option.icon}
                  text={option.text}
                  href={option.href}
                ></WorkspaceOption>
              );
            })}
          </WorkspaceOptions>

          <div className={styles["workspacePanel__dropdown-workspace-list"]}>
            {workspaces.map((workspace) => {
              return workspace.id !== selectedWorkspaceId ? (
                <WorkspacePanelItem
                  workspaceId={workspace.id}
                  workspaceName={workspace.name}
                />
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkspacePanelItem = ({
  workspaceId,
  workspaceName,
  disabled = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleWorkspaceChange = (workspaceId) => {
    dispatch(setSelectedWorkspaceId(workspaceId));
    localStorage.setItem("selectedWorkspaceId", workspaceId.toString());

    let parts = location.pathname.split("/");

    // Заменяем значение в массиве
    parts[2] = workspaceId.toString();

    // Объединяем массив обратно в строку
    let replacedString = parts.join("/");

    navigate(replacedString);
  };

  return (
    <a
      href="##"
      onClick={(e) => {
        e.preventDefault();
        handleWorkspaceChange(workspaceId);
      }}
      className={`${styles["workspacePanel__workspace-link"]} ${
        styles["workspacePanel__dropdown-workspace"]
      } ${disabled ? styles["workspacePanel__workspace-link_disabled"] : ""}`}
    >
      <div className={styles["workspacePanel__workspace-icon-container"]}>
        <span className={styles["workspacePanel__workspace-icon-text"]}>
          {getInitials(workspaceName)}
        </span>
      </div>

      <div className={styles["workspacePanel__title-container"]}>
        <div className={styles["workspacePanel__is-workspace-text"]}>
          Рабочее пространство
        </div>
        <div className={styles["workspacePanel__workspace-title"]}>
          {workspaceName}
        </div>
      </div>
    </a>
  );
};

const WorkspaceOptions = ({ children }) => {
  return (
    <div className={styles["workspacePanel__dropdown-options"]}>{children}</div>
  );
};

const WorkspaceOption = ({ icon, text, href }) => {
  return (
    <a href={href} className={styles["workspacePanel__dropdown-option"]}>
      {icon}

      <span className={styles["workspacePanel__dropdown-option-text"]}>
        {text}
      </span>
    </a>
  );
};

export { WorkspacePanel };
