import React from 'react';
import type { Column } from './Table.type';
import TableCell from './TableCell';

interface TableRowProps {
  row: any;
  rowIndex: number;
  columns: Column[];
  rowClass?: string[];
  onRowClick?: () => void;
  onRowDblClick?: () => void;
  getCellClass?: (row: any, column: Column, index: number) => string[];
  getColumnStyle?: (column: Column) => React.CSSProperties;
  getMergeAttributes?: (
    rowIndex: number,
    colIndex: number
  ) => { colspan?: number; rowspan?: number } | null;
  handleCellClick?: (row: any, column: Column, index: number) => void;
  renderCell?: (row: any, column: Column, rowIndex: number) => React.ReactNode;
  children?: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({
  row,
  rowIndex,
  columns,
  rowClass = [],
  onRowClick,
  onRowDblClick,
  getCellClass,
  getColumnStyle,
  getMergeAttributes,
  handleCellClick,
  renderCell,
  children,
}) => {
  return (
    <tr
      onClick={onRowClick}
      onDoubleClick={onRowDblClick}
      className={rowClass.join(' ')}
    >
      {columns.map((column, colIndex) => {
        const cellClass = getCellClass
          ? getCellClass(row, column, rowIndex)
          : [];
        const columnStyle = getColumnStyle ? getColumnStyle(column) : {};
        const mergeAttributes = getMergeAttributes
          ? getMergeAttributes(rowIndex + 1, colIndex)
          : null;

        // Find matching child for this column
        let cellContent: React.ReactNode = null;
        if (children) {
          React.Children.forEach(children, (child) => {
            if (React.isValidElement(child)) {
              const childName = (child.props as any)?.name;
              // Match by column key or column key + rowIndex
              if (
                childName === column.key ||
                childName === `${column.key}_${rowIndex}`
              ) {
                cellContent = React.cloneElement(child, {
                  row,
                  value: row[column.key],
                  index: rowIndex,
                  column,
                } as any);
              }
            }
          });
        }

        return (
          <TableCell
            key={`${rowIndex}-${column.key}`}
            row={row}
            column={column}
            rowIndex={rowIndex}
            colIndex={colIndex}
            cellClass={cellClass}
            columnStyle={columnStyle}
            mergeAttributes={mergeAttributes}
            onCellClick={() =>
              handleCellClick && handleCellClick(row, column, rowIndex)
            }
            renderCell={renderCell}
          >
            {cellContent}
          </TableCell>
        );
      })}
    </tr>
  );
};

export default TableRow;

