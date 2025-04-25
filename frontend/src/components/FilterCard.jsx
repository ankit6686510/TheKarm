import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Badge } from "./ui/badge";
import { X, Search, Save, RotateCcw } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

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

const defaultFilters = {
  Location: [],
  Industry: [],
  Salary: []
};

const FilterCard = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchText, setSearchText] = useState("");
  const [filterCounts, setFilterCounts] = useState({});
  const dispatch = useDispatch();

  // Calculate filter counts
  useEffect(() => {
    const counts = {};
    filterData.forEach(({ filterType, array }) => {
      counts[filterType] = {};
      array.forEach(item => {
        counts[filterType][item] = allJobs.filter(job => {
          if (filterType === "Location") return job.location === item;
          if (filterType === "Industry") return job.title === item;
          if (filterType === "Salary") return job.salary === item;
          return false;
        }).length;
      });
    });
    setFilterCounts(counts);
  }, [allJobs]);

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
    setFilters(defaultFilters);
    setSearchText("");
    toast.success("All filters cleared");
  };

  const saveFilters = () => {
    localStorage.setItem('savedFilters', JSON.stringify(filters));
    toast.success("Filters saved successfully");
  };

  const loadSavedFilters = () => {
    const saved = localStorage.getItem('savedFilters');
    if (saved) {
      setFilters(JSON.parse(saved));
      toast.success("Saved filters loaded");
    } else {
      toast.info("No saved filters found");
    }
  };

  useEffect(() => {
    dispatch(setSearchedQuery({ ...filters, searchText }));
  }, [filters, searchText, dispatch]);

  const totalActiveFilters = Object.values(filters).flat().length;

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={loadSavedFilters}
            className="text-purple-600 hover:text-purple-700"
          >
            <Save className="w-4 h-4 mr-1" />
            Load Saved
          </Button>
          {totalActiveFilters > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-purple-600 hover:text-purple-700"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10"
          />
        </div>
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
                  className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                    filters[data.filterType].includes(item)
                      ? "bg-purple-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
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
                  <span className="text-xs text-gray-400">
                    {filterCounts[data.filterType]?.[item] || 0} jobs
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Filters Button */}
      {totalActiveFilters > 0 && (
        <Button
          onClick={saveFilters}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Current Filters
        </Button>
      )}
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
