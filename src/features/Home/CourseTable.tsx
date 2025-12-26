import { useTranslation } from "react-i18next";
import type { Course } from "../../types/course";
import type { Column, SortState } from "../../components/elements/Table.type";
import { formatNumber } from "../../utils/number";
import { formatDate } from "../../utils/date";
import Button from "../../components/elements/Button";
import Table from "../../components/elements/Table";
import Card from "../../components/elements/Card";

interface CourseTableProps {
  data?: Course[];
  loading?: boolean;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void;
  onView?: (course: Course) => void;
  onPaginationChange?: (page: number, pageSize: number) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({
  data = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
  onPaginationChange,
}) => {
  const { t } = useTranslation();
  const columns: Column[] = [
    {
      key: "name",
      label: t("labels.course.fields.name"),
      sortable: true,
      width: "25%",
      ellipsis: true,
    },
    {
      key: "instructor",
      label: t("labels.course.fields.instructor"),
      sortable: true,
      width: "15%",
    },
    {
      key: "students",
      label: t("labels.course.fields.students"),
      sortable: true,
      align: "right",
      width: "12%",
      compute: (value) => value.toLocaleString("vi-VN"),
    },
    {
      key: "price",
      label: t("labels.course.fields.price"),
      sortable: true,
      align: "right",
      width: "15%",
      compute: formatNumber,
    },
    {
      key: "status",
      label: t("labels.course.fields.status"),
      sortable: true,
      align: "center",
      width: "15%",
    },
    {
      key: "createdAt",
      label: t("labels.course.fields.createdAt"),
      sortable: true,
      width: "12%",
      compute: formatDate,
    },
    {
      key: "actions",
      label: "Hành động",
      align: "center",
      width: "10%",
      sortable: false,
    },
  ];

  return (
    <Card className="w-full">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {t("labels.courses.title")}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t("labels.courses.description")}
          </p>
        </div>

        <Table
          columns={columns}
          data={data}
          loading={loading}
          outlined
          hoverable
          striped
          getRowKey={(row) => row.id}
          renderCell={(row, column, rowIndex) => {
            if (column.key === "actions") {
              return (
                <td key={column.key} className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    {onView && (
                      <Button
                        variant="text"
                        color="primary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onView(row);
                        }}
                      >
                        Xem
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="text"
                        color="primary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(row);
                        }}
                      >
                        Sửa
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="text"
                        color="danger"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(row);
                        }}
                      >
                        Xóa
                      </Button>
                    )}
                  </div>
                </td>
              );
            }

            return null;
          }}
          noDataText={t("labels.courses.no_data")}
        />
      </div>
    </Card>
  );
};
