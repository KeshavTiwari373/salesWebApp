import { useState, useEffect } from "react"
import Axios from "axios";
import { API_BASE_URL } from "../config";

const TodayTRevenue = () => {

  const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        // Use useEffect to fetch data when the component mounts
        Axios.get(`${API_BASE_URL}/totalrevenue`,)
            .then((response) => {
                // Assuming response.data contains the array of top sales
                setTotalRevenue(response.data);
            })
            .catch((error) => {
                console.error("Error fetching top sales:", error);
                // Handle error
            });
    }, []);

  return (
    // displaying total revenue in H3
    <h3 className="text-center mt-5">TODAY&rsquo;S REVENUE IS {totalRevenue}</h3>
  )
}

export default TodayTRevenue