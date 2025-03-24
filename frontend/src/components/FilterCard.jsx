import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Checkbox } from "./ui/checkbox";
import { MapPin, Building, DollarSign, FilterIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";

const filterData = [
  {
    filterType: "Location",
    icon: <MapPin className="h-4 w-4 text-purple-500" />,
    array: ["Bihar", "Uttar Pradesh", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Noida", "Gurugram"],
  },
  {
    filterType: "Industry",
    icon: <Building className="h-4 w-4 text-purple-500" />,
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "Data Analyst", "DevOps Engineer", "Product Manager", "UI Designer", "Data Engineer", "Cloud Architect"],
  },
  {
    filterType: "Salary",
    icon: <DollarSign className="h-4 w-4 text-purple-500" />,
    array: ["0-20k", "20-40k", "42k-1lakh", "1lakh to 5lakh", "5lakh+"],
  },
];

const FilterCard = () => {
  const [filters, setFilters] = useState({
    Location: [],
    Industry: [],
    Salary: []
  });
  const [expandedSections, setExpandedSections] = useState({
    Location: true,
    Industry: true,
    Salary: true
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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
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

  // Count active filters
  const activeFiltersCount = Object.values(filters).flat().length;

  return (
    <div className="sticky top-5 w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5 text-purple-600" />
          <h2 className="font-semibold text-lg text-gray-900">Filter Jobs</h2>
        </div>
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            className="text-sm text-gray-600 hover:text-purple-600 p-0 h-auto font-medium"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filter sections */}
      <div className="p-4 max-h-[75vh] overflow-y-auto">
        {activeFiltersCount > 0 && (
          <div className="mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            </div>
          </div>
        )}

        {filterData.map((data, index) => (
          <Collapsible
            key={index}
            className="mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0"
            open={expandedSections[data.filterType]}
          >
            <CollapsibleTrigger 
              onClick={() => toggleSection(data.filterType)}
              className="flex items-center justify-between w-full py-2"
            >
              <div className="flex items-center gap-2">
                {data.icon}
                <h3 className="font-medium text-gray-900">{data.filterType}</h3>
                {filters[data.filterType].length > 0 && (
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {filters[data.filterType].length}
                  </span>
                )}
              </div>
              <span className="text-gray-400">
                {expandedSections[data.filterType] ? '−' : '+'}
              </span>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-2 space-y-1">
              {data.array.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 py-1.5 px-1 rounded-md hover:bg-gray-50">
                  <Checkbox
                    id={`checkbox-${index}-${idx}`}
                    checked={filters[data.filterType].includes(item)}
                    onCheckedChange={() => changeHandler(data.filterType, item)}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <Label 
                    htmlFor={`checkbox-${index}-${idx}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
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
