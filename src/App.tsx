import { useEffect, useState, useMemo } from "react";
import type { StreamModel } from "./models/streamModel.ts";
import { StreamCard } from "./components/StreamCard.tsx";
import Fuse from "fuse.js";
import { Header } from "./components/Header.tsx";
import { FilterBar } from "./components/FilterBar.tsx";
import { FloatButton } from "antd";
function App() {
    const [streams, setStreams] = useState<StreamModel[]>([]);
    const [query, setQuery] = useState("");

    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    useEffect(() => {
        fetch("./data.json")
            .then((res) => res.json())
            .then((res: StreamModel[]) =>
                res.sort((a, b) =>
                    b.publishedAt.localeCompare(a.publishedAt)
                )
            )
            .then(setStreams);
    }, []);

    const authors = useMemo(() => {
        const set = new Set<string>();
        streams.forEach(s =>
            s.video.forEach(v => set.add(v.author))
        );
        return Array.from(set).sort();
    }, [streams]);

    const types = useMemo(() => {
        return Array.from(new Set(streams.map(s => s.type)));
    }, [streams]);

    const fuse = useMemo(() => {
        return new Fuse(streams, {
            keys: ["title", "video.title", "video.author"],
            threshold: 0.1,
            includeScore: true,
            includeMatches: true,
            ignoreLocation: true,
        });
    }, [streams]);

    const filteredStreams = useMemo(() => {
        let result = streams;

        if (query.length > 0) {
            const fuseResults = fuse.search(query);

            result = fuseResults
                .filter(r => (r.score ?? 1) < 0.35)
                .sort((a, b) => {
                    const scoreA = a.score ?? 1;
                    const scoreB = b.score ?? 1;

                    if (scoreA !== scoreB) return scoreA - scoreB;

                    const aTitle = a.item.title.toLowerCase();
                    const bTitle = b.item.title.toLowerCase();

                    const aExact = aTitle === query;
                    const bExact = bTitle === query;

                    if (aExact && !bExact) return -1;
                    if (!aExact && bExact) return 1;

                    const aStarts = aTitle.startsWith(query);
                    const bStarts = bTitle.startsWith(query);

                    if (aStarts && !bStarts) return -1;
                    if (!aStarts && bStarts) return 1;

                    return (
                        new Date(b.item.publishedAt).getTime() -
                        new Date(a.item.publishedAt).getTime()
                    );
                })
                .map(r => r.item);
        }

        if (selectedTypes.length > 0) {
            result = result.filter(x =>
                selectedTypes.includes(x.type)
            );
        }

        if (selectedAuthors.length > 0) {
            result = result.filter(x =>
                x.video.some(v =>
                    selectedAuthors.includes(v.author)
                )
            );
        }

        return result;
    }, [streams, query, selectedTypes, selectedAuthors, fuse]);

    return (
        <div
            style={{
                backgroundColor: "#f0f2f5",
                minHeight: "100vh",
                padding: "0",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 16px 48px 16px",
                }}
            >
                <Header />

                <FilterBar
                    query={query}
                    onQueryChange={setQuery}
                    selectedAuthors={selectedAuthors}
                    onAuthorsChange={setSelectedAuthors}
                    selectedTypes={selectedTypes}
                    onTypesChange={setSelectedTypes}
                    authors={authors}
                    types={types}
                    total={filteredStreams.length}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: 24,
                        alignItems: "start",
                    }}
                >
                    {filteredStreams.map((s) => (
                        <StreamCard
                            key={s.url}
                            stream={s}
                        />
                    ))}
                </div>
            </div>

            <FloatButton.BackTop
                visibilityHeight={200}
                style={{
                    width: 48,
                    height: 48,
                }}
            />
        </div>
    );
}

export default App;