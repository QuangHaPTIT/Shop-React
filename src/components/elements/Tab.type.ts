export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TabProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  renderLabel?: (tab: TabItem, activeTab: string) => React.ReactNode;
  renderContent?: (activeTab: string) => React.ReactNode;
  children?: React.ReactNode;
}

