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

/**
 * Custom TipTap node for social media embeds (Facebook, Instagram, TikTok).
 *
 * Renders live iframe previews inside the editor.
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
            const dom = document.createElement("div");
            const url = node.attrs.url as string;
            const platform = detectSocialPlatform(url) ?? "social";
            const embedUrl = getEmbedUrl(platform, url);

            dom.style.cssText =
                "border: 1px solid #e8e8e8; border-radius: 8px; margin: 8px 0; overflow: hidden; position: relative; background: #fafafa;";

            // Header bar with platform name + delete button
            const header = document.createElement("div");
            header.style.cssText =
                "display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; background: #f5f5f5; border-bottom: 1px solid #e8e8e8; font-size: 12px;";

            const platformLabel = document.createElement("span");
            platformLabel.style.cssText = "font-weight: 600; text-transform: capitalize;";
            const platformIcon =
                platform === "facebook"
                    ? "📘"
                    : platform === "instagram"
                      ? "📷"
                      : platform === "tiktok"
                        ? "🎵"
                        : platform === "twitter"
                          ? "🐦"
                          : "🔗";
            platformLabel.textContent = `${platformIcon} ${platform}`;

            const deleteBtn = document.createElement("button");
            deleteBtn.style.cssText =
                "background: #ff4d4f; color: white; border: none; border-radius: 50%; width: 18px; height: 18px; cursor: pointer; font-size: 10px; display: flex; align-items: center; justify-content: center; line-height: 1;";
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

            header.appendChild(platformLabel);
            header.appendChild(deleteBtn);

            // Live iframe preview
            const iframe = document.createElement("iframe");
            iframe.src = embedUrl;
            iframe.style.cssText = "width: 100%; border: none; min-height: 300px;";
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("allowfullscreen", "true");
            iframe.setAttribute(
                "allow",
                "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            );

            // Auto-resize iframe based on content
            if (platform === "facebook") {
                iframe.style.minHeight = "400px";
            } else if (platform === "instagram") {
                iframe.style.minHeight = "500px";
            } else if (platform === "tiktok") {
                iframe.style.minHeight = "740px";
                iframe.style.maxWidth = "340px";
                iframe.style.margin = "0 auto";
                iframe.style.display = "block";
            } else if (platform === "twitter") {
                iframe.style.minHeight = "350px";
                iframe.style.maxWidth = "550px";
                iframe.style.margin = "0 auto";
                iframe.style.display = "block";
            }

            dom.appendChild(header);
            dom.appendChild(iframe);

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
