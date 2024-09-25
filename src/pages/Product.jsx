import {
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTable from "../components/CustomTable";
import QueryHeader from "../components/QueryHeader";
import { useGetAllProductsQuery } from "../services/api/productApi";
import { useConfirmDeleteMutation } from "../services/api/productApi";
import { useNavigate } from "react-router";
import deletBin from "../assets/Go Green Grey Hanger Bag.png";

function ProductPage() {
  const navigate = useNavigate();
  const [selectState, setSelectState] = useState(0);
  const { data: allProduct, isFetching } = useGetAllProductsQuery();

  const searchRef = useRef();
  const label = "Sort";

  console.log(allProduct);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleConfirmDelete = () => {
    handleCloseDialog();
  };

  const productList = isFetching
    ? []
    : allProduct?.data?.map((item) => ({
        Name: item.name,
        Category: item.categoryId,
        quantity: item.quantity,
        Price: item.price,
        edit: (
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              console.log(item.name);
              navigate("/product/new");
            }}
          />
        ),
        delete: (
          <DeleteIcon
            color="red"
            sx={{ cursor: "pointer" }}
            onClick={() => handleDeleteClick(item.name)}
          />
        ),
      }));

  function handleSearch() {}
  return (
    <Stack gap="30px" sx={{ width: "100%" }}>
      <QueryHeader
        label={label}
        searchRef={searchRef}
        useSelectState={[selectState, setSelectState]}
        isCreateNew={true}
        selectData={["Newest", "Oldest"]}
        handleSearch={handleSearch}
        pathCreated="/product/new"
        labelCreate="Create Product"
      />
      {isFetching ? (
        <p>Loading products...</p>
      ) : (
        <CustomTable data={productList} rowLimit={10} isPagination={true} />
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ textAlign: "center" }}
          >
            <img
              src={deletBin}
              alt="Confirmation"
              style={{ width: "136px", height: "136px", marginBottom: "10px" }} // Adjust size as needed
            />
            <Typography variant="blgsm" padding={"10px"}>Delete Confirmation</Typography>
            <Typography variant="bxsr">
              Are you sure you want to delete this product? <br /> You wont be able to
              retrieve it back.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: "16px" }}>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{ bgcolor: "red.main", marginRight: 1 }}
          >
            Delete
          </Button>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default ProductPage;
