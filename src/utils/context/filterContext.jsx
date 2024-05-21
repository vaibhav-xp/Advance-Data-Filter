import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import university_data from '../university_data.json';
import { sortPrograms } from '../filter.utils';

export const initialState = {
    results: 5,
    University_Name: "",
    Course_Name: "",
    German_Ranking: 0,
    Course_Type: "",
    Teaching_Language: "",
    Semester_Start: "",
    Duration: "",
    Tuition_Fee_Min: 0,
    Tuition_Fee_Max: 115751
};

const filterContext = createContext(initialState);

const FilterContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState(initialState);
    const [filter, setFilter] = useState([]);
    const [sort, setSort] = useState("");
    const [pagination, setPagination] = useState({ pageNo: 1, pages: 1 });

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch("https://howtoabroad.github.io/SearchPage/yolo.json");
            const fetchedData = await response.json();
            return fetchedData;
        } catch (error) {
            console.error("Error fetching data:", error);
            return university_data;
        }
    }, []);

    useEffect(() => {
        if (data.length === 0) {
            fetchData().then(fetchedData => setData(fetchedData));
        }
    }, [fetchData, data.length]);

    const applyFiltersAndSort = useCallback(() => {
        const filteredData = data.filter(item => {
            const tuitionFee = item.Tuition_Fee === "NA" || item.Tuition_Fee === "None" ? 0 : parseFloat(item.Tuition_Fee);
            return (
                (form.University_Name === "" || item.University_Name.includes(form.University_Name)) &&
                (form.Course_Name === "" || item.Course_Name.includes(form.Course_Name)) &&
                (form.German_Ranking === 0 || item.German_Ranking === form.German_Ranking) &&
                (form.Course_Type === "" || item.Course_Type === form.Course_Type) &&
                (form.Teaching_Language === "" || item.Teaching_Language === form.Teaching_Language) &&
                (form.Semester_Start === "" || item.Semester_Start === form.Semester_Start) &&
                (form.Duration === "" || item.Duration === form.Duration) &&
                (isNaN(tuitionFee) || tuitionFee >= form.Tuition_Fee_Min) &&
                (isNaN(tuitionFee) || tuitionFee <= form.Tuition_Fee_Max)
            );
        });

        let sortedData = filteredData;
        switch (sort) {
            case sortPrograms[1].value:
                sortedData = filteredData.sort((a, b) => a.World_Ranking - b.World_Ranking);
                break;
            case sortPrograms[2].value:
                sortedData = filteredData.sort((a, b) => a.German_Ranking - b.German_Ranking);
                break;
            case sortPrograms[3].value:
                sortedData = filteredData.sort((a, b) => a.Tuition_Fee - b.Tuition_Fee);
                break;
            case sortPrograms[4].value:
                sortedData = filteredData.sort((a, b) => b.Tuition_Fee - a.Tuition_Fee);
                break;
            default:
                break;
        }

        const totalPages = Math.ceil(sortedData.length / form.results);
        setPagination(prev => ({
            ...prev,
            pages: totalPages
        }));

        const startIndex = (pagination.pageNo - 1) * form.results;
        const paginatedData = sortedData.slice(startIndex, startIndex + form.results);
        setFilter(paginatedData);
    }, [data, form, sort, pagination.pageNo]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [form, sort, pagination.pageNo, applyFiltersAndSort]);

    const contextValue = useMemo(() => ({
        form,
        setForm,
        filter,
        sort,
        setSort,
        pagination,
        setPagination
    }), [form, filter, sort, pagination]);

    return (
        <filterContext.Provider value={contextValue}>
            {children}
        </filterContext.Provider>
    );
};

const useFilterContext = () => {
    const context = useContext(filterContext);
    if (context === undefined) {
        throw new Error("useFilterContext must be used within a FilterContextProvider");
    }
    return context;
};

export { filterContext, FilterContextProvider, useFilterContext };
