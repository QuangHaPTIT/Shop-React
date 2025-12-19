import React from 'react';
import type { Column } from './Table.type';

interface TableCellProps {
  row: any;
  column: Column;
  rowIndex: number;
  colIndex: number;
  cellClass?: string[];
  columnStyle?: React.CSSProperties;
  mergeAttributes?: { colspan?: number; rowspan?: number } | null;
  onCellClick?: () => void;
  renderCell?: (row: any, column: Column, rowIndex: number) => React.ReactNode;
  children?: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({
  row,
  column,
  rowIndex,
  colIndex,
  cellClass = [],
  columnStyle = {},
  mergeAttributes,
  onCellClick,
  renderCell,
  children,
}) => {
  const cellValue = column.compute
    ? column.compute(row[column.key])
    : row[column.key];

  const cellTitle = column.ellipsis ? String(cellValue ?? '') : '';

  const colspan =
    mergeAttributes?.colspan ||
    column.colspan ||
    column.getColspan?.(row, column, rowIndex);

  const rowspan =
    mergeAttributes?.rowspan ||
    column.rowSpan ||
    column.getRowSpan?.(row, column, rowIndex);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCellClick) {
      onCellClick();
    }
  };

  // Handle onEmpty
  if (column.onEmpty === 'blank' && (!cellValue || cellValue === '')) {
    return (
      <td
        className={cellClass.join(' ')}
        style={columnStyle}
        onClick={handleClick}
        colSpan={colspan}
        rowSpan={rowspan}
      />
    );
  }

  return (
    <td
      className={cellClass.join(' ')}
      style={columnStyle}
      onClick={handleClick}
      colSpan={colspan}
      rowSpan={rowspan}
    >
      <div
        className={column.ellipsis ? 'cell-ellipsis' : ''}
        title={cellTitle}
      >
        {renderCell ? (
          renderCell(row, column, rowIndex)
        ) : children ? (
          children
        ) : (
          <span>{cellValue}</span>
        )}
      </div>
    </td>
  );
};

export default TableCell;

