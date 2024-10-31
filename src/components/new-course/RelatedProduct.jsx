import {
  Box,
  Divider,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ButtonComponent from "../course-product/ButtonInBox";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";
import AddedProduct from "../course-product/AddedProduct";
import { useGetInstructorProductQuery } from "../../services/api/courseApi";
import { useSelector } from "react-redux";
import PaginationComponent from "./Pagination";

export default function RelatedProduct({ courseData }) {
  const [searchResults, setSearchResults] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const ProductSuggestion = useSelector(
    (state) => state.course.courseData.product_suggestions
  );

  const [currentData, setCurrentData] = useState([]);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetInstructorProductQuery({ name: searchTerm });
  let products = data
    ? data.item.map((product) => ({
        src: product.imageUrl,
        title: product.name,
        price: product.price,
        id: product.productId,
      }))
    : [];

  // Populate the related products when editing a course
  useEffect(() => {
    if (ProductSuggestion) {
      const existingProducts = ProductSuggestion.map((suggestion) => ({
        src: suggestion.product.imageUrl,
        title: suggestion.product.name,
        price: suggestion.product.price,
        id: suggestion.product.productId,
      }));
      setAddedProducts(existingProducts);
    }
  }, [ProductSuggestion]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (product) => !addedProducts.some((p) => p.id === product.id)
      );
      setSearchResults(filteredProducts);
    }
  }, [products, addedProducts]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    setCurrentData(searchResults.slice(startIndex, endIndex));
  }, [searchResults, currentPage, cardsPerPage, setCardsPerPage]);

  const handleAddProduct = (product) => {
    if (addedProducts.some((p) => p.id === product.id)) {
      setError("This product is already added.");
      return;
    }
    setAddedProducts((prevProducts) => [...prevProducts, product]);
    setError(null);
  };

  const handleRemoveProduct = (productId) => {
    setAddedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredResults = products.filter((product) =>
      product.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    const availableResults = filteredResults.filter(
      (product) => !addedProducts.some((p) => p.id === product.id)
    );
    setSearchResults(availableResults);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <IconWithTitle
        title="Related Products"
        highlight="Optional"
        icon={<Inventory2OutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Suggest products for practical learning"
        description="Recommend products that are relevant to this course where students can buy for practical learning"
      />
      <Typography component="ul">
        <Typography component="li" color="dark.300" variant="bsr">
          NOTE: If you don't have any product available, you can add them later
        </Typography>
      </Typography>
      <Divider sx={{ my: 3 }} />

      <AddedProduct
        products={addedProducts}
        onRemoveProduct={handleRemoveProduct}
      />

      <Stack direction="row" gap={2}>
        <TextField
          sx={{ my: 2, minWidth: "300px" }}
          id="outlined-controlled"
          label="Search"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <ButtonComponent text="SEARCH" variant="contained" height="56px" />
      </Stack>

      <Stack mt={3} direction="column" gap={1}>
        {searchResults.length > 0 ? (
          <>
            <Stack mt={3} direction="row" gap={1} flexWrap="wrap">
              {currentData.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  src={product.src}
                  onAdd={() => handleAddProduct(product)}
                  canAdd
                />
              ))}
            </Stack>
            <PaginationComponent
              totalItems={searchResults.length}
              itemsPerPage={cardsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <Typography mb={2} px={2}>
            No products found
          </Typography>
        )}
      </Stack>

      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert
            onClose={() => setError(null)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
