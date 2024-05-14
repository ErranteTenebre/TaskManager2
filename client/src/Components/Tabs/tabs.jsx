import styles from "./tabs.module.scss";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Tabs({ tabs, setSelected, children }) {
  return (
    <div className={styles.wrapper}>
      <Tab.Group>
        <Tab.List className={styles.list}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) => {
                return `${styles.tab} ${
                  selected ? styles.selected : styles.unselected
                }`;
              }}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className={styles.panels}>{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}
