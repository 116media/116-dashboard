import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
    createInitialState
} from "@/shared/presentation/store/action.wrapper";
import { approveArticleAction } from "./approvearticle.action";
import { archiveArticleAction } from "./archivearticle.action";
import { SliceName } from "./constants";
import { createArticleAction } from "./createarticle.action";
import { deleteArticleAction } from "./deletearticle.action";
import { getArticleByIdAction } from "./getarticlebyid.action";
import { getArticlesAction } from "./getarticles.action";
import { publishArticleAction } from "./publisharticle.action";
import { rejectArticleAction } from "./rejectarticle.action";
import { articlesInitialState } from "./state";
import { submitArticleAction } from "./submitarticle.action";
import type { ArticlesStateKey } from "./type";
import { unpromoteArticleAction } from "./unpromotearticle.action";
import { updateArticleAction } from "./updatearticle.action";
import { updateArticleSeoAction } from "./updatearticleseo.action";
import { updateArticleTagsAction } from "./updatearticletags.action";
import { uploadArticleImageAction } from "./uploadarticleimage.action";

/**
 * Redux slice for the articles module.
 *
 * @description
 * Manages state for 13 async operations using the shared
 * ActionWrapper* reducer helpers. Includes `clear` (single reset)
 * and `purge` (selective reset) reducers.
 */
export const articlesSlice = createSlice({
    name: SliceName.Articles,
    initialState: articlesInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<ArticlesStateKey[]>) => {
            for (const key of action.payload) {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // get articles
            .addCase(getArticlesAction.pending, ActionWrapperPending)
            .addCase(getArticlesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getArticlesAction.rejected, ActionWrapperRejected)
            // get article by id
            .addCase(getArticleByIdAction.pending, ActionWrapperPending)
            .addCase(getArticleByIdAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getArticleByIdAction.rejected, ActionWrapperRejected)
            // create article
            .addCase(createArticleAction.pending, ActionWrapperPending)
            .addCase(createArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createArticleAction.rejected, ActionWrapperRejected)
            // update article
            .addCase(updateArticleAction.pending, ActionWrapperPending)
            .addCase(updateArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateArticleAction.rejected, ActionWrapperRejected)
            // submit article
            .addCase(submitArticleAction.pending, ActionWrapperPending)
            .addCase(submitArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(submitArticleAction.rejected, ActionWrapperRejected)
            // approve article
            .addCase(approveArticleAction.pending, ActionWrapperPending)
            .addCase(approveArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(approveArticleAction.rejected, ActionWrapperRejected)
            // publish article
            .addCase(publishArticleAction.pending, ActionWrapperPending)
            .addCase(publishArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(publishArticleAction.rejected, ActionWrapperRejected)
            // reject article
            .addCase(rejectArticleAction.pending, ActionWrapperPending)
            .addCase(rejectArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(rejectArticleAction.rejected, ActionWrapperRejected)
            // archive article
            .addCase(archiveArticleAction.pending, ActionWrapperPending)
            .addCase(archiveArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(archiveArticleAction.rejected, ActionWrapperRejected)
            // delete article
            .addCase(deleteArticleAction.pending, ActionWrapperPending)
            .addCase(deleteArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deleteArticleAction.rejected, ActionWrapperRejected)
            // upload article image
            .addCase(uploadArticleImageAction.pending, ActionWrapperPending)
            .addCase(uploadArticleImageAction.fulfilled, ActionWrapperFulfilled)
            .addCase(uploadArticleImageAction.rejected, ActionWrapperRejected)
            // update article seo
            .addCase(updateArticleSeoAction.pending, ActionWrapperPending)
            .addCase(updateArticleSeoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateArticleSeoAction.rejected, ActionWrapperRejected)
            // update article tags
            .addCase(updateArticleTagsAction.pending, ActionWrapperPending)
            .addCase(updateArticleTagsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateArticleTagsAction.rejected, ActionWrapperRejected)
            // unpromote article
            .addCase(unpromoteArticleAction.pending, ActionWrapperPending)
            .addCase(unpromoteArticleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(unpromoteArticleAction.rejected, ActionWrapperRejected);
    }
});

export default articlesSlice.reducer;
