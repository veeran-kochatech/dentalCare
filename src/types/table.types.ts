
export type HeaderProps = {
    title: string;
    key: string;
    sort: boolean;
    selectedColumn: boolean;
}

export type TableContextType = {
    tableColumnsState: HeaderProps[] | [];
    updateTableColumns: (data: HeaderProps[]) => void;
  };