import { Pagination, Stack } from "@mui/material";

export default function PaginationComponent({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        size="medium"
      />
    </Stack>
  );
}
