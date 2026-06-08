import { Node } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

const SOCIAL_PATTERNS = [
    { platform: "facebook", regex: /https?:\/\/(www\.|m\.)?facebook\.com\/.+/i },
    { platform: "facebook", regex: /https?:\/\/fb\.watch\/.+/i },
    { platform: "instagram", regex: /https?:\/\/(www\.)?instagram\.com\/.*\/(p|reel|reels)\/.+/i },
    { platform: "instagram", regex: /https?:\/\/(www\.)?instagram\.com\/(p|reel|reels)\/.+/i },
    { platform: "tiktok", regex: /https?:\/\/(www\.|vm\.)?tiktok\.com\/.+/i },
    { platform: "twitter", regex: /https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+\/status\/.+/i }
];

/**
 * Detects if a URL matches a supported social media platform.
 */
export const detectSocialPlatform = (url: string): string | null => {
    for (const { platform, regex } of SOCIAL_PATTERNS) {
        if (regex.test(url)) return platform;
    }
    return null;
};

/**
 * Builds a live embed iframe URL for a given platform and URL.
 */
const getEmbedUrl = (platform: string, url: string): string => {
    switch (platform) {
        case "facebook":
            return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=500`;
        case "instagram": {
            const igMatch = url.match(/\/(p|reel|reels)\/([^/?]+)/);
            const igPath = igMatch ? `/${igMatch[1]}/${igMatch[2]}` : "";
            return `https://www.instagram.com${igPath}/embed`;
        }
        case "tiktok":
            return `https://www.tiktok.com/embed/v2/${extractTikTokId(url)}`;
        case "twitter": {
            const tweetId = url.match(/\/status\/(\d+)/)?.[1];
            return `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`;
        }
        default:
            return url;
    }
};

const extractTikTokId = (url: string): string => {
    const match = url.match(/\/video\/(\d+)/);
    return match ? match[1] : "";
};

/**
 * Extracts a social URL from pasted text.
 * Handles plain URLs and iframe embed codes.
 */
