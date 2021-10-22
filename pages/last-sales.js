import { useEffect, useState } from 'react';

const LastSalesPage = () => {
    const [sales, setSales] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            'https://next-js-test-1ae85-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
        )
            .then((response) => response.json())
            .then((data) => {
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
                console.log(transformedSales);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!sales) {
        return <div>No data yet</div>;
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
