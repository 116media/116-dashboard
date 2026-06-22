# 02 — Repository Port & Use Cases

## 1. Repository port — new methods

**File:** `src/modules/catalog/application/repositories/catalog.repository.port.ts`

Add two methods (follow the existing `Result<T>` ok/err return convention):

```ts
/**
 * Marks a category as the exclusive show. The backend auto-unsets the previously
 * exclusive category (mutex). Returns the updated category.
 */
setExclusiveCategory(id: string): Promise<Result<ICategoryEntity>>;

/**
 * Uploads (or replaces) a category poster image. Returns the updated category
 * with the resolved posterUrl.
 */
uploadCategoryPoster(id: string, data: IUploadCategoryPosterCredentials): Promise<Result<ICategoryEntity>>;
```

> `createCategory` / `updateCategory` already exist. Their **signature does not change** at the
> port level (still take credentials), but the impl now sends `multipart/form-data` including
> `isExclusive` and the optional `poster` file — see §3.

## 2. Use cases

**Folder:** `src/modules/catalog/application/usecases/`

Mirror the existing one-class-per-usecase pattern (e.g. `activatecategory.usecase.ts`).

### 2a. `setexclusivecategory.usecase.ts` (new)

```ts
export class SetExclusiveCategoryUseCase implements ISetExclusiveCategoryUseCase {
    constructor(private readonly catalogRepository: ICatalogRepositoryPort) {}

    execute(id: string): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.setExclusiveCategory(id);
    }
}
```

### 2b. `uploadcategoryposter.usecase.ts` (new)

```ts
export class UploadCategoryPosterUseCase implements IUploadCategoryPosterUseCase {
    constructor(private readonly catalogRepository: ICatalogRepositoryPort) {}

    execute({ id, data }: { id: string; data: IUploadCategoryPosterCredentials }): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.uploadCategoryPoster(id, data);
    }
}
```

## 3. Repository implementation

**File:** `src/modules/catalog/infrastructure/repositories/catalog.repository.impl.ts`

Follow the `try/catch → apiClient.api.admin* → CatalogMapper → ok/err` pattern. The
generated method names below assume the regenerated client ([06](06-api-and-rules.md)).

```ts
async setExclusiveCategory(id: string): Promise<Result<ICategoryEntity>> {
    try {
        const response = await apiClient.api.adminSetExclusiveCategory(id);
        return ok(CatalogMapper.categoryFromDto(response.data.category));
    } catch (error) {
        return err(ProblemMapper.toFailure(error));
    }
}

async uploadCategoryPoster(id: string, data: IUploadCategoryPosterCredentials): Promise<Result<ICategoryEntity>> {
    try {
        const response = await apiClient.api.adminUploadCategoryPoster(id, { file: data.file });
        return ok(CatalogMapper.categoryFromDto(response.data.category));
    } catch (error) {
        return err(ProblemMapper.toFailure(error));
    }
}
```

### Create / Update become multipart

In `createCategory` / `updateCategory` impls, pass `isExclusive` and the optional `poster`
file through the generated multipart method. Confirm the regenerated method signature — the
article-image upload (`uploadArticleImage(id, jsonBody, { file })`) shows how the generated
client splits JSON fields from the `FormData` file. Category create/update will likely take a
single multipart object containing both the scalar fields and `Poster`.

> Verify exact generated signatures after regeneration; the snippets above are the target shape.

## 4. Dependency injection

**File:** `src/modules/catalog/infrastructure/dependencies/catalog.dependencies.ts`

Register the two new use cases as transient (same as the other 20):

```ts
container.register({
    setExclusiveCategoryUseCase: asClass(SetExclusiveCategoryUseCase).transient(),
    uploadCategoryPosterUseCase: asClass(UploadCategoryPosterUseCase).transient(),
});
```

> Also add their types to the container cradle type definition wherever the existing
> catalog use cases are typed.

## TODO

- [ ] Add `setExclusiveCategory` + `uploadCategoryPoster` to `ICatalogRepositoryPort`
- [ ] Create `SetExclusiveCategoryUseCase` (+ its interface) with JSDoc
- [ ] Create `UploadCategoryPosterUseCase` (+ its interface) with JSDoc
- [ ] Implement both methods in `CatalogRepositoryImpl`
- [ ] Update `createCategory`/`updateCategory` impls to send multipart with `isExclusive` + optional `poster`
- [ ] Register both use cases in `catalog.dependencies.ts` and the cradle type