const extractSocialUrl = (text: string): string | null => {
    const trimmed = text.trim();

    // Check for iframe embed code (Facebook)
    const iframeMatch = trimmed.match(/<iframe[^>]+src=["']([^"']+)["']/i);
    if (iframeMatch) {
        const src = iframeMatch[1];
        const hrefParam = src.match(/href=([^&]+)/);
        if (hrefParam) return decodeURIComponent(hrefParam[1]);
        if (detectSocialPlatform(src)) return src;
        return src;
    }

    // Check for Instagram blockquote embed code
    const igBlockquoteMatch = trimmed.match(/data-instgrm-permalink=["']([^"']+)["']/i);
    if (igBlockquoteMatch) {
        return igBlockquoteMatch[1].replace(/[?&]utm_source=ig_embed.*$/, "");
    }

    // Check for Twitter/X blockquote embed code
    const twBlockquoteMatch = trimmed.match(/class=["']twitter-tweet["']/i);
    if (twBlockquoteMatch) {
        const twUrlMatch = trimmed.match(
            /https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+/i
        );
        if (twUrlMatch) return twUrlMatch[0];
    }

    // Check for TikTok blockquote embed code
    const tkBlockquoteMatch = trimmed.match(
        /class=["']tiktok-embed["'][^>]+cite=["']([^"']+)["']/i
    );
    if (tkBlockquoteMatch) {
        return tkBlockquoteMatch[1];
    }

    // Check for any TikTok URL inside pasted HTML/text
    const tkUrlMatch = trimmed.match(
        /https?:\/\/(www\.|vm\.)?tiktok\.com\/@[^\s"'<>]+\/video\/\d+/i
    );
    if (tkUrlMatch) return tkUrlMatch[0];

    // Check for any Instagram URL inside pasted HTML/text
    const igUrlMatch = trimmed.match(
        /https?:\/\/(www\.)?instagram\.com\/[^\s"'<>]*\/(p|reel|reels)\/[a-zA-Z0-9_-]+/i
    );
    if (igUrlMatch) return igUrlMatch[0];

    // Check for any Facebook URL inside pasted HTML/text
    const fbUrlMatch = trimmed.match(/https?:\/\/(www\.|m\.)?facebook\.com\/[^\s"'<>]+/i);
    if (fbUrlMatch && trimmed.includes("<")) return fbUrlMatch[0];

    // Plain URL (single line, no HTML)
    if (trimmed.startsWith("http") && !trimmed.includes("\n")) {
        // Strip tracking params for cleaner URLs
        const cleanUrl = trimmed
            .replace(/[?&](utm_\w+=|is_from_webapp=|sender_device=)[^&]*/gi, "")
            .replace(/\?$/, "");
        if (detectSocialPlatform(cleanUrl)) return cleanUrl;
    }

    return null;
};

interface PlatformConfig {
    label: string;
    icon: string;
    brandColor: string;
}

const PLATFORM_CONFIG: Record<string, PlatformConfig> = {
    facebook: {
        label: "Facebook",
        icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
        brandColor: "var(--social-facebook)"
    },
    instagram: {
        label: "Instagram",
        icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
        brandColor: "var(--social-instagram)"
    },
    tiktok: {
        label: "TikTok",
        icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
        brandColor: "var(--social-tiktok)"
    },
    twitter: {
        label: "X (Twitter)",
        icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
        brandColor: "var(--social-twitter)"
    },
    social: {
        label: "Lien social",
        icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
        brandColor: "var(--social-fallback)"
    }
};

/**
 * Custom TipTap node for social media embeds (Facebook, Instagram, TikTok, X).
 *
 * Renders live iframe previews with branded platform legend headers.
 * All visual styling is driven by CSS classes in index.module.scss —
 * the JS only sets data attributes and CSS custom properties.
 */
export const SocialEmbed = Node.create({
    name: "socialEmbed",
    group: "block",
    atom: true,
    selectable: true,
    draggable: true,

    addAttributes() {
        return {
            url: {
                default: null
            }
        };
    },

    parseHTML() {
        return [
            {
                tag: "div[data-social-url]",
                getAttrs: (element) => ({
                    url: (element as HTMLElement).getAttribute("data-social-url")
                })
            }
        ];
    },

    renderHTML({ node }) {
        const url = node.attrs.url ?? "";
        return ["div", { "data-social-url": url }, `[Embed: ${url}]`];
    },

    addNodeView() {
        return ({ node, editor, getPos }) => {
            const url = node.attrs.url as string;
            const platform = detectSocialPlatform(url) ?? "social";
            const embedUrl = getEmbedUrl(platform, url);
            const config = PLATFORM_CONFIG[platform] ?? PLATFORM_CONFIG.social;
            const isEditable = editor.isEditable;

            const dom = document.createElement("div");
            dom.className = "socialEmbed";
            dom.dataset.platform = platform;
            dom.style.setProperty("--social-brand", config.brandColor);

            const legend = document.createElement("div");
            legend.className = "socialEmbed__legend";

            const labelWrap = document.createElement("div");
            labelWrap.className = "socialEmbed__label";

            const iconEl = document.createElement("span");
            iconEl.className = "socialEmbed__icon";
            iconEl.innerHTML = config.icon;

            const nameEl = document.createElement("span");
            nameEl.className = "socialEmbed__name";
            nameEl.textContent = config.label;

            labelWrap.appendChild(iconEl);
            labelWrap.appendChild(nameEl);
            legend.appendChild(labelWrap);

            if (isEditable) {
                const deleteBtn = document.createElement("button");
                deleteBtn.className = "socialEmbed__delete";
                deleteBtn.textContent = "✕";
                deleteBtn.title = "Supprimer";
                deleteBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const pos = typeof getPos === "function" ? getPos() : undefined;
                    if (pos !== undefined) {
                        editor
                            .chain()
                            .focus()
                            .deleteRange({ from: pos, to: pos + node.nodeSize })
                            .run();
                    }
                });
                legend.appendChild(deleteBtn);
            }

            const body = document.createElement("div");
            body.className = "socialEmbed__body";

            const iframe = document.createElement("iframe");
            iframe.className = "socialEmbed__iframe";
            iframe.src = embedUrl;
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("allowfullscreen", "true");
            iframe.setAttribute(
                "allow",
                "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            );

            body.appendChild(iframe);

            dom.appendChild(legend);
            dom.appendChild(body);

            return { dom };
        };
    },

    addProseMirrorPlugins() {
        const type = this.type;

        return [
            new Plugin({
                key: new PluginKey("socialEmbedPaste"),
                props: {
                    handlePaste(view, event) {
                        const clipboardData = event.clipboardData;
                        if (!clipboardData) return false;

                        const plainText = clipboardData.getData("text/plain") ?? "";
                        const htmlText = clipboardData.getData("text/html") ?? "";

                        const socialUrl = extractSocialUrl(plainText) || extractSocialUrl(htmlText);
                        if (!socialUrl) return false;

                        event.preventDefault();
                        const node = type.create({ url: socialUrl });
                        const tr = view.state.tr.replaceSelectionWith(node);
                        view.dispatch(tr);
                        return true;
                    }
                }
            })
        ];
    }
});
