import { useEffect, useState, useMemo } from "react";
import { Input } from "antd";
import type { StreamModel } from "./models/streamModel.ts";
import { StreamCard } from "./components/StreamCard.tsx";
import Fuse from "fuse.js";

function App() {
    const [streams, setStreams] = useState<StreamModel[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetch("./data.json")
            .then((res) => res.json())
            .then((res: StreamModel[]) =>
                res.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
            )
            .then(setStreams);
    }, []);

    // создаём Fuse один раз при изменении streams
    const fuse = useMemo(() => {
        return new Fuse(streams, {
            keys: ["title", "video.title", "video.author", "type"],
            threshold: 0.3,
        });
    }, [streams]);

    const filteredStreams = query ? fuse.search(query).map((r) => r.item) : streams;

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

                {/* Сетка карточек */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: 24,
                        alignItems: "start",
                    }}
                >
                    {filteredStreams.map((s, i) => (
                        <StreamCard key={i} stream={s} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
