import { useState } from "react";
import CustomSelect from "../components/CustomSelect";

function CoursePage() {
  const [test, setTest] = useState(0);
  const label = "Sort";
  console.log(test);
  return (
    <>
      <h1>Course page</h1>
      <CustomSelect 
        label = {label}
        useSelectState={[test, setTest]}
        selectData={["Newest", "Oldest", "World"]}
      />
    </>
  );
}

export default CoursePage;
