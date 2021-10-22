import { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = () => {
    const [sales, setSales] = useState();
    // const [isLoading, setIsLoading] = useState(false);

    const { data, error, isValidating } = useSWR(
        'https://next-js-test-1ae85-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
    );

    console.log(data, error, isValidating);

    useEffect(() => {
        if (data) {
            console.log(data);
            const transformedSales = [];

            for (const key in data) {
                console.log(key);
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }

            setSales(transformedSales);
        }
    }, [data]);

    if (error) {
        return <div>Failed to load</div>;
    }

    if (!data || !sales) {
        return <div>Loading...</div>;
    }

    return (
        <ul>
            {sales.map((sale) => {
                return (
                    <li key={sale.id}>
                        {sale.username} - {sale.volume}
                    </li>
                );
            })}
        </ul>
    );
};

export default LastSalesPage;
