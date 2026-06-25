import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import { useCallback } from "react";
import { ArticlesContentValidator } from "@/modules/articles/presentation/utils/validators/articles.content.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { IMAGE_PRESET } from "@/shared/presentation/ui/FileUploader/presets";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";

const { Item } = Form;
const { TextArea } = Input;

interface IArticleBodyFormProps {
    form: FormInstance;
    error?: Failure | null | undefined;
    onSubmit: (values: Record<string, unknown>) => void;
    onImageUpload?: (file: File) => Promise<string>;
    onCoverUpload?: (file: File) => Promise<string>;
}

/**
 * Content form for article creation wizard step 2.
 *
 * @component
 *
 * @description
 * Renders headline, body (rich text), and cover image fields.
 * Cover image uses the shared FileUploader with crop support.
 */
const ArticleBodyForm: FC<IArticleBodyFormProps> = ({
    form,
    error,
    onSubmit,
    onImageUpload,
    onCoverUpload
}) => {
    const handleCoverUpload = useCallback(
        async (file: File): Promise<string> => {
            if (!onCoverUpload) throw new Error("Cover upload not available");
            const url = await onCoverUpload(file);
            form.setFieldValue("coverImageUrl", url);
            return url;
        },
        [onCoverUpload, form]
    );

    const handleCoverRemove = useCallback(() => {
        form.setFieldValue("coverImageUrl", null);
    }, [form]);

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="article_body_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="headline"
                label="Sommaire"
                rules={ArticlesContentValidator.headline("Sommaire")}
            >
                <TextArea maxLength={500} showCount rows={3} placeholder="Sommaire de l'article" />
            </Item>

            <Item name="body" label="Contenu" rules={ArticlesContentValidator.body("Contenu")}>
                <RichTextEditor placeholder="Contenu de l'article" onImageUpload={onImageUpload} />
            </Item>

            <Item name="coverImageUrl" label="Image de couverture">
                <FileUploader
                    aspectRatio={16 / 9}
                    preset={IMAGE_PRESET}
                    disabled={!onCoverUpload}
                    onUpload={handleCoverUpload}
                    onRemove={handleCoverRemove}
                />
            </Item>
        </Form>
    );
};

export default ArticleBodyForm;
