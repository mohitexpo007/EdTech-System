{/* temporary data */}
const Stats=[
  {count:"5k",label:"Active Students"},
  {count:"10+",label:"Mentors"},
  {count:"200+",label:"Courses"},
  {count:"50+",label:"Awards"},
]

const StatsComponent=()=>{
  return(
    <section className="bg-richblack-800 py-16">
      <div className="w-11/12 max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center">
          {
            Stats.map((data,index)=>{
              return(
                <div key={index} className="flex flex-col items-center gap-y-3">
                  <h1 className="text-richblack-5 text-4xl font-semibold">
                    {data.count}
                  </h1>
                  <h2 className="text-richblack-400 text-lg font-semibold">
                    {data.label}
                  </h2>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default StatsComponent