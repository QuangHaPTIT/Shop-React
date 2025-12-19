import React, { useState, useMemo, useCallback } from 'react';
import type { TableProps, Column, SortState } from './Table.type';
import Loading from './Loading';
import TableRow from './TableRow';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import ArrowsVerticalIcon from '../icons/ArrowsVerticalIcon';

const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  loading = false,
  bordered = false,
  outlined = false,
  striped = false,
  hoverable = false,
  rowClickable = true,
  size = 'middle',
  noHeader = false,
  maxHeight,
  theadClass = '',
  tfootClass = '',
  mergeCells = [],
  searchNoDataFlag = false,
  searchNoDataText,
  noDataText,
  sortState: controlledSortState,
  getRowKey,
  getRowClass,
  getCellClass,
  getHeaderClass,
  onRowClick,
  onRowDblClick,
  onCellClick,
  onHeaderClick,
  onSortChange,
  className,
  renderHeader,
  renderCell,
  renderNoData,
  renderSearchNoData,
  renderFooter,
  children,
}) => {
  const [internalSortState, setInternalSortState] = useState<SortState>({
    key: null,
    order: null,
  });

  const sortState = controlledSortState !== undefined ? controlledSortState : internalSortState;

  const shouldSkipCell = useCallback(
    (rowIndex: number, colIndex: number): boolean => {
      if (!mergeCells || mergeCells.length === 0) return false;

      for (const merge of mergeCells) {
        const { beginCell, endCell } = merge;
        const isInRowRange =
          rowIndex >= beginCell.row && rowIndex <= endCell.row;
        const isInColRange =
          colIndex >= beginCell.column && colIndex <= endCell.column;

        if (isInRowRange && isInColRange) {
          if (rowIndex !== beginCell.row || colIndex !== beginCell.column) {
            return true;
          }
        }
      }

      return false;
    },
    [mergeCells]
  );

  const getMergeAttributes = useCallback(
    (
      rowIndex: number,
      colIndex: number
    ): { colspan?: number; rowspan?: number } | null => {
      if (!mergeCells || mergeCells.length === 0) return null;

      for (const merge of mergeCells) {
        const { beginCell, endCell } = merge;

        if (rowIndex === beginCell.row && colIndex === beginCell.column) {
          const colspan = endCell.column - beginCell.column + 1;
          const rowspan = endCell.row - beginCell.row + 1;

          return {
            colspan: colspan > 1 ? colspan : undefined,
            rowspan: rowspan > 1 ? rowspan : undefined,
          };
        }
      }

      return null;
    },
    [mergeCells]
  );

  const getColumnStyle = useCallback((column: Column): React.CSSProperties => {
    const style: React.CSSProperties = {};
    if (column.ellipsis) {
      style.maxWidth = '16rem';
    }
    if (column.width) {
      style.width =
        typeof column.width === 'number' ? `${column.width}px` : column.width;
    }
    if (column.minWidth) {
      style.minWidth =
        typeof column.minWidth === 'number'
          ? `${column.minWidth}px`
          : column.minWidth;
    }
    if (column.maxWidth) {
      style.maxWidth =
        typeof column.maxWidth === 'number'
          ? `${column.maxWidth}px`
          : column.maxWidth;
    }
    return style;
  }, []);

  const getColumnAlignClass = useCallback((column: Column): string => {
    if (column.align === 'center') return 'text-center';
    if (column.align === 'right') return 'text-right';
    return 'text-left';
  }, []);

  const getSizeClasses = useCallback(() => {
    switch (size) {
      case 'small':
        return {
          cell: 'px-2 py-1 text-xs',
          header: 'px-2 py-1 text-xs',
        };
      case 'large':
        return {
          cell: 'px-6 py-3 text-base',
          header: 'px-6 py-3 text-base',
        };
      case 'middle':
      default:
        return {
          cell: 'px-4 py-2 text-sm',
          header: 'px-4 py-2 text-sm',
        };
    }
  }, [size]);

  const computeRowClass = useCallback(
    (row: any, index: number): string[] => {
      const baseClasses: string[] = [];

      if (striped && index % 2 !== 0) {
        baseClasses.push('bg-gray-50');
      }

      if (hoverable) {
        baseClasses.push('hover:bg-gray-100');
      }

      if (rowClickable !== false) {
        baseClasses.push('cursor-pointer');
      }

      if (getRowClass) {
        const customClass = getRowClass(row, index);
        if (customClass) {
          if (Array.isArray(customClass)) {
            baseClasses.push(...customClass);
          } else {
            baseClasses.push(customClass);
          }
        }
      }

      return baseClasses;
    },
    [striped, hoverable, rowClickable, getRowClass]
  );

  const computeCellClass = useCallback(
    (row: any, column: Column, index: number): string[] => {
      const sizeClasses = getSizeClasses();
      const baseClasses: string[] = [
        sizeClasses.cell,
        'overflow-hidden',
        getColumnAlignClass(column),
        'whitespace-nowrap',
      ];

      const isLastRow = index === (data?.length ?? 0) - 1;
      const isOutlined = outlined === true;

      if (bordered === 'horizontal' || bordered === 'all') {
        if (!(isOutlined && isLastRow)) {
          baseClasses.push('border-b border-gray-200');
        }
      }

      if (
        (bordered === 'vertical' || bordered === 'all') &&
        column.key !== columns[columns.length - 1].key
      ) {
        baseClasses.push('border-r border-gray-200');
      }

      if (bordered === 'all') {
        if (isOutlined && isLastRow) {
          baseClasses.push('border-x border-t border-gray-200');
        } else {
          baseClasses.push('border border-gray-200');
        }
      }

      if (getCellClass) {
        const customClass = getCellClass(row, column, index);
        if (customClass) {
          if (Array.isArray(customClass)) {
            baseClasses.push(...customClass);
          } else {
            baseClasses.push(customClass);
          }
        }
      }

      return baseClasses;
    },
    [
      bordered,
      outlined,
      data,
      columns,
      getSizeClasses,
      getColumnAlignClass,
      getCellClass,
    ]
  );

  const computeHeaderClass = useCallback(
    (column: Column, index: number): string[] => {
      const sizeClasses = getSizeClasses();
      const baseClasses: string[] = [
        sizeClasses.header,
        'font-medium text-info whitespace-nowrap',
        getColumnAlignClass(column),
      ];

      if (bordered === 'horizontal' || bordered === 'all') {
        baseClasses.push('border-b border-gray-200');
      }

      if (
        (bordered === 'vertical' || bordered === 'all') &&
        column.key !== columns[columns.length - 1].key
      ) {
        baseClasses.push('border-r border-gray-200');
      }

      if (bordered === 'all') {
        baseClasses.push('border border-gray-200');
      }

      if (getHeaderClass) {
        const customClass = getHeaderClass(column, index);
        if (customClass) {
          if (Array.isArray(customClass)) {
            baseClasses.push(...customClass);
          } else {
            baseClasses.push(customClass);
          }
        }
      }

      if (column.sortable) {
        baseClasses.push('cursor-pointer select-none');
      }

      if (sortState.key === column.key) {
        if (sortState.order === 'asc') {
          baseClasses.push('sorted-asc');
        }
        if (sortState.order === 'desc') {
          baseClasses.push('sorted-desc');
        }
      }

      return baseClasses;
    },
    [bordered, columns, getSizeClasses, getColumnAlignClass, getHeaderClass, sortState]
  );

  const handleRowClick = useCallback(
    (row: any, index: number) => {
      if (onRowClick) {
        onRowClick({ row, index });
      }
    },
    [onRowClick]
  );

  const handleRowDblClick = useCallback(
    (row: any, index: number) => {
      if (onRowDblClick) {
        onRowDblClick({ row, index });
      }
    },
    [onRowDblClick]
  );

  const handleCellClick = useCallback(
    (row: any, column: Column, index: number) => {
      if (onCellClick) {
        onCellClick({ row, column, index });
      }
    },
    [onCellClick]
  );

  const handleHeaderClick = useCallback(
    (column: Column, index: number) => {
      if (!column.sortable) {
        if (onHeaderClick) {
          onHeaderClick({ column, index });
        }
        return;
      }

      let newOrder: 'asc' | 'desc' | null = null;
      if (sortState.key !== column.key) {
        newOrder = 'asc';
      } else if (sortState.order === 'asc') {
        newOrder = 'desc';
      } else if (sortState.order === 'desc') {
        newOrder = null;
      }

      const newSortState: SortState = {
        key: newOrder ? column.key : null,
        order: newOrder,
      };

      if (controlledSortState === undefined) {
        setInternalSortState(newSortState);
      }

      if (onSortChange) {
        onSortChange(newSortState);
      }
    },
    [sortState, controlledSortState, onHeaderClick, onSortChange]
  );

  const containerStyle = useMemo(() => {
    if (maxHeight) {
      return {
        maxHeight:
          typeof maxHeight === 'number' ? `${maxHeight}px` : String(maxHeight),
        overflowY: 'auto' as const,
      };
    }
    return {};
  }, [maxHeight]);

  const hasData = data && data.length > 0;

  return (
    <div
      className={`w-full relative overflow-x-auto table-container h-full ${
        outlined ? 'border border-gray-200 rounded overflow-hidden' : ''
      } ${className || ''}`}
      style={containerStyle}
    >
      <table
        className={`w-full h-full table-auto border-collapse ${
          bordered === 'all' && !outlined ? 'border border-gray-200 rounded-sm' : ''
        }`}
      >
        {!noHeader && (
          <thead className={theadClass}>
            {renderHeader ? (
              <tr>
                {columns.map((column, index) => {
                  if (shouldSkipCell(0, index)) return null;
                  return (
                    <th
                      key={column.key}
                      className={computeHeaderClass(column, index).join(' ')}
                      style={getColumnStyle(column)}
                      colSpan={getMergeAttributes(0, index)?.colspan}
                      rowSpan={getMergeAttributes(0, index)?.rowspan}
                      onClick={() => handleHeaderClick(column, index)}
                    >
                      {renderHeader(column, index)}
                    </th>
                  );
                })}
              </tr>
            ) : (
              <tr>
                {columns.map((column, index) => {
                  if (shouldSkipCell(0, index)) return null;
                  return (
                    <th
                      key={column.key}
                      className={computeHeaderClass(column, index).join(' ')}
                      style={getColumnStyle(column)}
                      colSpan={getMergeAttributes(0, index)?.colspan}
                      rowSpan={getMergeAttributes(0, index)?.rowspan}
                      onClick={() => handleHeaderClick(column, index)}
                    >
                      <span>{column.label}</span>
                      {column.sortable && (
                        <span className="ml-1">
                          {sortState.key === column.key && sortState.order === 'asc' && (
                            <ArrowUpIcon className="inline" />
                          )}
                          {sortState.key === column.key && sortState.order === 'desc' && (
                            <ArrowDownIcon className="inline" />
                          )}
                          {!(sortState.key === column.key && sortState.order) && (
                            <ArrowsVerticalIcon className="inline opacity-25" />
                          )}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            )}
          </thead>
        )}

        <tbody>
          {hasData ? (
            data.map((row, index) => {
              const rowKey = getRowKey ? getRowKey(row, index) : index;
              return (
                <TableRow
                  key={rowKey}
                  row={row}
                  rowIndex={index}
                  columns={columns}
                  rowClass={computeRowClass(row, index)}
                  onRowClick={() => handleRowClick(row, index)}
                  onRowDblClick={() => handleRowDblClick(row, index)}
                  getCellClass={computeCellClass}
                  getColumnStyle={getColumnStyle}
                  getMergeAttributes={getMergeAttributes}
                  handleCellClick={handleCellClick}
                  renderCell={renderCell}
                >
                  {children}
                </TableRow>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className={`${getSizeClasses().cell} py-8 text-center text-gray-500`}
              >
                {searchNoDataFlag
                  ? renderSearchNoData
                    ? renderSearchNoData()
                    : searchNoDataText || 'No search results'
                  : renderNoData
                  ? renderNoData()
                  : noDataText || 'No data'}
              </td>
            </tr>
          )}
        </tbody>

        {renderFooter && (
          <tfoot className={tfootClass}>
            <tr>
              <td colSpan={columns.length}>{renderFooter()}</td>
            </tr>
          </tfoot>
        )}
      </table>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/60">
          <div className="flex flex-col items-center justify-center">
            <Loading isLoading={loading} size="large" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;

