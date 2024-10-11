import {
  Box,
  Divider,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import ProductCard from "./ProductCard";
import ButtonComponent from "../course-product/ButtonInBox";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";

import { useState, useEffect } from "react";
import { useGetInstructoreProductQuery } from "../../services/api/courseApi";
import AddedProduct from "../course-product/AddedProduct";

export default function RelatedProduct() {
  const [searchResults, setSearchResults] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const { data } = useGetInstructoreProductQuery({ name: searchTerm });

  let products = [];
  if (data) {
    products = data.item.map((product) => ({
      src: product.imageUrl,
      title: product.name,
      price: product.price,
      id: product.productId,
    }));
  }


  // Set initial search results to all products
  useEffect(() => {
    if (products.length > 0) {
      // Filter out added products from the search results
      const filteredProducts = products.filter(
        (product) => !addedProducts.some((p) => p.id === product.id)
      );
      setSearchResults(filteredProducts);
    }
  }, [products, addedProducts]);

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
    // Filter products based on search term
    const filteredResults = products.filter((product) =>
      product.title.toLowerCase().includes(event.target.value.toLowerCase())
    );

    // Also filter out already added products
    const availableResults = filteredResults.filter(
      (product) => !addedProducts.some((p) => p.id === product.id)
    );

    setSearchResults(availableResults);
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

      <Divider sx={{ my: 3 }} />

      {/* Added Products Display */}
      <AddedProduct
        products={addedProducts}
        onRemoveProduct={handleRemoveProduct}
      />

      {/* Added Products Section */}
      <Stack direction="row" gap={2}>
        <TextField
          sx={{ my: 2, minWidth: "300px" }}
          id="outlined-controlled"
          label="Search"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <ButtonComponent
          text="SEARCH"
          variant="contained"
          height="56px"
          // No need for a separate search button; filtering happens on input change.
        />
      </Stack>

      <Stack mt={4} direction="row" gap={1} flexWrap="wrap">
        {searchResults.map((product) => (
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

      <Typography component="ul" paddingY={2}>
        <Typography variant="bsr" color="dark.300" paddingY={1} component="li">
          Please verify your course information before submitting.
        </Typography>
        <Typography variant="bsr" color="dark.300" component="li">
          By clicking <strong>CREATE COURSE</strong> you ensure that all the
          provided course above information is following AgTeach Terms and
          Policy.
        </Typography>
      </Typography>

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
