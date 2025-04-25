import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Bihar", "Uttar Pradesh", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Noida", "Gurugram"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "Data Analyst", "DevOps Engineer", "Product Manager", "UI Designer", "Data Engineer", "Cloud Architect"],
  },
  {
    filterType: "Salary",
    array: ["0-20k", "20-40k", "42k-1lakh", "1lakh to 5lakh", "5lakh+"],
  },
];

const FilterCard = () => {
  const [filters, setFilters] = useState({
    Location: [],
    Industry: [],
    Salary: []
  });
  const dispatch = useDispatch();

  const changeHandler = (filterType, value) => {
    setFilters(prevFilters => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value];

      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  const removeFilter = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      Location: [],
      Industry: [],
      Salary: []
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(filters));
  }, [filters, dispatch]);

  const totalActiveFilters = Object.values(filters).flat().length;

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
        {totalActiveFilters > 0 && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-purple-600 hover:text-purple-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters */}
      {totalActiveFilters > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([type, values]) =>
              values.map((value) => (
                <Badge
                  key={`${type}-${value}`}
                  variant="outline"
                  className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200"
                >
                  {value}
                  <button
                    onClick={() => removeFilter(type, value)}
                    className="ml-1 hover:text-purple-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-3">
            <h2 className="font-semibold text-gray-700">{data.filterType}</h2>
            <div className="grid grid-cols-1 gap-2">
              {data.array.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                    filters[data.filterType].includes(item)
                      ? "bg-purple-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={filters[data.filterType].includes(item)}
                    onChange={() => changeHandler(data.filterType, item)}
                    id={`checkbox-${index}-${idx}`}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <Label
                    htmlFor={`checkbox-${index}-${idx}`}
                    className={`text-sm cursor-pointer ${
                      filters[data.filterType].includes(item)
                        ? "text-purple-700 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;









// import React, { useEffect, useState } from "react";
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
// import { Label } from "./ui/label";
// import { useDispatch } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";

// const fitlerData = [
//   {
//     fitlerType: "Location",
//     array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
//   },
//   {
//     fitlerType: "Industry",
//     array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
//   },
//   {
//     fitlerType: "Salary",
//     array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
//   },
// ];

// const FilterCard = () => {
//   const [selectedValue, setSelectedValue] = useState("");
//   const dispatch = useDispatch();
//   const changeHandler = (value) => {
//     setSelectedValue(value);
//   };
//   useEffect(() => {
//     dispatch(setSearchedQuery(selectedValue));
//   }, [selectedValue]);
//   return (
//     <div className="w-full bg-white p-3 rounded-md">
//       <h1 className="font-bold text-lg">Filter Jobs</h1>
//       <hr className="mt-3" />
//       <RadioGroup value={selectedValue} onValueChange={changeHandler}>
//         {fitlerData.map((data, index) => (
//           <div>
//             <h1 className="font-bold text-lg">{data.fitlerType}</h1>
//             {data.array.map((item, idx) => {
//               const itemId = `id${index}-${idx}`;
//               return (
//                 <div className="flex items-center space-x-2 my-2">
//                   <RadioGroupItem value={item} id={itemId} />
//                   <Label htmlFor={itemId}>{item}</Label>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// };

// export default FilterCard;
