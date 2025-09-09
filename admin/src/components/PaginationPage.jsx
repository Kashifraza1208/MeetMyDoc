import Pagination from "@mui/material/Pagination";
const PaginationPage = ({ setPage, totalPage }) => {
  return (
    <Pagination
      onChange={(e, value) => setPage(value)}
      count={totalPage}
      color="primary"
      size="medium"
    />
  );
};

export default PaginationPage;
