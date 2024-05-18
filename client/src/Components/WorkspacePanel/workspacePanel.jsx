import { UserPlus } from "lucide-react";
import styles from "./workspacePanel.module.scss";

import { useContext, useEffect, useRef, useState } from "react";
import { IoPeople, IoSettings } from "react-icons/io5";
import { getInitials } from "Utils/generalUtils";

import { useLocation, useNavigate } from "react-router-dom";
import { WorkspaceContext } from "Context/WorkspaceContext";
import { WorkspaceInvitePeople } from "Components/WorkspaceComponents/WorkspaceInvitePeople/WorkspaceInvitePeople";

const workspaceBaseUrl = "/workspace";

const WorkspacePanel = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const panelRef = useRef();

  const { workspaces, selectedWorkspace, selectWorkspace, userRoleId } =
    useContext(WorkspaceContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    const handleClick = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleClick);
    };
  }, []);

  const handleInviteClick = () => {
    setIsInviteModalOpen(true);
  };

  return (
    <div className={styles["workspacePanel"]} ref={panelRef}>
      <div className={styles["workspacePanel__container"]}>
        <button
          className={styles["workspacePanel__button"]}
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          {workspaces ? (
            <WorkspacePanelItem
              workspaceId={selectedWorkspace}
              workspaceName={selectedWorkspace.title}
              disabled
            ></WorkspacePanelItem>
          ) : (
            ""
          )}
        </button>

        <div
          className={`${styles["workspacePanel-dropdown"]} ${
            isDropdownOpen
              ? styles["workspacePanel__dropdown_open"]
              : styles["workspacePanel__dropdown_hidden"]
          }`}
        >
          {workspaces ? (
            <WorkspacePanelItem
              workspaceId={selectedWorkspace}
              workspaceName={selectedWorkspace.title}
              disabled
            ></WorkspacePanelItem>
          ) : (
            ""
          )}

          <WorkspaceOptions>
            <WorkspaceOption
              icon={
                <IoSettings
                  size={16}
                  className={styles["workspacePanel__dropdown-option-icon"]}
                />
              }
              text="Настройки"
              href={`${workspaceBaseUrl}/${selectedWorkspace?.id}/settings`}
              setIsDropdownOpen={setIsDropdownOpen}
            />
            <WorkspaceOption
              icon={
                <IoPeople
                  size={16}
                  className={styles["workspacePanel__dropdown-option-icon"]}
                />
              }
              text="Люди"
              href={`${workspaceBaseUrl}/${selectedWorkspace?.id}/humans`}
              setIsDropdownOpen={setIsDropdownOpen}
            />
            {userRoleId === 2 && ( //Проверка, что админ
              <WorkspaceOption
                icon={
                  <UserPlus
                    size={16}
                    className={styles["workspacePanel__dropdown-option-icon"]}
                  />
                }
                text="Пригласить"
                onClick={handleInviteClick}
                setIsDropdownOpen={setIsDropdownOpen}
              />
            )}
          </WorkspaceOptions>

          <div className={styles["workspacePanel__dropdown-workspace-list"]}>
            {workspaces
              ? workspaces.map((workspace) => {
                  return workspace.id !== selectedWorkspace.id ? (
                    <WorkspacePanelItem
                      key={workspace.id}
                      workspaceId={workspace.id}
                      workspaceName={workspace.title}
                      onClick={() => selectWorkspace(workspace.id)}
                    />
                  ) : (
                    ""
                  );
                })
              : ""}
          </div>
        </div>
      </div>

      <WorkspaceInvitePeople
        open={isInviteModalOpen}
        setOpen={setIsInviteModalOpen}
      />
    </div>
  );
};

const WorkspacePanelItem = ({
  workspaceId,
  workspaceName,
  disabled = false,
  onClick,
}) => {
  return (
    <a
      href="##"
      onClick={(e) => {
        e.preventDefault();
        onClick();
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

const WorkspaceOption = ({ icon, text, href, onClick, setIsDropdownOpen }) => {
  return (
    <a
      href={href}
      className={styles["workspacePanel__dropdown-option"]}
      onClick={(e) => {
        e.preventDefault();
        setIsDropdownOpen(false);
        onClick();
      }}
    >
      {icon}

      <span className={styles["workspacePanel__dropdown-option-text"]}>
        {text}
      </span>
    </a>
  );
};

export { WorkspacePanel };
