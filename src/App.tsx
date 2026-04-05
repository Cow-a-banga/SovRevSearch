import { useEffect, useState, useMemo } from "react";
import {Input, Select} from "antd";
import type { StreamModel } from "./models/streamModel.ts";
import { StreamCard } from "./components/StreamCard.tsx";
import Fuse from "fuse.js";

function App() {
    const [streams, setStreams] = useState<StreamModel[]>([]);
    const [query, setQuery] = useState("");

    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    useEffect(() => {
        fetch("./data.json")
            .then((res) => res.json())
            .then((res: StreamModel[]) =>
                res.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
            )
            .then(setStreams);
    }, []);

    const authors = useMemo(() => {
        const set = new Set<string>();
        streams.forEach(s => s.video.forEach(v => set.add(v.author)));
        return Array.from(set).sort();
    }, [streams]);

    const types = useMemo(() => {
        return Array.from(new Set(streams.map(s => s.type)));
    }, [streams]);

    // создаём Fuse один раз при изменении streams
    const fuse = useMemo(() => {
        return new Fuse(streams, {
            keys: ["title", "video.title", "video.author", "type"],
            threshold: 0.3,
        });
    }, [streams]);

    const filteredStreams = useMemo(() => {
        let result = streams;

        if(query.length > 0){
            result = fuse.search(query).map(r => r.item)
        }

        if(selectedTypes.length > 0){
            result = result.filter(x => selectedTypes.includes(x.type))
        }

        if(selectedAuthors.length > 0){
            result = result.filter(x => x.video.some(v => selectedAuthors.includes(v.author)))
        }

        return result;
    }, [streams, selectedAuthors, selectedTypes, query, fuse]);

    return (
        <div
            style={{
                backgroundColor: "#f0f2f5",
                minHeight: "100vh",
                padding: "32px 0",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 16px",
                }}
            >
                {/* Поле поиска */}
                <Input
                    placeholder="Поиск стримов и видео..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ marginBottom: 24 }}
                />

                {/* 🎛 Фильтры */}
                <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>

                    {/* Авторы */}
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Фильтр по авторам"
                        style={{ flex: 1 }}
                        options={authors.map(a => ({ label: a, value: a }))}
                        value={selectedAuthors}
                        onChange={setSelectedAuthors}
                        showSearch
                        optionFilterProp="label"
                    />

                    {/* Типы */}
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Фильтр по типу"
                        style={{ width: 400 }}
                        options={types.map(t => ({ label: t, value: t }))}
                        value={selectedTypes}
                        onChange={setSelectedTypes}
                    />
                </div>

                {/* Сетка карточек */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: 24,
                        alignItems: "start",
                    }}
                >
                    {filteredStreams.map((s) => (
                        <StreamCard key={s.url} stream={s} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
