import { Input, Select } from "antd";
import { SearchOutlined, UserOutlined, TagsOutlined } from "@ant-design/icons";
import {useIsMobile} from "../hooks/useIsMobile.ts";

type Props = {
    query: string;
    onQueryChange: (v: string) => void;

    selectedAuthors: string[];
    onAuthorsChange: (v: string[]) => void;

    selectedTypes: string[];
    onTypesChange: (v: string[]) => void;

    authors: string[];
    types: string[];

    total: number;
};

export const FilterBar = ({
                              query,
                              onQueryChange,
                              selectedAuthors,
                              onAuthorsChange,
                              selectedTypes,
                              onTypesChange,
                              authors,
                              types,
                              total
                          }: Props) => {

    const isMobile = useIsMobile();

    return (
        <div
            style={{
                position: isMobile ? "static" : "sticky",
                top: 0,
                zIndex: 10,
                marginBottom: 24
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "stretch" : "center",
                    gap: isMobile ? 12 : 32,
                    padding: 12,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.06)"
                }}
            >
                <div style={{ fontSize: 14, whiteSpace: "nowrap" }}>
                    <span style={{ opacity: 0.6 }}>Стримов найдено:</span>{" "}
                    <span style={{ fontWeight: 700 }}>{total}</span>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        gap: 16,
                        flex: 1
                    }}
                >
                    <Input
                        placeholder="Поиск..."
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        allowClear
                        size="medium"
                        prefix={<SearchOutlined />}
                        style={{
                            width: isMobile ? "100%" : "auto",
                            flex: isMobile ? "none" : 1
                        }}
                    />

                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Авторы"
                        style={{
                            width: isMobile ? "100%" : "auto",
                            flex: isMobile ? "none" : 1
                        }}
                        options={authors.map(a => ({ label: a, value: a }))}
                        value={selectedAuthors}
                        onChange={onAuthorsChange}
                        showSearch
                        size="medium"
                        notFoundContent="Авторы не найдены"
                        prefix={<UserOutlined />}
                    />

                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Тип"
                        style={{
                            width: isMobile ? "100%" : 270,
                            flexShrink: 0
                        }}
                        options={types.map(t => ({ label: t, value: t }))}
                        value={selectedTypes}
                        onChange={onTypesChange}
                        size="medium"
                        prefix={<TagsOutlined />}
                    />
                </div>
            </div>
        </div>
    );
};