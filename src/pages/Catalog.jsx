import { useParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import { useEffect, useState } from "react";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import CategoryFeature from "../components/core/Catalog/CategoryFeature/CategoryFeature";

const Catalog=()=>{

  const {catalogName}=useParams();
  const [catalogPageData,setCatalogPageData]=useState(null);
  const [categoryId,setCategoryId]=useState("");

  //fetch all categories
  useEffect(()=>{
    const getCategories=async()=>{
      try{
        console.log("Catalog component rendered");
        console.log("Catalog name from URL:",catalogName);
        console.log("Calling categories API");

        const res=await apiConnector("GET",categories.CATEGORIES_API);

        console.log("Categories API response:",res);

        //space ke basis pr split krdo then highphen - ke basis pr join krlo
        //so hmne filter ka use krke har category ko convert krdia array se
        const category_id=res?.data?.data?.find(
          (ct)=>ct.name
            .trim()
            .split(" ")
            .join("-")
            .toLowerCase() === catalogName?.trim().toLowerCase()
        )?._id;

        console.log("Matched category ID:",category_id);

        setCategoryId(category_id || "");
      }
      catch(error){
        console.log("Categories API ERROR:",error);
      }
    }

    getCategories();
  },[catalogName])

  useEffect(()=>{
    const getCategoryDetails=async()=>{
      try{
        console.log("Category ID before details API:",categoryId);

        if(!categoryId) return;

        const res=await getCatalogPageData(categoryId);
        console.log("Printing res",res)
        setCatalogPageData(res);
      }
      catch(error){
        console.log("Category details API ERROR:",error)
      }
    }

    getCategoryDetails()
  },[categoryId])


  return(
    <div className="min-h-screen bg-black text-richblack-5">
      <CategoryFeature catalogPageData={catalogPageData} />

    <Footer/>
    </div>
  )
}

export default Catalog;
