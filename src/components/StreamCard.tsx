import { Card, Tag, Typography } from "antd";
import type { StreamModel } from "../models/streamModel.ts";
import * as React from "react";

const { Text, Link } = Typography;

type Props = { stream: StreamModel };

function formatDateISO(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU");
}

function getTypeColor(type: string) {
    switch (type) {
        case "реакции":
            return "blue";
        case "игры":
            return "green";
        default:
            return "default";
    }
}

export const StreamCard = React.memo(({ stream }: Props) => {
    return (
        <Card
            hoverable
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 0,
                backgroundColor: "white",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                cursor: "default",
                transition: "transform 0.2s, box-shadow 0.2s",
                overflow: "hidden"
            }}
            bodyStyle={{ display: "flex", flexDirection: "column", flex: 1, padding: 16 }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >

            <div style={{ width: "100%", height: 160, overflow: "hidden" }}>
                <img
                    src={stream.thumbnail}
                    alt="Тут должна была быть картинка"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <div style={{ marginTop: 12, marginBottom: 8 }}>
                <Link href={stream.url} target="_blank" style={{ fontSize: 16, fontWeight: 500, display: "block", width: "100%", }}>
                    {stream.title}
                </Link>
                <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {formatDateISO(stream.publishedAt)}
                    </Text>
                </div>
            </div>

            <Tag color={getTypeColor(stream.type)} style={{ marginBottom: 12, alignSelf: "flex-start" }}>
                {stream.type}
            </Tag>

            {stream.video.map((v, i) => (
                <div key={i} style={{ fontSize: 13, lineHeight: 1.3, padding: "4px 0" }}>
                    {v.url ? (
                        <Link
                            href={v.url}
                            target="_blank"
                            style={{
                                display: "block",
                                width: "100%",
                                textDecoration: "none"
                            }}
                        >
                            {v.title}
                        </Link>
                    ) : (
                        <div
                            style={{
                                display: "block",
                                width: "100%"
                            }}
                        >
                            {v.title}
                        </div>
                    )}
                    <Text type="secondary" style={{ display: "block" }}>
                        {v.author}
                    </Text>
                    {i < stream.video.length - 1 && (
                        <hr style={{ border: "none", borderTop: "2px solid #ddd", margin: "4px 0" }} />
                    )}
                </div>
            ))}
        </Card>
    );
});