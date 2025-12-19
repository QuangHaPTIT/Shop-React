import React, { useMemo } from 'react';
import type { PaginationProps } from './Pagination.type';
import Button from './Button';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const Pagination: React.FC<PaginationProps> = ({
  page = 1,
  total = 0,
  maxVisibleButtons = 5,
  showNavButtons = true,
  showPageSize = false,
  showDescription = false,
  pageSizes = [10, 25, 50, 100],
  pageSize = 10,
  disabled = false,
  compact = false,
  onPageChange,
  onPageSizeChange,
  prevButton,
  nextButton,
  className,
}) => {
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / pageSize));
  }, [total, pageSize]);

  const visiblePageNumbers = useMemo(() => {
    const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);
    let startPage = Math.max(1, page - halfVisibleButtons);
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [page, maxVisibleButtons, totalPages]);

  const first = useMemo(() => {
    return (page ? (page - 1) * pageSize : 0) + 1;
  }, [page, pageSize]);

  const last = useMemo(() => {
    return Math.min(page * pageSize, total);
  }, [page, pageSize, total]);

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const showStartEllipsis = visiblePageNumbers[0] > 1;
  const showEndEllipsis =
    visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages;

  const goToPage = (newPage: number) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      newPage === page ||
      disabled
    ) {
      return;
    }
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const goToFirstPage = () => {
    if (!isFirstPage && !disabled) {
      goToPage(1);
    }
  };

  const goToLastPage = () => {
    if (!isLastPage && !disabled) {
      goToPage(totalPages);
    }
  };

  const goToPrevPage = () => {
    if (!isFirstPage && !disabled) {
      goToPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (!isLastPage && !disabled) {
      goToPage(page + 1);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (disabled) return;
    const newPageSize = Number(event.target.value);
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  // Compact layout
  if (compact) {
    return (
      <div className={`flex items-center justify-center gap-4 ${className || ''}`}>
        <Button
          variant="outline"
          disabled={isFirstPage || disabled}
          onClick={goToPrevPage}
          className="h-8 px-4 !min-w-0 !min-h-0 border-gray-300 font-medium disabled:text-[var(--secondary-text)] disabled:opacity-[0.6]"
        >
          {prevButton || (
            <>
              Previous <ChevronLeftIcon className="ml-1" />
            </>
          )}
        </Button>

        <div className="text-sm font-medium text-[var(--secondary-text)]">
          {page} / {totalPages} page
        </div>

        <Button
          variant="outline"
          disabled={isLastPage || disabled}
          onClick={goToNextPage}
          className="h-8 px-4 !min-w-0 !min-h-0 border-gray-300 font-medium disabled:text-[var(--secondary-text)] disabled:opacity-[0.6]"
        >
          {nextButton || (
            <>
              Next <ChevronRightIcon className="ml-1" />
            </>
          )}
        </Button>
      </div>
    );
  }

  // Regular layout
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-end md:justify-between gap-y-4 gap-x-2 ${className || ''}`}
    >
      {/* Left side: page size and description */}
      {(showPageSize || showDescription) && (
        <div className="hidden md:flex items-center gap-x-2">
          {/* Page size selector */}
          {showPageSize && (
            <div className="hidden md:flex md:flex-wrap items-center gap-x-2">
              <label htmlFor="page-size" className="text-sm text-gray-700">
                Page size:
              </label>
              <select
                id="page-size"
                className="rounded border border-gray-300 text-sm py-1 px-2"
                value={pageSize}
                onChange={handlePageSizeChange}
                disabled={disabled}
              >
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Description */}
          {showDescription && (
            <div className="hidden md:block text-sm text-gray-700">
              Showing {first} to {last} of {total} entries
            </div>
          )}
        </div>
      )}

      {/* Right side: pagination buttons */}
      <div className="flex flex-wrap items-center justify-end sm:justify-start gap-1">
        {showNavButtons && (
          <Button
            variant="outline"
            disabled={isFirstPage || disabled}
            onClick={goToFirstPage}
            className="h-8 !p-2 !min-w-0 !min-h-0"
          >
            First
          </Button>
        )}

        {showNavButtons && (
          <Button
            variant="outline"
            disabled={isFirstPage || disabled}
            onClick={goToPrevPage}
            className="w-8 h-8 !p-0 !min-w-0 !min-h-0"
          >
            {prevButton || <ChevronLeftIcon />}
          </Button>
        )}

        {showStartEllipsis && visiblePageNumbers.length <= 5 && (
          <>
            <Button
              variant="outline"
              disabled={disabled}
              onClick={() => goToPage(1)}
              className="w-8 h-8 !p-0 !min-w-0 !min-h-0"
            >
              1
            </Button>
            <span className="px-1 text-gray-500">...</span>
          </>
        )}

        {visiblePageNumbers.slice(0, 5).map((currentPage) => (
          <Button
            key={currentPage}
            variant={currentPage === page ? 'filled' : 'outline'}
            color="primary"
            disabled={currentPage === page || disabled}
            onClick={() => goToPage(currentPage)}
            className="w-8 h-8 !p-0 !min-w-0 !min-h-0"
          >
            {currentPage}
          </Button>
        ))}

        {showEndEllipsis && visiblePageNumbers.length <= 5 && (
          <>
            <span className="px-1 text-gray-500">...</span>
            <Button
              variant="outline"
              disabled={disabled}
              onClick={() => goToPage(totalPages)}
              className="w-8 h-8 !p-0 !min-w-0 !min-h-0"
            >
              {totalPages}
            </Button>
          </>
        )}

        {showNavButtons && (
          <Button
            variant="outline"
            disabled={isLastPage || disabled}
            onClick={goToNextPage}
            className="w-8 h-8 !p-0 !min-w-0 !min-h-0"
          >
            {nextButton || <ChevronRightIcon />}
          </Button>
        )}

        {showNavButtons && (
          <Button
            variant="outline"
            disabled={isLastPage || disabled}
            onClick={goToLastPage}
            className="h-8 !p-2 !min-w-0 !min-h-0"
          >
            Last
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;

