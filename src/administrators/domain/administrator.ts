import { ApiProperty } from '@nestjs/swagger';
import { AdministratorRole } from '../infrastructure/persistence/relational/entities/administrator.entity';

export class Administrator {
  // @ApiProperty({
  //   type: String,
  // })
  // id: string;
  @ApiProperty({
    type: String,
    example: 'b6a8e153-2d3d-4e7a-9c5e-39557d78fc9a',
    description: 'Unique identifier for the administrator',
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({
    type: String,
    example: 'Super Admin',
    description: 'Full name of the administrator',
  })
  full_name: string;

  @ApiProperty({
    type: String,
    example: 'admin@example.com',
    description: 'Unique email address of the administrator',
  })
  email: string;

  @ApiProperty({
    enum: AdministratorRole,
    example: AdministratorRole.SUPERADMIN,
    description: 'Role of the administrator',
  })
  role: AdministratorRole;
}
