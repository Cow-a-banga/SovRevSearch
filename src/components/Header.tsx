export const Header = () => {
    return (
        <div
            style={{
                position: "relative",
                marginBottom: 16,
                padding: "20px 20px 18px",
                borderRadius: "0 0 12px 12px",
                overflow: "hidden"
            }}
        >

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url('/banner.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))"
                }}
            />

            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    color: "white"
                }}
            >
                <div style={{ marginBottom: 16 }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end"
                        }}
                    >
                        <div
                            style={{
                                fontSize: 20,
                                fontWeight: 600
                            }}
                        >
                            Архив стримов
                        </div>
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdGy6qfuUr8BvPYAwSQtGB3_qkhXdNBAsrKuw3RKJsW5hpMww/viewform?usp=publish-editor"
                            target="_blank"
                            style={{
                                fontSize: 14,
                                color: "white",
                                opacity: 0.85,
                                textDecoration: "none",
                                borderBottom: "1px solid rgba(255,255,255,0.4)"
                            }}
                        >
                            Обратная связь
                        </a>
                    </div>

                    <a
                        href="https://www.youtube.com/@sovrev"
                        target="_blank"
                        style={{
                            fontSize: 14,
                            opacity: 0.9,
                            marginTop: 2,
                            display: "inline-block",
                            color: "white",
                            textDecoration: "none",
                            borderBottom: "1px solid rgba(255,255,255,0.4)"
                        }}
                    >
                        Советского реванша
                    </a>
                </div>
            </div>
        </div>
    );
};