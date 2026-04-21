import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import EditorToolbar from "./EditorToolbar";
import { SocialEmbed } from "./extensions/SocialEmbed";
import styles from "./index.module.scss";

interface IRichTextEditorProps {
    value?: string;
    onChange?: (html: string) => void;
    onImageUpload?: (file: File) => Promise<string>;
    placeholder?: string;
    minHeight?: number;
    readOnly?: boolean;
}

/**
 * TipTap-based WYSIWYG rich text editor.
 *
 * @component
 *
 * @description
 * Shared editor component that outputs clean HTML. Integrates
 * with Ant Design Forms via value/onChange protocol. Supports
 * text formatting, headings, lists, alignment, images, links,
 * YouTube embeds, and social media embeds.
 */
const RichTextEditor: FC<IRichTextEditorProps> = ({
    value,
    onChange,
    onImageUpload,
    placeholder = "Commencez à écrire...",
    minHeight = 300,
    readOnly = false
}) => {
    const skipUpdate = useRef(false);

    const editor = useEditor({
        editable: !readOnly,
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] }
            }),
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"]
            }),
            SocialEmbed,
            Image,
            Youtube.configure({ controls: true }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" }
            }),
            Placeholder.configure({ placeholder })
        ],
        content: value || "",
        onUpdate: ({ editor: e }) => {
            if (skipUpdate.current) {
                skipUpdate.current = false;
                return;
            }
            onChange?.(e.getHTML());
        }
    });

    useEffect(() => {
        if (editor && value !== undefined && editor.getHTML() !== value) {
            skipUpdate.current = true;
            editor.commands.setContent(value, { emitUpdate: false });
        }
    }, [editor, value]);

    useEffect(() => {
        if (editor) {
            editor.setEditable(!readOnly);
        }
    }, [editor, readOnly]);

    return (
        <div className={styles.richTextEditor}>
            {!readOnly && <EditorToolbar editor={editor} onImageUpload={onImageUpload} />}
            <EditorContent
                editor={editor}
                className={styles.richTextEditor__content}
                style={{ minHeight }}
            />
        </div>
    );
};

export default RichTextEditor;
