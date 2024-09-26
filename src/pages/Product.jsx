import {
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTable from "../components/CustomTable";
import QueryHeader from "../components/QueryHeader";
import {
  useGetAllProductsQuery,
  useConfirmDeleteMutation,
  useSearchProductsQuery,
} from "../services/api/productApi"; // Import here
import { useNavigate } from "react-router";
import deletBin from "../assets/Go Green Grey Hanger Bag.png";
import emptyProduct from "../assets/Spooky Stickers Sweet Franky.png";

function ProductPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectState, setSelectState] = useState(0);

  const { data: searchedProducts, isFetching: isSearching } =
    useSearchProductsQuery({ name: searchTerm, order: selectState });
  const [confirmDelete] = useConfirmDeleteMutation(); // Initialize the mutation

  const searchRef = useRef();
  const label = "Sort";

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    console.log(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      console.log(selectedProduct.productId);
      try {
        await confirmDelete(selectedProduct.productId).unwrap(); // Use the mutation here

        // Optionally refresh the product list or show a success message
      } catch (error) {
        console.error("Failed to delete the product: ", error);
        // Optionally show an error message to the user
      }
    }
    handleCloseDialog();
  };

  const productList = isSearching
    ? []
    : searchedProducts?.data?.map((item) => ({
        Name: item.name,
        Category: item.categoryId,
        quantity: item.quantity,
        Price: item.price,
        edit: (
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/product/new");
            }}
          />
        ),
        delete: (
          <DeleteIcon
            color="red"
            sx={{ cursor: "pointer" }}
            onClick={() => handleDeleteClick(item)}
          />
        ),
      }));

  const handleSearch = () => {
    setSearchTerm(searchRef.current.value);
  };

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
      {isSearching ? (
        <Typography>Loading products...</Typography>
      ) : productList && productList.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ textAlign: "center" }}
        >
          <img
            src={emptyProduct}
            alt="emptyProduct"
            style={{ width: "200px", height: "200px", marginBottom: "10px" }} // Adjust size as needed
          />
          <Typography variant="bmdr">No products found</Typography>
        </Box>
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
            <Typography variant="blgsm" padding={"10px"}>
              Delete Confirmation
            </Typography>
            <Typography variant="bxsr">
              Are you sure you want to delete this product? <br /> You won't be
              able to retrieve it back.
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
