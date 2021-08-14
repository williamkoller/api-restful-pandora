import { Role } from '@/infra/db/entities/role/role.entity';
import { Pagination } from '@/shared/pagination/interfaces/pagination/pagination.interface';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination/result-with-pagination.interface';
import { BuildPaginationObjectService } from '@/shared/pagination/services/build-pagination-object/build-pagination-object.service';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { Injectable } from '@nestjs/common';
import { FilterRoleDto } from '@/modules/roles/dtos';
import { RoleRepository } from '@/modules/roles/repositories/role.repository';

@Injectable()
export class LoadAllRolesService {
  constructor(
    private readonly roleRepo: RoleRepository,
    private readonly calculateOffsetService: CalculateOffsetService,
    private readonly buildPaginationObjectService: BuildPaginationObjectService,
  ) {}

  /**
   * @param {FilterRoleDto} filterRoleDto
   * @return {*}  {Promise<ResultWithPagination<Role[]>>}
   * @memberof LoadAllRolesService
   */
  public async loadAll(
    filterRoleDto: FilterRoleDto,
  ): Promise<ResultWithPagination<Role[]>> {
    const page = filterRoleDto.page ?? 1;
    const limit = filterRoleDto.limit ?? 10;

    const offset = this.calculateOffsetService.calculateOffset(page, limit);

    const [roles, totalCount] = await this.roleRepo.findRoleAndCount(
      offset,
      limit,
    );

    const pagination: Pagination =
      this.buildPaginationObjectService.buildPaginationObject({
        limit,
        offset,
        page,
        totalCount,
      });

    return {
      paged: pagination,
      result: roles,
    };
  }
}
