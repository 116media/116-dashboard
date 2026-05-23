import type { Editor } from "@tiptap/react";
import { Button, Divider, Flex, Input, Popover, Tooltip } from "antd";
import type { FC } from "react";
import { useRef, useState } from "react";
import {
    IconAlignCenterOutlined,
    IconAlignLeftOutlined,
    IconAlignRightOutlined,
    IconBoldOutlined,
    IconItalicOutlined,
    IconLinkOutlined,
    IconMenuOutlined,
    IconOrderedListOutlined,
    IconPictureOutlined,
    IconStrikethroughOutlined,
    IconUnderlineOutlined,
    IconUnorderedListOutlined,
    IconYoutubeFilled
} from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

interface IEditorToolbarProps {
    editor: Editor | null;
    onImageUpload?: (file: File) => Promise<string>;
    mode?: "full" | "simple";
}

/**
 * Formatting toolbar for the RichTextEditor.
 *
 * @component
 *
 * @description
 * Renders Ant Design buttons for text formatting, headings,
 * alignment, lists, links, images, and embeds.
 */
const EditorToolbar: FC<IEditorToolbarProps> = ({ editor, onImageUpload, mode = "full" }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [linkUrl, setLinkUrl] = useState("");
    const [linkOpen, setLinkOpen] = useState(false);
    const [embedUrl, setEmbedUrl] = useState("");
    const [embedOpen, setEmbedOpen] = useState(false);

    if (!editor) return null;

    const isSimple = mode === "simple";

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !onImageUpload) return;

        const url = await onImageUpload(file);
        editor.chain().focus().setImage({ src: url }).run();

        e.target.value = "";
    };

    const handleLinkConfirm = () => {
        if (linkUrl) {
            editor.chain().focus().setLink({ href: linkUrl, target: "_blank" }).run();
        } else {
            editor.chain().focus().unsetLink().run();
        }
        setLinkUrl("");
        setLinkOpen(false);
    };

    const handleEmbedConfirm = () => {
        if (!embedUrl) return;

        const youtubeMatch = embedUrl.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/
        );

        if (youtubeMatch) {
            editor.commands.setYoutubeVideo({ src: embedUrl });
        } else {
            const isSocial =
                /facebook\.com|fb\.watch/i.test(embedUrl) ||
                /instagram\.com\/(p|reel)\//i.test(embedUrl) ||
                /tiktok\.com\/@.*\/video\//i.test(embedUrl);

            if (isSocial) {
                editor
                    .chain()
                    .focus()
                    .insertContent({
                        type: "socialEmbed",
                        attrs: { url: embedUrl }
                    })
                    .run();
            }
        }

        setEmbedUrl("");
        setEmbedOpen(false);
    };

    const btn = (
        icon: React.ReactNode,
        action: () => void,
        isActive: boolean,
        tooltip: string,
        disabled = false
    ) => (
        <Tooltip title={tooltip} key={tooltip}>
            <Button
                size="small"
                icon={icon}
                disabled={disabled}
                onClick={action}
                type={isActive ? "primary" : "text"}
            />
        </Tooltip>
    );

    return (
        <Flex wrap gap={2} align="center" className={styles.richTextEditor__toolbar}>
            {/* Text formatting */}
            {btn(
                <IconBoldOutlined />,
                () => editor.chain().focus().toggleBold().run(),
                editor.isActive("bold"),
                "Gras"
            )}
            {btn(
                <IconItalicOutlined />,
                () => editor.chain().focus().toggleItalic().run(),
                editor.isActive("italic"),
                "Italique"
            )}
            {btn(
                <IconUnderlineOutlined />,
                () => editor.chain().focus().toggleUnderline().run(),
                editor.isActive("underline"),
                "Souligné"
            )}
            {btn(
                <IconStrikethroughOutlined />,
                () => editor.chain().focus().toggleStrike().run(),
                editor.isActive("strike"),
                "Barré"
            )}

            <Divider orientation="vertical" />

            {/* Headings */}
            {!isSimple && (
                <>
                    {btn(
                        "H1",
                        () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                        editor.isActive("heading", { level: 1 }),
                        "Titre 1"
                    )}
                    {btn(
                        "H2",
                        () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                        editor.isActive("heading", { level: 2 }),
                        "Titre 2"
                    )}
                    {btn(
                        "H3",
                        () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                        editor.isActive("heading", { level: 3 }),
                        "Titre 3"
                    )}

                    <Divider orientation="vertical" />
                </>
            )}

            {/* Alignment */}
            {btn(
                <IconAlignLeftOutlined />,
                () => editor.chain().focus().setTextAlign("left").run(),
                editor.isActive({ textAlign: "left" }),
                "Aligner à gauche"
            )}
            {btn(
                <IconAlignCenterOutlined />,
                () => editor.chain().focus().setTextAlign("center").run(),
                editor.isActive({ textAlign: "center" }),
                "Centrer"
            )}
            {btn(
                <IconAlignRightOutlined />,
                () => editor.chain().focus().setTextAlign("right").run(),
                editor.isActive({ textAlign: "right" }),
                "Aligner à droite"
            )}
            {btn(
                <IconMenuOutlined />,
                () => editor.chain().focus().setTextAlign("justify").run(),
                editor.isActive({ textAlign: "justify" }),
                "Justifier"
            )}

            <Divider orientation="vertical" />

            {/* Lists */}
            {btn(
                <IconUnorderedListOutlined />,
                () => editor.chain().focus().toggleBulletList().run(),
                editor.isActive("bulletList"),
                "Liste à puces"
            )}
            {btn(
                <IconOrderedListOutlined />,
                () => editor.chain().focus().toggleOrderedList().run(),
                editor.isActive("orderedList"),
                "Liste numérotée"
            )}
            {!isSimple && (
                <>
                    {btn(
                        "❝",
                        () => editor.chain().focus().toggleBlockquote().run(),
                        editor.isActive("blockquote"),
                        "Citation"
                    )}

                    <Divider orientation="vertical" />

                    {/* Link */}
                    <Popover
                        open={linkOpen}
                        trigger="click"
                        onOpenChange={setLinkOpen}
                        content={
                            <Flex gap={8}>
                                <Input
                                    size="small"
                                    value={linkUrl}
                                    placeholder="https://..."
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    onPressEnter={handleLinkConfirm}
                                    style={{ width: 240 }}
                                />
                                <Button size="small" type="primary" onClick={handleLinkConfirm}>
                                    OK
                                </Button>
                            </Flex>
                        }
                    >
                        <Tooltip title="Lien">
                            <Button
                                size="small"
                                type={editor.isActive("link") ? "primary" : "text"}
                                icon={<IconLinkOutlined />}
                            />
                        </Tooltip>
                    </Popover>

                    {/* Image */}
                    <Tooltip title={onImageUpload ? "Image" : "Complétez l'étape 1 d'abord"}>
                        <Button
                            size="small"
                            type="text"
                            disabled={!onImageUpload}
                            icon={<IconPictureOutlined />}
                            onClick={handleImageClick}
                        />
                    </Tooltip>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />

                    {/* Embed (YouTube, Facebook, Instagram, TikTok) */}
                    <Popover
                        open={embedOpen}
                        trigger="click"
                        onOpenChange={setEmbedOpen}
                        content={
                            <Flex vertical gap={8}>
                                <Input
                                    size="small"
                                    value={embedUrl}
                                    placeholder="YouTube, Facebook, Instagram, TikTok..."
                                    onChange={(e) => setEmbedUrl(e.target.value)}
                                    onPressEnter={handleEmbedConfirm}
                                    style={{ width: 320 }}
                                />
                                <Button size="small" type="primary" onClick={handleEmbedConfirm}>
                                    Insérer
                                </Button>
                            </Flex>
                        }
                    >
                        <Tooltip title="Intégrer une vidéo ou un post">
                            <Button size="small" type="text" icon={<IconYoutubeFilled />} />
                        </Tooltip>
                    </Popover>
                </>
            )}
        </Flex>
    );
};

export default EditorToolbar;
