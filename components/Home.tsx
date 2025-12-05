'use client';

import { useEffect, useState } from "react";
import { languages } from "@/utils/languages";

type Props = {
    lang: 'en' | 'default';
    slug: string;
};

export default function Home({ lang, slug }: Props) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                setError(null);
                // Fetch fresh data from API
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [slug]); // Re-fetch when slug changes

    const { title, code } = languages[lang];

    console.log(data);

    return (
        <main>
            <h1>Home {title}</h1>
            <p>Slug: {slug}</p>
            <p>Code: {code}</p>
            <br />
            <br />
            <br />
            {loading && <p>Loading fresh data...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {data && !loading && (
                <div>
                    <p><strong>Title:</strong> {data.title}</p>
                    <p><strong>Body:</strong> {data.body}</p>
                    <p><strong>User ID:</strong> {data.userId}</p>
                </div>
            )}
        </main>
    );
}