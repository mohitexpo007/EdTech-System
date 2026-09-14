import { useParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import { useEffect, useState } from "react";
import { apiConnector } from "../services/apiconnector";
import {catalogData, categories} from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";

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
    <div className="min-h-screen bg-richblack-900 text-richblack-5">

      <div className="bg-richblack-800 px-6 py-10 sm:px-10 lg:px-0">
        <div className="mx-auto flex w-11/12 max-w-[1600px] flex-col gap-5 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-richblack-300">{`Home / Catalog / `}<span className="font-semibold text-yellow-50">{catalogPageData?.data?.selectedCategory?.name}</span></p>
            <p className="text-3xl font-bold text-richblack-5 sm:text-4xl">{catalogPageData?.data?.selectedCategory?.name}</p>
            <p className="max-w-[850px] text-sm leading-6 text-richblack-300 sm:text-base">{catalogPageData?.data?.selectedCategory?.description}</p>
          </div>
          <div className="min-w-[180px]">
            <p className="mb-4 text-lg font-semibold text-richblack-5">Related resources</p>
            <ul className="flex flex-col gap-3 text-sm text-richblack-300">
              <li className="list-disc ml-4">Doc {catalogPageData?.data?.selectedCategory?.name}</li>
              <li className="list-disc ml-4">Cheatsheets</li>
              <li className="list-disc ml-4">Articles</li>
              <li className="list-disc ml-4">Community Forums</li>
              <li className="list-disc ml-4">Projects</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-11/12 max-w-[1600px] flex-col gap-14 py-14">

        {/*section 1 */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <div className="text-3xl font-bold text-richblack-5 sm:text-4xl">Courses to get you started</div>
            <div className="flex gap-x-6 border-b border-richblack-700">
              <p className="border-b-2 border-yellow-50 pb-4 text-sm font-semibold text-yellow-50">Most Popular</p>
              <p className="pb-4 text-sm font-semibold text-richblack-300">New</p>
              <p className="pb-4 text-sm font-semibold text-richblack-300">Trending</p>
            </div>
          </div>
          {/* courseslider */}
          <div className="w-full overflow-hidden">
            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course}/> 
          </div>
        </div>


        {/*section 2 */}
        <div className="flex flex-col gap-6">
          <p className="text-3xl font-bold text-richblack-5 sm:text-4xl">Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
          <div className="w-full overflow-hidden">
            <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course}/>
          </div>
        </div>

        {/* section 3 */}
        <div className="flex flex-col gap-6">
          <p className="text-3xl font-bold text-richblack-5 sm:text-4xl">Frequently Bought</p>
          <div className="py-2">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">

                {
                  catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                  .map((course,index)=>(
                    <Course_Card course={course} key={index} height={"h-[400px]"}/>
                  ))
                }

            </div>
          </div>
        </div>

      </div>

    <Footer/>
    </div>
  )
}

export default Catalog;