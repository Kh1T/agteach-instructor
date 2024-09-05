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
import ButtonComponent from "../CourseProductComponents/ButtonInBox";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";

import { useState , useEffect } from "react";

import { fakeProductData } from "../../data/searchBarData";
import AddedProduct from "../CourseProductComponents/AddedProduct";

const allProduct = fakeProductData
  /**
   * RelatedProduct component
   *
   * This component displays a list of suggested products that are relevant to
   * the course. It allows the user to search for products, add them to the
   * course, and remove them.
   *
   * The component also displays a list of products that have already been
   * added to the course.
   *
   * @returns A RelatedProduct component
   */
export default function RelatedProduct() {
  const [searchResults, setSearchResults] = useState([allProduct]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

    useEffect(() => {
      // Initially set all products
      setSearchResults(allProduct);
    }, []);
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
    const filteredResults = fakeProductData.filter((product) =>
      product.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleSearch = () => {
    const filteredResults = fakeProductData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
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
        <ButtonComponent
          text="SEARCH"
          variant="contained"
          height="56px"
          onClick={handleSearch}
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

      <Divider />

      <Typography component="ul" paddingY={2}>
        <Typography component="li">
          Please verify your course information before submitting
        </Typography>
        <Typography component="li">
          By clicking <strong>CREATE COURSE</strong> you ensure that all the
          provided course above information is following AgTeach Terms and
          Policy
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
