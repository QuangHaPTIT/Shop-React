export interface PageProps {
  title: string;
  description?: string;
  isDefault?: boolean;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

