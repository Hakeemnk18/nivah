import type { IdName } from "../../../../core/shared/types/id.name.type.js";

export interface IGetAllSubCategoryForUserUseCase {
    execute(): Promise<IdName[]>;
}