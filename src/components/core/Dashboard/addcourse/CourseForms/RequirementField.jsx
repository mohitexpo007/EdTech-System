import { useEffect, useState } from "react";


const RequirementField=({name,label,register,errors,setValue,getValue})=>{
  const [requirement,setRequirement]=useState("");
  const [requirementList,setRequirementList]=useState([]);

  const handleAddRequirements=()=>{
    if(requirement){
      setRequirementList([...requirementList,requirement]);
      setRequirement("");
    }
  }

  useEffect(()=>{
    register(name,{
      required:true,
      validate:(value)=>value.length>0
    })
  },[name, register])

  useEffect(()=>{
    setValue(name,requirementList);
  },[name, setValue])

  const handleRemoveRequirement=(index)=>{
    const updatedRequirementList=[...requirementList];
    updatedRequirementList.splice(index,1);
    setRequirementList(updatedRequirementList);
  }


  return(
    <div className="space-y-2">

      <label htmlFor="name" className="text-sm text-richblack-5">{label}<sup className="text-pink-200">*</sup></label>
      <div className="flex flex-col gap-2">
        <input
          type='text'
          id={name}
          value={requirement}
          onChange={(e)=>setRequirement(e.target.value)}
          className="w-full rounded-md border border-richblack-600 bg-richblack-700 p-3 text-richblack-5 outline-none"
        />
        <button
        type="button"
        onClick={handleAddRequirements}
        className="w-fit font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {
        requirementList.length > 0 && (
          <ul className="space-y-2">
            {
              requirementList.map((requirement,index)=>(
                <li key={index} className="flex items-center justify-between rounded-md bg-richblack-700 px-3 py-2 text-sm text-richblack-200">
                  <span>{requirement}</span>
                  <button
                  type="button"
                  onClick={()=>handleRemoveRequirement(index)}
                  className="text-xs text-pure-greys-300"
                  >
                    clear
                  </button>
                </li>
              ))
            }
          </ul>
        )
      }
      {
        errors[name] && (
          <span className="text-xs text-pink-200">
            {label} is required
          </span>
        )
      }

    </div>
  )
}

export default RequirementField