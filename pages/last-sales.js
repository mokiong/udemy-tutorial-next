import { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);

    const { data, error } = useSWR(
        'https://next-js-test-1ae85-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
    );

    useEffect(() => {
        if (data) {
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

    if (!data && !sales) {
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

export async function getStaticProps() {
    return fetch(
        'https://next-js-test-1ae85-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
    )
        .then((res) => res.json())
        .then((data) => {
            const transformedSales = [];

            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }

            return { props: { sales: transformedSales } };
        });
}

export default LastSalesPage;
