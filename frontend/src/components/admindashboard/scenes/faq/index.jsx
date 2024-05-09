import { Box } from "@mui/material";
import { Header, AccordionItem } from "src/components/admindashboard/";
import { mockAccordionData } from "src/components/admindashboard/data/mockData";

//define FAQ  component
const FAQ = () => {

  //render compoennt
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
      {mockAccordionData.map((accordion, index) => (
        <AccordionItem key={index} {...accordion} />
      ))}
    </Box>
  );
};

export default FAQ;
