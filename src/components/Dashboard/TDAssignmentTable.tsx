import React, { useEffect, useState } from "react";
import axios from "axios";
import { ITDAssignmentData } from "@/utils/types";
import { useAuth } from "@/contexts/auth";
import nookies from "nookies";

interface ITDAssignmentTableProps {
  header: string[];
}

const TDAssignmentTable: React.FunctionComponent<ITDAssignmentTableProps> = ({
  header,
}) => {
  const [data, setData] = useState<ITDAssignmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const token = nookies.get(null).accessToken || "";
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
 

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setError("User not logged in");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/MES_TDAssignment/${user.userid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const apiData = response.data.Data.map((item: any) => ({
          date: item.Date,
          operations: item.Operation,
          poNumber: item.PONumber,
        }));
        setData(apiData);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead>
          <tr className="bg-info">
            {header.map((headerItem) => (
              <th key={headerItem} className="font-bold text-[#000000]">
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataItem, index) => (
            <tr key={dataItem.date + index}>
              <td>{dataItem.date}</td>
              <td>{dataItem.operations}</td>
              <td>{dataItem.poNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TDAssignmentTable;
